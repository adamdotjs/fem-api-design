import { Router } from "express";
import { body } from "express-validator";
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from "./handlers/product";
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";
const router = Router();

// Product Routes
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put("/product/:id", body("name").isString(), handleInputErrors, updateProduct);
router.post("/product", body("name").isString(), handleInputErrors, createProduct);
router.delete("/product/:id", deleteProduct);

// Update routes
router.get("/update", getUpdates);
router.get("/update/:id", getUpdate);
router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
	body("version").optional(),
	updateUpdate
);
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	body("productId").exists().isString(),
	createUpdate
);
router.delete("/update/:id", deleteUpdate);

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
