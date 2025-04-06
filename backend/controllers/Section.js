const Section = require('../models/section');
const Course = require('../models/courses');
const SubSection = require('../models/sub_section');

exports.createSection = async (req, res) => {
    try {
        // data fetch 
        const { courseId, sectionName } = req.body;

        // validate data
        if (!courseId || !sectionName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // create section
        const section = await Section.create({ sectionName });

        // update course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: section._id } }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        });

        return res.status(200).json({ sucess: true, message: "Section created successfully", section, updatedCourse });
    } catch (error) {
        return res.status(500).json({ sucess: false, message: "Internal server error", error });
    }
}

exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, sectionName } = req.body;

        // validate data
        if (!sectionId || !sectionName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        return res.status(200).json({ sucess: true, message: "Section updated successfully", updatedSection });
    } catch (error) {
        return res.status(500).json({ sucess: false, message: "Internal server error", error });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, courseId } = req.body;

        // validate data
        if (!sectionId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        //we need to update course into course model ? 
        // delete from course
        const deletedCourse = await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } }, { new: true });


        let section = await Section.findById(sectionId);

        if (!section) {
            return res.status(401).json({
                success: "false",
                message: "Section not found"
            })
        }

        // delete the subsection
        for (let sub_id of section.subSection) {
            await SubSection.findByIdAndDelete(sub_id);
        }

        // delete section
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        // Handle case where section is not found
        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        return res.status(200).json({ sucess: true, message: "Section deleted successfully", deletedSection });

    } catch (error) {
        return res.status(500).json({ sucess: false, message: "Internal server error", error });
    }
}