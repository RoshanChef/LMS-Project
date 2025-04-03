const review = require('../models/rating_review');
const Course = require('../models/courses');

// create rating
exports.createRating = async (req, res) => {
    try {
        const id = req.token.id;
        const { rating, review, courseId } = req.body;

        // check if user is enrolled or not
        const course = await Course.findOne({ _id: courseId, studentEnrolled: { $elemMatch: { $eq: id } } });

        // validate the user that enrolled 
        if (!course) {
            return res.status(403).json({
                success: false,
                message: "Student is not enrolled in this course"
            });
        }

        // check if user has already rated the course
        const rated = await review.findOne({ user: id });

        if (rated) {
            return res.status(400).json({
                success: false,
                message: "Student has already rated the course"
            })
        }
        rating = Number.parseInt(rating);

        // create rating_review
        const new_review = await review.create({ rating, review, user: id });

        // update into course 
        course.rate_review.push(new_review._id);

        await course.save();    

        return res.status(200).json({
            success: true,
            new_review,
            message: "Rating and review created successfully"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get Avg rating
exports.getAvgRating = async (req, res) => {
    try {
        //get course ID
        const courseId = req.body.courseId;

        const result = await review.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating/Review exist
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get All rating
exports.getAllRating = async (req, res) => {
    try {
        const reviews = await review.find({}).sort({ rating: -1 }).populate({ path: "user", select: "firstName lastName email image" }).populate({ path: "course", select: "courseName" }).exec();

        return res.status(200).json({ success: true, message: "All rating", reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}