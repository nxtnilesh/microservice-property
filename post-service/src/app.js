import express from "express";
import bodyParser from "body-parser";
import propertyRoutes from "./routes/propertyRoutes.js";
import connectDB from "./config/mongo.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", propertyRoutes);

export default app;
