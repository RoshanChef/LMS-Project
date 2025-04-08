const courseprogress = require('../models/courseprogress');
const section = require('../models/section');
const sub_section = require('../models/sub_section');
const { uploadToCloudinary } = require('../utils/imageUpload');

exports.createSubSection = async (req, res) => {
    try {
        // fetch data
        const { title, description, sectionId } = req.body;
        const video = req.files.videoFile;

        // validate data
        if (!title || !description || !sectionId || !video) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        // get video url 
        const videoDetails = await uploadToCloudinary(video, process.env.CLOUDINARY_FOLDER_NAME);
        console.log(videoDetails.secure_url);

        // create sub section
        const subSection = new sub_section({
            title,
            timeDuration: `${videoDetails.duration}`,
            description,
            videoUrl: videoDetails.secure_url
        })

        await subSection.save();

        // update the section 
        const updatedSection = await section.findByIdAndUpdate(sectionId,
            { $push: { subSection: subSection._id } },
            { new: true }).populate('subSection');

        return res.status(200).json({ success: true, message: 'Sub section created successfully', updatedSection });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating sub section',
            error: error.message
        });
    }
}

exports.updatedSubSection = async (req, res) => {
    try {

        const { sectionId, title, description, subSectionId } = req.body;
        console.log(sectionId, subSectionId);

        // validate the subSection id
        const subSection = await sub_section.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub section not found'
            })
        }

        // update title 
        if (title) {
            subSection.title = title;
        }

        // update description
        if (description) {
            subSection.description = description;
        }

        // update video
        if (req.files && req.files.video) {
            const video = req.files.video;
            const videoDetails = await uploadToCloudinary(video, process.env.CLOUDINARY_FOLDER_NAME);
            subSection.videoUrl = videoDetails.secure_url;
            subSection.timeDuration = `${videoDetails.duration}`;
        }

        await subSection.save();

        console.log("check one ");

        const sectionData = await section.findById({ _id: sectionId }).populate('subSection').exec();
        console.log("check note yet ", sectionData);

        return res.status(200).json({
            success: true,
            message: 'Sub section updated successfully',
            data: sectionData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating sub section',
            error: error.message
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;
        console.log(sectionId, subSectionId);

        // Validate input
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "sectionId and subSectionId are required"
            });
        }

        // remove from section
        const delete_section = await section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId
            }
        }, { new: true });

        const userId = await req.user.id;

        // also delete from courseProgressSchema
        const courseProgress = await courseprogress.findByIdAndUpdate(userId, { $pull: { completedVideos: subSectionId } });

        // remove from sub-section
        const delete_subSection = await sub_section.findByIdAndDelete(subSectionId, { new: true });

        if (!delete_subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub section not found'
            })
        }

        // find updated section and return it
        const updatedSection = await section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: { delete_subSection, updatedSection }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting sub section',
            error: error.message
        })
    }
}