import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { loginService, signupService } from "../database/services.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Middleware xử lý CORS và xác thực
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");

  if (req.headers.authorization !== "Bearer haoyeuem" && req.headers.authorization)
    return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Route xử lý đăng nhập
app.post("/login", (req, res) => {
  try {
    const userData = loginService(req.body);
    return res.status(200).json({ user: userData });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// Route xử lý đăng ký
app.post("/signup", (req, res) => {
  try {
    const userData = signupService(req.body);
    return res.status(201).json({ user: userData });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Export để Vercel xử lý
export default app;