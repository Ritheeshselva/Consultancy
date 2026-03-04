import express from "express";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";

const router = express.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/stats", asyncHandler(async (_req, res) => {
  const [totalInvoices, totalRevenueData, totalProducts, customersCount, stockData, recentInvoices] =
    await Promise.all([
      Invoice.countDocuments(),
      Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      Product.countDocuments(),
      Customer.countDocuments(),
      Product.aggregate([{ $group: { _id: null, totalStock: { $sum: "$quantity" } } }]),
      Invoice.find().sort({ date: -1, createdAt: -1 }).limit(5),
    ]);

  res.json({
    totalInvoices,
    totalRevenue: totalRevenueData[0]?.total || 0,
    totalProducts,
    totalCustomers: customersCount,
    totalStockItems: stockData[0]?.totalStock || 0,
    recentInvoices,
  });
}));

export default router;
