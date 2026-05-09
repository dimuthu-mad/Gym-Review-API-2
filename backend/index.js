// backend/index.js
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

const app = express();

app.use(authMiddleware); // Apply Auth0 middleware globally
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from the React app
    credentials: true, // Allow cookies to be sent
  }),
);

// Protected route
app.get("/", (req, res) => {
  return res.oidc.login({
    returnTo: "http://localhost:5173/profile",
  });
});

app.get("/profile", requiresAuth(), (req, res) => {
  try {
    res.json(req.oidc.user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/auth/logout", (req, res) => {
  return res.oidc.logout({
    returnTo: process.env.FRONTEND_URL || "http://localhost:5173",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
