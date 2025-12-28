require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const adminRoutes = require("./routes/admin.js");
const doctorRoutes = require("./routes/doctor.js");
const patientRoutes = require("./routes/patient.js");
const utilsRoutes = require("./routes/utils.js");
const authRoutes = require("./routes/auth.js");

const dbUrl = process.env.ATLAS_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 60 * 60
});

store.on("error", () => {
  console.log("session store error");
})

const sessionInfo = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
};

app.use(session(sessionInfo));

main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log("Error connecting to MongoDB:", err);
})

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');
  await mongoose.connect(dbUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  // origin: "http://localhost:5173",
  origin: "https://medical-project-nmyr.onrender.com",
  credentials: true
}));   // allow React frontend


// Test Route
app.get("/", (req, res) => {
  console.log("Hii");
  res.send("root is working");
});

app.use("/auth", authRoutes);
app.use("/utils", utilsRoutes);
app.use("/admin", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patient", patientRoutes);

const stripMarkdownBold = (text) => {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "$1"); // removes **text**
};

app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Chatbot"
                },
                body: JSON.stringify({
                    model: "openrouter/auto",
                    // max_tokens: 100,
                    // temperature: 0.7,
                    messages: [
                        {
                            role: "system",
                            content:
                              "You are a medical assistant. " +
                              "Give general health advice only. " +
                              "Do not diagnose. " +
                              "Always recommend consulting a doctor."
                        },
                        {
                            role: "user",
                            content: question
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log(data);
        let answer = data?.choices?.[0]?.message?.content?.trim();
        answer = stripMarkdownBold(answer);
        res.json({
            answer: answer || "Please consult a doctor for professional medical advice."
        });

    } catch (error) {
      console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
