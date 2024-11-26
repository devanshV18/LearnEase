import mongoose from "mongoose"
import {User} from "../models/userSchema.js"
import {Pdf} from "../models/pdfSchema.js"
import { v2 as cloudinary } from "cloudinary"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import fs from "fs/promises"
import ErrorHandler from "../middlewares/error.js"


export const uploadPdf = async (req, res, next) => {
  try {
    // Check if file exists in request
    if (!req.files || !req.files.pdfFile) {
      return next(new ErrorHandler('Please upload your PDF file.', 400));
    }

    const { pdfFile } = req.files;
    const { title, description } = req.body;

    // Validate file type
    if (pdfFile.mimetype !== 'application/pdf') {
      return next(new ErrorHandler('Please upload only PDF files.', 400));
    }

    // Validate file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (pdfFile.size > maxSize) {
      return next(new ErrorHandler('PDF file size must be less than 10MB.', 400));
    }

    // Validate required fields
    if (!title || !description) {
      return next(new ErrorHandler('Title and description are required.', 400));
    }

    // Configure cloudinary upload options
    const cloudinaryOptions = {
      resource_type: 'auto',
      folder: 'pdfs',
      public_id: `${Date.now()}-${pdfFile.name.replace(/\.[^/.]+$/, '')}`,
      format: 'pdf',
      type: 'upload'
    };

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      pdfFile.tempFilePath,
      cloudinaryOptions
    );

    // Create a delivery URL that forces download
    const deliveryUrl = cloudinary.url(cloudinaryResponse.public_id, {
      resource_type: 'raw',
      format: 'pdf',
      flags: 'attachment'
    });

    // Create PDF document in database
    const pdfDocument = await Pdf.create({
      title: title.trim(),
      description: description.trim(),
      createdBy: req.user.id,
      pdf: {
        public_id: cloudinaryResponse.public_id,
        url: deliveryUrl,
        size: pdfFile.size,
        originalName: pdfFile.name
      },
      uploadedAt: new Date()
    });

    // Clean up: Remove temporary file
    try {
      await fs.unlink(pdfFile.tempFilePath);
    } catch (unlinkError) {
      console.error('Error removing temp file:', unlinkError);
    }

    // Send success response
    res.status(201).json({
      success: true,
      message: 'PDF uploaded successfully',
      data: {
        pdf: {
          id: pdfDocument._id,
          title: pdfDocument.title,
          description: pdfDocument.description,
          url: pdfDocument.pdf.url,
          public_id: pdfDocument.pdf.public_id,
          size: pdfDocument.pdf.size,
          originalName: pdfDocument.pdf.originalName,
          uploadedAt: pdfDocument.uploadedAt
        }
      }
    });

  } catch (error) {
    // Clean up temp file in case of error
    if (req.files?.pdfFile?.tempFilePath) {
      try {
        await fs.unlink(req.files.pdfFile.tempFilePath);
      } catch (unlinkError) {
        console.error('Error removing temp file after failure:', unlinkError);
      }
    }

    // If it's a Cloudinary error, handle it specifically
    if (error.http_code) {
      return next(new ErrorHandler(`Cloudinary Error: ${error.message}`, error.http_code));
    }

    return next(new ErrorHandler(error.message || 'Error uploading PDF', 500));
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