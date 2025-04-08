const User = require('../models/users');
const Category = require('../models/category');
const Course = require('../models/courses');
const sub_section = require('../models/sub_section');
const Rate_review = require('../models/rating_review');
const { uploadToCloudinary } = require('../utils/imageUpload');

// createCourse handler function 
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const { instructions, tags, courseName, courseDescription, what_learn, category, price, status } = req.body;

        // validation 
        if (!courseName || !courseDescription || !what_learn || !tags || !price || !req.files.thumbnailImage) {
            return res.status(400).json({
                success: false,
                error: 'Please fill all the fields'
            })
        }


        // check for instructor 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                error: 'instructor Details not found'
            });
        }

        // tag validation
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                error: 'category Details not found'
            });
        }

        // get thumbnail 
        const thumbnail = req.files.thumbnailImage;


        // upload to cloudinary
        const thumbnailUrl = await uploadToCloudinary(thumbnail, process.env.CLOUDINARY_FOLDER_NAME);

        console.log('Url : ', thumbnailUrl.secure_url);
        // create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            what_learn,
            price,
            thumbnail: thumbnailUrl.secure_url,
            category: categoryDetails._id,
            status, tags,
            instructor: instructorDetails._id,
            instructions
        });

        // update this course to instructor(user)
        const instructor_user = await User.findByIdAndUpdate(userId, {
            $push: {
                courses: newCourse._id
            }
        })

        // update to tags
        const category_update = await Category.findByIdAndUpdate({ _id: category },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        );

        console.log("here after update tag ", category_update);

        return res.status(200).json({
            success: true,
            message: 'course created successfully',
            data: { newCourse, instructor_user }
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

// getAllCourses handler function
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "Published" }, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            rate_review: true,
            studentEnrolled: true,
        }).populate('instructor').exec();

        res.status(200).json({
            success: true,
            message: 'courses fetched successfully',
            data: courses 
            
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

// getCourseDetails handler function
exports.getCourseDetails = async (req, res) => {
    try {
        // get course id
        const { courseId } = req.body;

        // find course by id
        const course = await Course.findById(courseId).populate([
            {
                path: "instructor",
                populate: { path: "additionDetail" }
            },
            {
                path: "courseContent",
                populate: { path: "subSection" }
            },
            "rate_review",
            "studentEnrolled"
        ]).exec();

        // Check if course exists
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Send the response
        return res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // get instructor id from token
        const { instructorId } = req.user.id;

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 });

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it.
        if (req.files && req.files.thumbnailImage) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("rate_review")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Delete from the all the user who enrolled
        const studentsEnrolled = course.studentsEnroled;
        for (const user_id of studentsEnrolled) {
            await User.findByIdAndUpdate(user_id, {
                $pull: { courses: courseId },
            })
        }

        // Delete from section and subsection
        const sections = course.courseContent;
        for (const sectionId of sections) {
            const section = await Section.findById(sectionId)
            if (section) {
                // Delete from subsection
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await sub_section.findByIdAndDelete(subSectionId)
                }
            }

            // Delete from section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the review of that course
        const rate_review = course.rate_review;
        for (const reviewId of rate_review) {
            await Rate_review.findByIdAndDelete(reviewId)
        }

        // delete from the category
        const category = await Category.findById(course.category);
        category.courses.pull(courseId);
        await category.save();

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        // return response
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })


    } catch (error) {
        return res.send({
            success: false,
            error: error.message,
            message: "Error while deleting course"
        })
    }
}

// getFullCourseDetails
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionDetail",
            },
        })
            .populate("category")
            .populate("rate_review")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        let courseProgressCount = await CourseProgress.findOne({
            course_id: courseId,
            userId: userId,
        });

        console.log("courseProgressCount : ", courseProgressCount);

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        return res.send({
            success: true,
            message: "Course details fetched successfully",
            data: course,
        })

    } catch (error) {
        return res.send({

        })
    }
}
