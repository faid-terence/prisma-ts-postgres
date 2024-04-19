import express from "express";
import { connectDB } from "./config/connectDB";
import AuthRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import JobRoutes from "./routes/jobRoutes";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Knight!");
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/job", JobRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
