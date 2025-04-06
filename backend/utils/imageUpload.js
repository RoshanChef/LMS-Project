const cloudinary = require('cloudinary').v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
    try {
        const options = { folder };

        if (height)
            options.height = height;
        if (quality)
            options.quality = quality;

        // automatic detect the file type
        options.resource_type = 'auto';
        
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.log(error);
    }
}