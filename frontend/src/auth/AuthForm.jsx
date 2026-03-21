import { useLoading } from "../LoadingContext";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorContext } from "../ErrorContext";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealingIcon from "@mui/icons-material/Healing";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const API_URL = import.meta.env.VITE_API;

export default function AuthForm() {

  const location = useLocation();
  const [flash, setFlash] = useState(null);
  const { error, setError } = useContext(ErrorContext);
  // console.log("Error Context:", error);
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // For now just log — replace with real API call
    try {
      let data = await fetch(`${API_URL}/auth/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include"
      });
      if (!data.ok) {
        let err = await data.json();
        setError("Server Error!");
        return;
      }
      let res = await data.json();
      console.log(res);
      if (!res.ok) {
        setError("Invalid User!");
        return;
      }
      // Navigate based on role after login/signup
      if (res.user.role === "admin") {
        navigate(`/${res.user._id}/admin`);
      } else if (res.user.role === "doctor") {
        navigate(`/${res.user._id}/doctor`);
      } else if (res.user.role === "patient") {
        navigate(`/${res.user._id}/patient`);
      } else {
        setError("Invalid User!");
      }
    } catch (error) {
      // console.error("Error during authentication:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      setFlash(location.state.message);

      setTimeout(() => {
        setFlash(null);
      }, 3000);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-4" style={{ perspective: '1200px' }}>
      {/* Background Animated Icons */}
      <style>{`
        @keyframes float3D-1 {
          0% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1); filter: drop-shadow(0 5px 15px rgba(0,0,0,0.05)); }
          50% { transform: translateZ(100px) rotateX(25deg) rotateY(15deg) scale(1.1); filter: drop-shadow(0 30px 25px rgba(0,0,0,0.15)); text-shadow: 0 0 20px currentColor; }
          100% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1); filter: drop-shadow(0 5px 15px rgba(0,0,0,0.05)); }
        }
        @keyframes float3D-2 {
          0% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1); filter: drop-shadow(0 5px 15px rgba(0,0,0,0.05)); }
          50% { transform: translateZ(140px) rotateX(-20deg) rotateY(-30deg) scale(1.2); filter: drop-shadow(0 40px 30px rgba(0,0,0,0.2)); text-shadow: 0 0 25px currentColor; }
          100% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1); filter: drop-shadow(0 5px 15px rgba(0,0,0,0.05)); }
        }
        @keyframes pulse3D {
          0%, 100% { transform: translateZ(0px) scale(1); filter: drop-shadow(0 5px 15px rgba(225,29,72,0.1)); }
          50% { transform: translateZ(120px) scale(1.25); filter: drop-shadow(0 35px 35px rgba(225,29,72,0.3)); text-shadow: 0 0 30px currentColor; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes cardEntrance {
          0% { transform: translateZ(-500px) rotateX(20deg) rotateY(-20deg) scale(0.8); opacity: 0; }
          100% { transform: translateZ(40px) rotateX(0deg) rotateY(0deg) scale(1); opacity: 1; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateZ(40px) rotateX(3deg) rotateY(-3deg); }
          50% { transform: translateZ(70px) rotateX(-3deg) rotateY(3deg); }
        }
      `}</style>

      {/* Animated Background Elements with 3D context */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute top-[10%] left-[8%] text-blue-500 opacity-40" style={{ animation: 'float3D-1 8s ease-in-out infinite' }}>
          <LocalHospitalIcon sx={{ fontSize: 110 }} />
        </div>
        <div className="absolute top-[20%] right-[12%] text-indigo-400 opacity-40" style={{ animation: 'float3D-2 10s ease-in-out infinite' }}>
          <MonitorHeartIcon sx={{ fontSize: 130 }} />
        </div>
        <div className="absolute bottom-[10%] left-[15%] text-rose-400 opacity-50" style={{ animation: 'pulse3D 6s ease-in-out infinite' }}>
          <FavoriteIcon sx={{ fontSize: 90 }} />
        </div>
        <div className="absolute bottom-[20%] right-[8%] text-teal-400 opacity-40" style={{ animation: 'float3D-1 9s ease-in-out infinite' }}>
          <HealingIcon sx={{ fontSize: 100 }} />
        </div>
        <div className="absolute top-[45%] left-[3%] text-cyan-500 opacity-40" style={{ animation: 'float3D-2 11s ease-in-out infinite' }}>
          <MedicalServicesIcon sx={{ fontSize: 80 }} />
        </div>
        <div className="absolute top-[60%] right-[4%] text-blue-400 opacity-30" style={{ animation: 'float3D-1 13s ease-in-out infinite' }}>
          <LocalHospitalIcon sx={{ fontSize: 70 }} />
        </div>
      </div>

      {flash && (
        <div className="fixed top-1 right-0 bg-emerald-500/95 text-white backdrop-blur-lg px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-[slideIn_0.4s_ease-out]">
          <div className="bg-white/20 rounded-full p-1">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <p className="font-medium text-lg">{flash}</p>
        </div>
      )}

      {/* Main Glassmorphic Card */}
      <div 
        className="relative bg-white/70 backdrop-blur-3xl shadow-[0_20px_50px_rgb(0,0,0,0.15)] rounded-3xl p-8 sm:p-10 w-full max-w-md border border-white/80 z-10 text-gray-800 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgb(0,0,0,0.2)]"
        style={{ animation: 'cardEntrance 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, cardFloat 8s ease-in-out infinite 1.2s', transformStyle: 'preserve-3d' }}
      >
        {error && (
          <div className="mb-6 p-4 bg-red-50/90 backdrop-blur-md text-red-700 border-l-4 border-red-500 rounded-r-xl shadow-sm flex justify-between items-center transition-all">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <p className="font-medium text-sm">{error}</p>
            </div>
            <button className="text-red-400 hover:text-red-700 transition-colors bg-red-100/50 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center p-1" onClick={() => setError(null)}>
              ✕
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 mb-5 shadow-inner border border-white">
            <LocalHospitalIcon className="text-blue-600" sx={{ fontSize: 36 }} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {isLogin ? "Sign in to access your portal" : "Join us to manage your medical journey"}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
            <label className="block text-sm font-semibold text-slate-700 transition-colors">Select Role</label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm appearance-none font-medium text-slate-700"
              >
                <option value="admin">Administrator</option>
                {isLogin && <option value="doctor">Medical Doctor</option>}
                <option value="patient">Patient</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
              <label className="block text-sm font-semibold text-slate-700 transition-colors">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-700"
                placeholder="Dr. Jane Doe or John Smith"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
            <label className="block text-sm font-semibold text-slate-700 transition-colors">Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-700"
              placeholder="you@hospital.com"
              required
            />
          </div>

          <div className="space-y-1.5 focus-within:text-blue-600 transition-colors">
            <label className="block text-sm font-semibold text-slate-700 transition-colors">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-1 transition-all duration-200"
          >
            {isLogin ? "Sign In to Portal" : "Create My Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200/60">
          <p className="text-center text-sm font-medium text-slate-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="font-bold text-indigo-600 hover:text-indigo-500 ml-2 transition-colors focus:outline-none"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up now" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
