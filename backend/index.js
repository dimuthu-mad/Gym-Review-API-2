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

app.get("/gyms", (req, res) => {
  try {
    const gyms = [
      {
        id: 1,
        name: "FitZone Gym",
        location: "Stockholm",
        description: "Modern gym with strength and cardio equipment.",
        rating: 4.7,
        membershipPrice: 499,
        reviews: [
          {
            id: 1,
            user: "Dimuthu",
            rating: 5,
            comment: "Very clean and friendly staff.",
          },
          {
            id: 2,
            user: "Anna",
            rating: 4,
            comment: "Good equipment but crowded evenings.",
          },
        ],
      },

      {
        id: 2,
        name: "Power House",
        location: "Gothenburg",
        description: "24/7 access gym with personal training.",
        rating: 4.5,
        membershipPrice: 599,
        reviews: [
          {
            id: 1,
            user: "John",
            rating: 5,
            comment: "Excellent trainers and facilities.",
          },
        ],
      },

      {
        id: 3,
        name: "Nordic Fitness",
        location: "Malmö",
        description: "Affordable fitness center with group classes.",
        rating: 4.2,
        membershipPrice: 399,
        reviews: [],
      },

      {
        id: 4,
        name: "Iron Temple",
        location: "Uppsala",
        description: "Specialized gym for bodybuilding and powerlifting.",
        rating: 4.8,
        membershipPrice: 649,
        reviews: [
          {
            id: 1,
            user: "Sara",
            rating: 5,
            comment: "Perfect for serious lifting.",
          },
        ],
      },
    ];
    res.json(gyms);
  } catch (error) {
    console.log(error);
  }
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
