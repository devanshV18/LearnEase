import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    title: String,
    description: String,
    keywords: String,
    image: {
        public_id: {
         type: String,
         required: true
        },
        url: {
         type: String,
         required: true
        }
     },
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Pdf = mongoose.model("Pdf", pdfSchema)