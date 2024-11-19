import mongoose from "mongoose"
import {User} from "../models/userSchema.js"
import {Pdf} from "../models/userSchema.js"
import { v2 as cloudinary } from "cloudinary"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"

export const uploadPdf = catchAsyncHnadler( async(req,res,next) => {

})

export const deletePdf = catchAsyncHnadler( async(req,res,next) => {
    
})

export const getUploadedPdf = catchAsyncErrors( async(req, res, nex) => {
    
})