import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import mongoose from "mongoose"
import { v2 as cloudinary } from "cloudinary"
import { generateToken } from "../utils/jwtToken.js"
import { User } from "../models/userSchema.js"
import { Pdf } from "../models/pdfSchema.js"
import ErrorHandler from "../middlewares/error.js"

//register user

export const register = catchAsyncErrors( async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Profile Image required"), 400)
    }


    const { profileImage } = req.files
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"]

    if( ! allowedFormats.includes(profileImage.mimeType) ){
        return next( new ErrorHandler("FIle format is not supported, please upload a png, jpeg or webp file"), 400)
    }

    const { userName, email, password, role, institutionName } = req.body

    if( !userName || !email || !password || !role || !institutionName ){
        return next( new ErrorHandler("Please fill all the necessary details"))
    }

    const userExists = await User.findOne({ email })

    if(userExists){
        return next(new ErrorHandler("The user already exists with this email, Please Login"))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
        folder: "LEARNEASE_PLATFORM_USERS"
    })

    if( !cloudinaryResponse || cloudinaryResponse.error ){
        console.error("Cloudinary Error: ", cloudinaryResponse.error || "Something went wrong with cloudinary");
        return next(new ErrorHandler("Failed to Upload profile picture, Please try again", 500));
    }

    const user = await User.create({
        userName,
        email,
        password,
        role,
        institutionName,
        profileImage: {
            publicId: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    })

    generateToken( user, "User Registered", 201, res )
})


//login user
export const login = catchAsyncErrors( async (req, res, next ) => {
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password")

    if( ! user ){
        return next(new ErrorHandler("The email Id is either incorrect or not registered"), 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Password"), 401)
    }

    generateToken(user, "Login Successfull", 200, res)

})


//logout
export const logout = catchAsyncErrors( async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "Logged out Successfully!"
    })
})


//get profile of the current user
export const getProfile = catchAsyncErrors( async (req, res, next) => {
    const id = req.user._id

    const userProfile = await User.findById(id)
    return res.status(200).json({
        success: true,
        userProfile
    })
})