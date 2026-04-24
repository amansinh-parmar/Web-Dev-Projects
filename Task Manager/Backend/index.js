import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

// Connect Mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((err) => {
    console.log("Opps, Database Error", err.message);
  });
const app = express();

// Middleware to handle cors
app.use(
  cors({
    origin: process.env.FONT_END_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware to handle JSON object in req body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Task Manager.\n Here is your Backend Setup..!!");
});

app.listen(3000, () => {
  console.log("Server Loging on Port: 3000");
});
