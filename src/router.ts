import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
const router = Router();

// Product Routes
router.get("/product", (req, res) => {
	res.send("Products");
});
router.get("/product/:id", () => {});
router.put("/product/:id", body("name").isString(), handleInputErrors, (req, res) => {});
router.post("/product", body("name").isString(), handleInputErrors, (req, res) => {});
router.delete("/product/:id", () => {});

// Update routes
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
	body("version").optional(),
	handleInputErrors,
	() => {}
);
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	handleInputErrors,
	() => {}
);
router.delete("/update/:id", () => {});

// Update Point Routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
	"/updatepoint/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	handleInputErrors,
	() => {}
);
router.post(
	"/updatepoint",
	body("id").isString(),
	body("name").isString(),
	body("description").isString(),
	handleInputErrors,
	() => {}
);
router.delete("/updatepoint/:id", () => {});

export { router };
