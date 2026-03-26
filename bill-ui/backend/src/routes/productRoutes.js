import express from "express";
import Product from "../models/Product.js";
import { authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}));

router.post("/", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const createdProduct = await Product.create(req.body);
  res.status(201).json(createdProduct);
}));

router.put("/:id", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updatedProduct);
}));

router.delete("/:id", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
}));

export default router;
