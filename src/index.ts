import express from "express";
import cors from "cors";  // Import CORS
import moderationRoutes from "./routes/moderationRoutes";
import "dotenv/config";

const app = express();

// Enable CORS for all origins (or specify allowed origins if needed)
app.use(cors({
  origin: "http://localhost:3001"
}));

// Middlewares
app.use(express.json());
app.use("/moderation", moderationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Moderation API running on http://localhost:${PORT}`);
});
