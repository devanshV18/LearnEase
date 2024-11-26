import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [1, "The Name must contain atleast one Letter."],
        maxLength: [30, "The Name cant exceed 30 letters"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        selected: false,
        minLength: [8, "Your Password must contain atleast 8 letters."]
    },
    role: {
        type: String,
        enum: ["High School Student", "Undergrad Student", "PostGrad Student", "Working Professional", "Self-Employed"]
    },
    institutionName : {
        type: String
    },
    profileImage: {
        publicId : {
            type: String,
            required: true
        },
        url : {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now().toString()
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) //returns true if entered password and hashed passwrd matvh else false
}

userSchema.methods.generateJsonWebToken = function(){
 return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY
 })   
}
export const User = mongoose.model("User", userSchema)