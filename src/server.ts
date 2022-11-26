import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createNewUser, signIn } from "./handlers/user";
import { protect } from "./modules/auth";
import { router } from "./router";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
	if (err.type === "auth") {
		res.status(401).json({ message: "You are not authorized to perform this action." });
	} else if (err.type === "input") {
		res.status(400).json({ message: "Invalid input" });
	} else {
		res.status(500).json({ message: "Whoops, something happened on our end." });
	}
});

export { app };
