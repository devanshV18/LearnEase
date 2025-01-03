import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})