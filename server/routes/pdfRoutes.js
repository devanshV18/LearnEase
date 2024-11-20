import express from "express";
import { deletePdf, getUploadedPdf, uploadPdf } from "../controllers/PdfController.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js"; // Ensure the user is logged in

const router = express.Router();


router.post("/upload", isAuthenticated, uploadPdf) 
router.post("/delete", isAuthenticated, deletePdf) 
router.get("/mypdfs", isAuthenticated, getUploadedPdf)


export default router;
