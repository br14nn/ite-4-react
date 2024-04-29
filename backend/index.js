require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");

const secret = {
  type: "service_account",
  project_id: "ite-4-tutorial-project",
  private_key_id: process.env.PROJECT_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: "firebase-adminsdk-eufvl@ite-4-tutorial-project.iam.gserviceaccount.com",
  client_id: "108511750304603854074",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eufvl%40ite-4-tutorial-project.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(secret),
});

const port = 3333;
const db = admin.firestore();

const studentColl = db.collection("students");

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/students", async (req, res) => {
  const studentsSnapshot = await studentColl.get();
  const studentsList = studentsSnapshot.docs.map((doc) => doc.data());
  res.json(studentsList);
});

app.post("/students", async (req, res) => {
  const { name, course, age, subjects } = req.body;
  try {
    const docRef = await studentColl.add({
      name,
      age,
      course,
      subjects,
    });
    res.json({ message: docRef.id });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
