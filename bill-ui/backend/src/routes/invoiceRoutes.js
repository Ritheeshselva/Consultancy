import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(async (_req, res) => {
  const invoices = await Invoice.find().sort({ date: -1, createdAt: -1 });
  res.json(invoices);
}));

router.post("/", asyncHandler(async (req, res) => {
  const invoiceNo = `INV-${Date.now()}`;
  const createdInvoice = await Invoice.create({
    ...req.body,
    invoiceNo,
  });

  res.status(201).json(createdInvoice);
}));

router.get("/recent", asyncHandler(async (_req, res) => {
  const recentInvoices = await Invoice.find()
    .sort({ date: -1, createdAt: -1 })
    .limit(5);

  res.json(recentInvoices);
}));

export default router;
