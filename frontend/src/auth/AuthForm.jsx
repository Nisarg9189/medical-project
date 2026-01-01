import {useLoading} from "../LoadingContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { setLoading } = useLoading();
export default function AuthForm() {

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
      let data = await fetch(`https://backend-lugs.onrender.com/auth/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include"
      });
      if (!data.ok) {
        let err = await data.json();
        alert(err.message);
        await fetch("https://backend-lugs.onrender.com/auth/logout", { method: "GET", credentials: "include" });
        return;
      }
      let res = await data.json();
      console.log(res);
      if (!res.ok) {
        alert(res.message);
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
        alert("Unknown role!");
      }
    } catch (error) {
      // console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
            >
              <option value="admin">Admin</option>
              {isLogin && <option value="doctor">Doctor</option>}
              <option value="patient">Patient</option>
            </select>
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2"
                placeholder="Re-enter your password"
                required
              />
            </div>
          )} */}

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 font-semibold ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
