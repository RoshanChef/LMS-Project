const Razorpay = require('razorpay');
const { instance } = require('../config/razorpay');
const User = require('../models/users');
const Course = require('../models/courses');
const sendEmail = require('../utils/sendEmail');

require('dotenv').config();

exports.createOrder = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.token.id;

        // validate course id
        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.json({
                    success: false,
                    message: 'Course not found'
                })
            };
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.json({
                    success: false,
                    message: 'You have already enrolled in this course'
                })
            }
        } catch (err) {
            return res.status(400).json({ message: 'Invalid course id' });
        }


        const options = {
            amount: course.price * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            notes: {
                courseId,
                userId
            }
        };
        try {
            // create order
            const order = await instance.orders.create(options);
            console.log(order);

            res.status(200).json({
                success: true,
                order,
                description: course.courseDescription,
                thumbnail: course.thumbnail,
                courseName: course.courseName,
                price: course.price,
                courseId: courseId,
                userId: userId,
                message: 'Order created successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'error while creating order',
                error: error.message
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.verifyPayment = async (req, res) => {
    try {

        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userId
        ) {
            return res.status(200).json({ success: false, message: "Payment Failed" })
        }

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const calculatedSignature = hmac.digest('hex');

        // Authorized Payment
        if (calculatedSignature === razorpay_signature) {
            // //add into user 
            // const user = await User.findById(userId); 


            const notes = req.body?.payload?.payment?.entity?.notes; // Safe access
            console.log("Extracted Notes:", notes);

            const { courseId, userId } = notes;

            try {
                // add into course
                const enrolledCourse = await Course.findByIdAndUpdate(courseId, { $push: { studentEnrolled: userId } }, { new: true });
                console.log("enrolledCourse : ", enrolledCourse);

                // add into user
                const enrolledStudent = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });

                console.log("enrolledStudent : ", enrolledStudent);

                // mail send for confirmation of enrolled
                await sendEmail(enrolledStudent.email, "Congratulations from studymonk", "confirm");
                return res.status(200).json({
                    success: true,
                    message: "Payment Successfull",
                    payment
                })

            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "See Your razorpay response",
                    error: error.message
                })
            }
        }

        return res.status(200).json({
            success: false,
            message: "Payment Failed",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}