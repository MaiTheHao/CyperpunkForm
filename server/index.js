import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { loginService, signupService } from "./database/services.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

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

app.post("/login", (req, res) => {
	try {
		const userData = loginService(req.body);
		return res.status(200).json({
			user: userData
		});
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
});

app.post("/signup", (req, res) => {
	try {
		const userData = signupService(req.body);
		return res.status(201).json({
			user: userData
		});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

const serverPort = process.env.SERVER_PORT || 3000;
const serverHost = process.env.SERVER_HOST || "localhost";

app.listen(serverPort, serverHost, () => {
	console.log(`Server is running on http://${serverHost}:${serverPort}`);
});
