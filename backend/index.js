// backend/index.js
import express from "express";
// import { verifyToken } from "./middleware/auth.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Protected route
app.get("/secure-data", (req, res) => {
  res.json({
    message: "This is protected data",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
