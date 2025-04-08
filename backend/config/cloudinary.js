const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: 'dfxv7kj1t',
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    } catch (error) {
        return {
            success: false,
            message: "cloudinary configuration failed",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        };
    }
}
