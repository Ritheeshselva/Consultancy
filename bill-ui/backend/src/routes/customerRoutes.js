import express from "express";
import Customer from "../models/Customer.js";
import { authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(async (_req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
}));

router.post("/", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const createdCustomer = await Customer.create(req.body);
  res.status(201).json(createdCustomer);
}));

router.put("/:id", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCustomer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json(updatedCustomer);
}));

router.delete("/:id", authorizeRoles("admin"), asyncHandler(async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

  if (!deletedCustomer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ message: "Customer deleted successfully" });
}));

export default router;
