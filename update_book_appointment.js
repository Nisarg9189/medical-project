const fs = require("fs");
const file = "frontend/src/Patient/PatientForm/BookAppoinment.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
  'const [camps, setCamps] = useState([]);',
  `const [camps, setCamps] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookingMode, setBookingMode] = useState("camp"); // "camp" or "doctor"`
);

content = content.replace(
  'gender: ""',
  'gender: "",\n    doctor: "",\n    appointmentType: "offline"'
);

content = content.replace(
  'gender: ""',
  'gender: "",\n        doctor: "",\n        appointmentType: "offline"'
); // In handleSubmit reset

content = content.replace(
  '        let response = await fetch(`${API_URL}/utils/camps`, {',
  `        let response = await fetch(\`\${API_URL}/utils/camps\`, {`
);

// Add fetch doctors
content = content.replace(
  'collectCamps();',
  `collectCamps();
  const collectDoctors = async () => {
    try {
      let response = await fetch(\`\${API_URL}/utils/doctors\`, { method: "GET", credentials: "include" });
      let data = await response.json();
      if(data.ok === false) return;
      setDoctors(data);
    } catch (e) {}
  };
  collectDoctors();`
);

let selectModeUI = `
                {/* Booking Mode */}
                <div className="flex justify-center gap-4 mb-6">
                   <button type="button" onClick={() => setBookingMode("camp")} className={\`px-6 py-2 rounded-xl font-bold \${bookingMode === "camp" ? "bg-emerald-500 text-white shadow-md" : "bg-emerald-50 text-emerald-600"}\`}>Camp Booking</button>
                   <button type="button" onClick={() => setBookingMode("doctor")} className={\`px-6 py-2 rounded-xl font-bold \${bookingMode === "doctor" ? "bg-emerald-500 text-white shadow-md" : "bg-emerald-50 text-emerald-600"}\`}>Direct Doctor Booking</button>
                </div>
`;

content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-6">',
  selectModeUI + '\n                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">'
);

let campSelectUI = `
                {/* Choose camp */}
                {bookingMode === "camp" && (
                <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                    <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                        <i className="fa-solid fa-tent"></i> Camp
                    </label>
                    <select
                        name="camp"
                        value={form.camp}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                        onChange={handleChange}
                        required
                        style={{ backgroundImage: \`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')\`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                    >
                        <option value="">Select camp</option>
                        {camps.map((camp) => (
                        <option key={camp._id} value={camp._id}>{(camp.CampType || "Unknown Type").toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                )}
                
                {/* Choose doctor directly */}
                {bookingMode === "doctor" && (
                <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                    <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                        <i className="fa-solid fa-user-doctor"></i> Doctor
                    </label>
                    <select
                        name="doctor"
                        value={form.doctor}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                        onChange={handleChange}
                        required
                        style={{ backgroundImage: \`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')\`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization}) - Fees: ₹{doc.appointmentFee || 0} - Loc: {doc.location || 'N/A'}</option>
                        ))}
                    </select>
                    {form.doctor && doctors.find(d => d._id === form.doctor) && (
                      <p className="text-sm text-emerald-600 mt-2 font-semibold">
                         Fee: ₹{doctors.find(d => d._id === form.doctor).appointmentFee || 0} | Location: {doctors.find(d => d._id === form.doctor).location || 'Not Specified'}
                      </p>
                    )}
                </div>
                )}
`;

content = content.replace(
  /\{\/\* Choose camp \*\/\}[\s\S]*?\<\/select>\n                \<\/div>/,
  campSelectUI
);

// fix appointment type field name
content = content.replace('name="doctor"', 'name="appointmentType"');

fs.writeFileSync(file, content, "utf8");
console.log("updated BookAppointment UI");
