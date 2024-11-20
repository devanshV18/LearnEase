import mongoose from "mongoose"
import {User} from "../models/userSchema.js"
import {Pdf} from "../models/pdfSchema.js"
import { v2 as cloudinary } from "cloudinary"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import fs from "fs/promises"
import ErrorHandler from "../middlewares/error.js"

export const uploadPdf = async (req, res, next) => {
    try {
      // Ensure file is uploaded
      if (!req.files || !req.files.pdfFile) {
        return next(new ErrorHandler('Please Upload your PDF File.'))
      }
  
      const pdfFile = req.files.pdfFile;
  
      // Validate file type
      if (pdfFile.mimetype !== "application/pdf") {
        return next(new ErrorHandler("The file format is not supported. Pleasy upload a PDF file"))
      }
  
      // Upload to Cloudinary
      const result = await cloudinary.v2.uploader.upload(pdfFile.tempFilePath, {
        resource_type: "raw",
        folder: "pdfs"
      });
  
      // Save details to MongoDB
      const newPdf = await Pdf.create({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user.id, // Assuming req.user is set by your auth middleware
        pdf: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
  
      // Delete the temporary file
      await fs.unlink(pdfFile.tempFilePath);
  
      res.status(201).json({
        message: "PDF uploaded successfully!",
        pdf: newPdf,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
  
      // Send a 500 response with the error message
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  };


export const deletePdf = async (req, res) => {
    try {
      const pdfId = req.params.id; // Get PDF ID from URL params
  
      // Find the PDF document by ID
      const pdf = await Pdf.findById(pdfId);
  
      if (!pdf) {
        return next(new ErrorHandler("Pdf not found!"))
      }
  
      // Check if the user owns the PDF (assuming req.user.id is set by auth middleware)
      if (pdf.createdBy.toString() !== req.user.id) {
        return next(new ErrorHandler("Unauthorised Action"))
      }
  
      // Delete the file from Cloudinary
      await cloudinary.v2.uploader.destroy(pdf.pdf.public_id, {
        resource_type: "raw", // 'raw' for non-image files
      });
  
      // Delete the document from MongoDB
      await pdf.deleteOne();
  
      res.status(200).json({ message: "PDF deleted successfully!" });
    } catch (error) {
      console.error("Error deleting PDF:", error);
      res.status(500).json({ message: "Server error!", error: error.message });
    }
  };


export const getUploadedPdf = catchAsyncErrors( async(req, res, next) => {
    const userId = req.user.id;

    const userPdfs = await Pdf.find({createdBy: userId})

    //checking length as an empty array in js is a truthy value
    if(userPdfs.length === 0){
        return next(new ErrorHandler("No Pdfs Found!"))
    }

    return res.status(200).json({
        success: true,
        userPdfs
    })
})