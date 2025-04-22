const cloudinary = require('cloudinary').v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = {
            folder,
            resource_type: "auto", // Automatically detect image, video, etc.
        };
        console.log('reached here \n\n\n\n');
        if (height) options.height = height;
        if (quality) options.quality = quality;


        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
