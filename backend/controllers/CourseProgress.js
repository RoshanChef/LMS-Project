const CourseProgress = require('../models/courseprogress');
const sub_section = require('../models/sub_section');
const courseProgress = require('../models/courseprogress');

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;
  
    // check existance of sub-section
    const subsection = await sub_section.findById(subSectionId);
    if (!subsection) {
      return res.status(401).json({
        success: false,
        message: "Subsection is not there"
      })
    }

    // check for userId and course_id existance
    const course_progress = await courseProgress.findOne({ course_id: courseId, userId });

    if (!course_progress) {
      return res.json({
        success: false,
        message: "courseProgress doesnot exits"
      })
    }

    if (course_progress.completedVideos.includes(subSectionId)) {
      return res.json({
        success: false,
        message: "already completed"
      })
    }

    await course_progress.completedVideos.push(subSectionId);
    await course_progress.save();

    return res.status(200).json({
      success: true,
      message: "course Progress completed succesfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

exports.getProgressPercentage = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID not provided." });
  }

  try {
    // Find the course progress document for the user and course
    let course_progress = await courseProgress.findOne({
      course_id: courseId,
      userId: userId,
    })
      .populate({
        path: "course_id",
        populate: {
          path: "courseContent",
        },
      })
      .exec()

    if (!course_progress) {
      return res
        .status(400)
        .json({ error: "Can not find Course Progress with these IDs." })
    }
    console.log(course_progress, userId)
    let lectures = 0;
    course_progress.course_id.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    })

    let progressPercentage =
      (course_progress.completedVideos.length / lectures) * 100;

    // To make it up to 2 decimal point
    const multiplier = Math.pow(10, 2);

    progressPercentage =
      Math.round(progressPercentage * multiplier) / multiplier;

    return res.status(200).json({
      data: progressPercentage,
      message: "Succesfully fetched Course progress",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}