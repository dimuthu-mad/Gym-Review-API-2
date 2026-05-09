// backend/index.js
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.js";

const app = express();

app.use(authMiddleware); // Apply Auth0 middleware globally
app.use(express.json());
app.use(cors());

// Protected route
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  console.log("User info:", req.oidc.user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
