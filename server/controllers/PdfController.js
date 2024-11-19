import mongoose from "mongoose"
import {User} from "../models/userSchema.js"
import {Pdf} from "../models/userSchema.js"
import { v2 as cloudinary } from "cloudinary"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

// export const uploadPdf = async (req, res) => {
//     try {
//       // Check if file exists
//       if (!req.files || !req.files.pdfFile) {
//         return res.status(400).json({ message: "No file uploaded!" });
//       }
  
//       const pdfFile = req.files.pdfFile;
  
//       // Validate file type
//       if (pdfFile.mimetype !== "application/pdf") {
//         return res.status(400).json({ message: "Only PDF files are allowed!" });
//       }
  
//       // Upload to Cloudinary
//       const result = await cloudinary.v2.uploader.upload(pdfFile.tempFilePath, {
//         resource_type: "raw",
//       });
  
//       // Save details to MongoDB
//       const newPdf = await Pdf.create({
//         title: req.body.title,
//         description: req.body.description,
//         createdBy: req.user.id,
//         pdf: {
//           public_id: result.public_id,
//           url: result.secure_url,
//         },
//       });
  
//       // Delete the temp file after upload
//       fs.unlinkSync(pdfFile.tempFilePath);
  
//       res.status(201).json({ message: "File uploaded successfully!", pdf: newPdf });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error!" });
//     }
//   };
  

export const deletePdf = catchAsyncHnadler( async(req,res,next) => {
    
})

export const getUploadedPdf = catchAsyncErrors( async(req, res, nex) => {
    
})