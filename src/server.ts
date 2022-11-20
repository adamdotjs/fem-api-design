import cors from "cors";
import express from "express";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { router } from "./router";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Frontend Masters API Design V4 Course");
});

app.use("/api", protect, router);

export { app };
