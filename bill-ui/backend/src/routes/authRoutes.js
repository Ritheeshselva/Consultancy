import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const users = [
  { name: "admin", password: "admin123", role: "admin" },
  { name: "user", password: "user123", role: "user" },
];

router.post("/login", (req, res) => {
  const { name, password } = req.body || {};

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "8h";

  if (!jwtSecret) {
    return res.status(500).json({
      message: "Authentication is not fully configured on the server",
    });
  }

  const matchedUser = users.find(
    (user) => user.name === name && user.password === password
  );

  if (!matchedUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { name: matchedUser.name, role: matchedUser.role },
    jwtSecret,
    { expiresIn }
  );

  return res.json({
    token,
    user: {
      name: matchedUser.name,
      role: matchedUser.role,
    },
  });
});

export default router;
