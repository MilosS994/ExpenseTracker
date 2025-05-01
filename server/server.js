import express from "express";
import cors from "cors";

// MongoDB connection
import connectDB from "./src/database/mongodb.js";

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
