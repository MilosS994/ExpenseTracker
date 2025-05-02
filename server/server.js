import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// MongoDB connection
import connectDB from "./src/database/mongodb.js";
// Routes
import authRoutes from "./src/routes/auth.routes.js";
// Error handling middleware
import errorMiddleware from "./src/middlewares/error.middleware.js";

// --------------------------------------------- //
// CONFIGURATION

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Server uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Port
const PORT = process.env.PORT || 5500;

// START SERVER
const startServer = async () => {
  try {
    await connectDB(); //Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start a server: ", error.message);
    process.exit(1); // Exit the process with failure
  }
};

startServer(); // Start the server
