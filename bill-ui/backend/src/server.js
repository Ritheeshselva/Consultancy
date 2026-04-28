import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authenticateToken from "./middleware/auth.js";
import { seedInitialProducts } from "./scripts/runSeed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env"), override: true });

const app = express();
const port = process.env.PORT || 5000;
const configuredClientOrigin = process.env.CLIENT_URL;
const sameOrigin = `http://localhost:${port}`;
const clientBuildPath = path.resolve(__dirname, "../public");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const isConfiguredOrigin = configuredClientOrigin && origin === configuredClientOrigin;
      const isSameOrigin = origin === sameOrigin;
      const isLocalDevOrigin =
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);

      if (isConfiguredOrigin || isSameOrigin || isLocalDevOrigin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api", authenticateToken);

app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error.name === "ValidationError" ? 400 : 500;
  res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialProducts();
    const server = http.createServer(app);

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${port} is already in use. Another backend instance is likely running.`
        );
        console.error(
          "Stop the existing process or change PORT in backend/.env, then restart."
        );
        process.exit(0);
      }

      console.error("Server error:", error.message);
      process.exit(1);
    });

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
