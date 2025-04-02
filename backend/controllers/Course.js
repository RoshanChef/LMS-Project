const User = require('../models/User');
const Tag = require('../models/tags');
const Course = require('../models/Course');
const { uploadToCloudinary } = require('../utils/cloudinary');

// createCourse handler function 
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const { courseName, courseDescription, what_learn, category, price, status } = req.body;

        // validation 
        if (!courseName || !courseDescription || !what_learn || !tags || !price || !thumbnail) {
            return res.status(400).json({
                success: false,
                error: 'Please fill all the fields'
            })
        }

        // get thumbnail 
        const thumbnail = req.files.thumbnailImage;

        // check for instructor 
        const userId = req.token.id;
        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                error: 'instructor Details not found'
            });
        }

        // tag validation
        const categoryDetails = await Tag.findById(tags);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                error: 'tag Details not found'
            });
        }


        // upload to cloudinary
        const thumbnailUrl = await uploadToCloudinary(thumbnail, process.env.CLOUDINARY_FOLDER_NAME).secure_url;

        // create course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            what_learn,
            price,
            thumbnail: thumbnailUrl,
            instructor: instructorDetails._id,
            category: categoryDetails._id,
            status
        })

        // update this course to instructor(user)
        const instructor_user = await User.findByIdAndUpdate(userId, {
            $push: {
                courses: newCourse._id
            }
        })

        // update to tags
        const tag_update = await Tag.findByIdAndUpdate({ _id: tags },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        );
        console.log("here after update tag ", tag_update);

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