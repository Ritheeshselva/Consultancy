import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";
import { connectDB } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env"), override: true });

const initialProducts = [
  { name: "100mm Submersible", category: "Pumps", price: 12000, quantity: 5 },
  { name: "125mm Submersible", category: "Pumps", price: 14500, quantity: 5 },
  { name: "Horizontal Openwell Submersible Pumps", category: "Pumps", price: 16800, quantity: 3 },
  { name: "Pressure Booster System", category: "Pumps", price: 22500, quantity: 2 },
  { name: "CPVC Plumbing Pipes & Fittings", category: "Pipes", price: 850, quantity: 50 },
  { name: "uPVC Pressure Pipes & Fittings", category: "Pipes", price: 760, quantity: 50 },
  { name: "HDPE Pipes", category: "Pipes", price: 980, quantity: 40 },
  { name: "Housing Wires", category: "Wires", price: 1250, quantity: 100 },
  { name: "Flat Cables", category: "Wires", price: 2100, quantity: 60 },
  { name: "Gate Valves", category: "Valves", price: 650, quantity: 25 },
  { name: "Check Valves", category: "Valves", price: 720, quantity: 25 },
];

export const seedInitialProducts = async () => {
  const productCount = await Product.countDocuments();

  if (productCount > 0) {
    console.log("Product seed skipped: products already exist");
    return;
  }

  await Product.insertMany(initialProducts);
  console.log(`Seeded ${initialProducts.length} initial products`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await seedInitialProducts();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runSeed();
}
