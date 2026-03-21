export default function ShowMap() {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 font-sans p-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-4xl text-sky-500 mb-6 drop-shadow-sm border border-slate-100 animate-[bounce_3s_infinite]">
                <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Interactive Map</h1>
            <p className="text-slate-500 mt-2 font-medium max-w-md">The live map integration is currently unavailable and will be rolled out in an upcoming update.</p>
        </div>
    );
}