const fs = require('fs');

const files = [
  'frontend/src/Patient/PatientForm/BookAppoinment.jsx',
  'frontend/src/Patient/MainContent/GenReports.jsx',
  'frontend/src/Doctor/DoctorMainContent/DocotrMainContent.jsx',
  'frontend/src/Doctor/DoctorMainContent/DoctorCard.jsx',
  'frontend/src/Doctor/DoctorMainContent/AddDiagnosis.jsx',
  'frontend/src/Patient/MainContent/PatientsUpcomingCamps.jsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
     let content = fs.readFileSync(f, 'utf8');
     content = content.replace(/data\.ok && !data\.ok/g, 'data.ok === false');
     fs.writeFileSync(f, content);
  }
});

// also modify DocotrMainContent for edit profile modal
let f = 'frontend/src/Doctor/DoctorMainContent/DocotrMainContent.jsx';
let content = fs.readFileSync(f, 'utf8');

// replace state
content = content.replace(
  'let [endDate, setEndDate]               = useState("");',
  `let [endDate, setEndDate]               = useState("");
  let [showEditProfile, setShowEditProfile] = useState(false);
  let [profileForm, setProfileForm] = useState({ specialization: "", location: "", phone: "", appointmentFee: 0 });`
);

// inside useEffect
content = content.replace(
  'setDoctorDetails(data);',
  `setDoctorDetails(data);
            setProfileForm({
                specialization: data.specialization || "",
                location: data.location || "",
                phone: data.phone || "",
                appointmentFee: data.appointmentFee || 0
            });`
);

// handle update profile 
let updateProfileCode = `
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(\`\${API_URL}/doctors/\${doctorId}/update-profile\`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileForm),
                credentials: "include"
            });
            let data = await res.json();
            if (data.ok) {
                alert("Profile updated successfully");
                setDoctorDetails(data.doctor);
                setShowEditProfile(false);
            } else {
                alert("Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating profile");
        }
    };
`;

content = content.replace(
  '    // ── Download completed appointments as Excel ──────────────────────────────',
  updateProfileCode + '\n    // ── Download completed appointments as Excel ──────────────────────────────'
);

let editProfileModal = `
            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-[formEntrance_0.3s_ease-out_forwards]">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                        <button onClick={() => setShowEditProfile(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-emerald-600">Edit Profile</h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1">Specialization</label>
                                <input type="text" value={profileForm.specialization} onChange={(e) => setProfileForm({...profileForm, specialization: e.target.value})} className="w-full px-3 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1">Location</label>
                                <input type="text" value={profileForm.location} onChange={(e) => setProfileForm({...profileForm, location: e.target.value})} className="w-full px-3 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1">Phone Number</label>
                                <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="w-full px-3 py-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-1">Base Appointment Fee (₹)</label>
                                <input type="number" value={profileForm.appointmentFee} onChange={(e) => setProfileForm({...profileForm, appointmentFee: e.target.value})} className="w-full px-3 py-2 border rounded-xl" />
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
`;

content = content.replace(
  '<div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">',
  editProfileModal + '\n            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">'
);

let editButton = `
                        <div className="flex items-center gap-3 mt-4">
                            <button onClick={() => setShowEditProfile(true)} className="px-4 py-1.5 text-sm font-semibold bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition">
                                Edit Profile
                            </button>
                        </div>
`;

content = content.replace(
  '                        <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">\n                            <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today\'s Schedule — {new Date().toLocaleDateString()}\n                        </p>',
  `                        <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
                            <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today's Schedule — {new Date().toLocaleDateString()}
                        </p>` + '\n                        ' + editButton
);

fs.writeFileSync(f, content);
