import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

// Initialize dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Route definitions
app.use("/api/user", userRouter); // api/user
app.use("/api/auth", authRouter); // api/auth
app.use("/api/listing", listingRouter); // api/listing

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route for serving frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}!`);
});
