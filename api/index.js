import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Security middleware: Protects against common web vulnerabilities
app.use(helmet());

// Logging middleware: Logs incoming requests for debugging and monitoring
app.use(morgan("dev"));

// Rate limiting middleware: Prevents excessive requests from a single IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// CORS middleware: Allows cross-origin requests (if needed)
app.use(cors());

// Parsing middleware: Parses incoming request bodies as JSON or URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route handlers for categories, items, and subcategories
import categoryRoutes from "./routes/category.js";
import itemRoutes from "./routes/item.js";
import subCategoryRoutes from "./routes/subCategory.js";

// Mount route handlers at their respective paths
app.use("/category", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/item", itemRoutes);

// Error handling middleware: Handles uncaught errors and sends appropriate response
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(500).json({ success: false, error: "Something went wrong!" });
});

// Default route: Provides a welcome message
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to the Menu Management API. Manage categories, subcategories, and items efficiently.",
  });
});

// Start the server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App Listening on PORT ${PORT}`);
  });
}

export default app;