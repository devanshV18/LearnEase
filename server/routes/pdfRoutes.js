import express from "express";
import { uploadPdf } from "../controllers/pdfController.js"; // Adjust the path as needed
import { isAuthenticated } from "../middlewares/authMiddleware.js"; // Ensure the user is logged in

const router = express.Router();

// Define the route for uploading PDFs
router.post(
  "/upload",
  isAuthenticated, // Middleware to ensure the user is logged in
  uploadPdf // The controller that handles the file upload
);

export default router;
