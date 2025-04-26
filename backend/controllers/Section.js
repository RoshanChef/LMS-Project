const Section = require('../models/section');
const Course = require('../models/courses');
const SubSection = require('../models/sub_section');

exports.createSection = async (req, res) => {
    try {
        // data fetch 
        const { courseId, sectionName } = req.body;

        // Validate data
        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Both courseId and sectionName are required"
            });
        }

        // create section
        const section = await Section.create({ sectionName: sectionName });


        // Update course with the new section
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: section._id } },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        });

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            section,
            updatedCourse
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in Section creation", error });
    }
}

exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, sectionName, courseId } = req.body;

        // validate data
        if (!sectionId || !sectionName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // update section
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName: sectionName }, { new: true });

        const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();

        return res.status(200).json({ success: true, message: "Section updated successfully", updatedCourse });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json({ success: false, message: "Missing sectionId or courseId" });
        }

        // 1. Find the section
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        // 2. Delete all subSections in that section
        for (const subId of section.subSection) {
            await SubSection.findByIdAndDelete(subId);
        }

        // 3. Remove sectionId from the course content array
        await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
        );

        // 4. Delete the section itself
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        // 5. Return updated course with populated content
        const updatedCourse = await Course.findById(courseId)
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
}