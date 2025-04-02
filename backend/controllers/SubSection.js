const Section = require('../models/Section');
const sub_section = require('../models/sub_section');
const { uploadToCloudinary } = require('../utils/imageUpload');
require('dotenv').config();

exports.createSubSection = async (req, res) => {
    try {

        // fetch data
        const { title, description, sectionId } = req.body;
        const video = req.files.video;

        // validate data
        if (!title || !description || !sectionId || !video) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        // get video url 
        const videoDetails = await uploadToCloudinary(video, process.env.CLOUDINARY_FOLDER_NAME);
        console.log(videoUrl)

        // create sub section
        const subSection = new sub_section({
            title,
            description: `${videoDetails.duration}`,
            sectionId,
            videoUrl: videoDetails.secure_url
        })

        // update the section 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { $push: { subSection: subSection._id } }, { new: true }).populate('subSection');

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

        // validate the subSection id
        const subSection = await subSection.findById(subSectionId);

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
        const section = await section.findById(sectionId).populate('subSection');

        return res.status(200).json({
            success: true,
            message: 'Sub section updated successfully',
            data: section
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
        const { sectionId, subSectionId } = req.params;

        // Validate input
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "sectionId and subSectionId are required"
            });
        }

        // remove from section
        const delete_section = await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId
            }
        }, { new: true });

        // also delete from courseProgressSchema

        // remove from sub section
        const delete_subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!delete_subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub section not found'
            })
        }

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting sub section',
            error: error.message
        })
    }
}