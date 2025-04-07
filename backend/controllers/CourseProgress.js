const courseprogress = require('../models/courseprogress');
const sub_section = require('../models/sub_section');

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subsectionId } = req.body;
        const userId = req.token.id;

        // check existance of sub-section
        const subsection = await sub_section.findById(subsectionId);

        if (!subsection) {
            return res.status(401).json({
                success: false,
                message: "Subsection is not there"
            })
        }

        // check for userId and course_id existance
        const course_progress = await course_progress.findOne({ course_id: courseId, userId });

        if (!course_progress) {
            return res.json({
                success: false,
                message: "courseProgress doesnot exits"
            })
        }

        if (course_progress.completedVideos.includes(subsectionId)) {
            return res.json({
                success: false,
                message: "already completed"
            })
        }

        await course_progress.completedVideos.push(subsectionId);
        await course_progress.save();

        return res.status(200).json({
            success: true,
            message: "coursepress completed succesfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }