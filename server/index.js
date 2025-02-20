import express from "express";
import { loginService, signupService } from "./database/services.js";
const app = express();
app.use(express.json());

// Middleware xử lý CORS và xác thực
app.use((req, res, next) => {
  const allowedOrigins = ["https://cyperpunkform.vercel.app"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.headers.authorization !== "Bearer haoyeuem" && req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/", (req, res) => res.send("This is the backend for the Cyperpunk Form Project"));
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