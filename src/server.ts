import express from "express";
import { connectDB } from "./config/connectDB";
import AuthRoutes from "./routes/authRoutes";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Knight!");
});

app.use(express.json());

app.use("/auth", AuthRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
