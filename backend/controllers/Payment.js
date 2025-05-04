const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/users');
const Course = require('../models/courses');
const sendEmail = require('../utils/sendEmail');
const { instance } = require('../config/razorpay');
const courseprogress = require('../models/courseprogress');

// Create Order
exports.createOrder = async function (req, res) {
    try {
        const { courses } = req.body;
        console.log('Courses received:', courses);

        const userId = req.user?.id;
        // console.log('User ID:', userId);

        if (!courses || courses.length === 0) {
            return res.status(400).json({ message: 'Please provide course IDs.' });
        }

        let totalAmount = 0;

        for (const id of courses) {
            const course = await Course.findById(id);

            if (!course) {
                return res.status(400).json({ message: 'Course not found.' });
            }
            // console.log('course ', course);

            // const uid = new mongoose.Types.ObjectId(userId);
            console.log('uid res ', course?.studentEnrolled?.includes(userId));
            if (course?.studentEnrolled?.includes(userId)) {
                return res.status(200).json({
                    success: false,
                    message: 'You are already enrolled',
                });
            }

            totalAmount += course.price;
        }

        console.log('Total Amount:', totalAmount);

        const options = {
            amount: totalAmount * 100, // Convert to paisa
            currency: 'INR',
            receipt: Math.random(Date.now()).toString(),
        };

        // console.log('options: ', options);

        try {
            const order_res = await instance.orders.create(options);
            // console.log('Creating Razorpay order with options:', order_res);

            return res.status(200).json({
                success: true,
                message: 'Order created successfully.',
                data: order_res,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } catch (error) {
        console.log('Order creation error:', {
            message: error.message,
            description: error.description,
            stack: error.stack,
            full: error, // includes Razorpay-specific fields
        });
        return res.status(400).json({
            success: false,
            message: 'Order creation failed.',
            data: error,
        });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    console.log('Verifying payment:', req.user.id);
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            await enrollStudents(courses, req.user.id);
            return res.status(200).json({
                success: true,
                message: 'Payment verified successfully.',
                data: req.body,
            });
        }

        return res.status(400).json({
            success: false,
            message: 'Payment verification failed.',
            data: req.body,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Payment verification error.',
            data: error.message,
        });
    }
};

// Enroll Students
async function enrollStudents(courses, userId) {
    const uid = new mongoose.Types.ObjectId(userId);

    const student = await User.findById(userId);
    if (!student) {
        throw new Error(`User not found: ${userId}`);
    }

    for (const courseId of courses) {
        console.log(courseId);
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error(`Course not found: ${courseId}`);
        }

        const alreadyEnrolled = course.studentEnrolled.some(
            (id) => id.toString() === uid.toString()
        );

        if (!alreadyEnrolled) {
            // update in course
            await Course.findByIdAndUpdate(courseId, {
                $push: { studentEnrolled: uid }
            });


            // create course progress
            const enroll_progress = await courseprogress.create({
                course_id: courseId,
                userId: userId,
                completedVideos: []
            })


            // update in user
            await User.findByIdAndUpdate(userId, {
                $push: { courses: courseId, courseProgress: enroll_progress._id }
            });

            await sendEmail(student.email, 'Course Enrolled', 'payment');
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    console.log(amount);

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all the details" })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await sendEmail(enrolledStudent.email, "Payment successfully recived", "payment", "", "", "", "", "", "", { amount: (amount / 100), paymentId }, "")

        res.status(200).json({ success: true, message: "Email sent successfully" })
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}

// exports.createOrder = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const userId = req.user.id;

//         // validate course id
//         let course;
//         try {
//             course = await Course.findById(courseId);
//             if (!course) {
//                 return res.json({
//                     success: false,
//                     message: 'Course not found'
//                 })
//             };
//             const uid = new mongoose.Types.ObjectId(userId);
//             if (course.studentEnrolled.includes(uid)) {
//                 return res.json({
//                     success: false,
//                     message: 'You have already enrolled in this course'
//                 })
//             }
//         } catch (err) {
//             return res.status(400).json({ message: 'Invalid course id' });
//         }

//         const options = {
//             amount: course.price * 100,
//             currency: 'INR',
//             receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
//             notes: {
//                 courseId,
//                 userId
//             }
//         };

//         try {
//             // create order
//             const order = await instance.orders.create(options);
//             console.log(order);

//             res.status(200).json({
//                 success: true,
//                 order,
//                 courseId,
//                 userId,
//                 description: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 courseName: course.courseName,
//                 price: course.price,
//                 message: 'Order created successfully',
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: 'error while creating order',
//                 error: error.message
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// exports.verifyPayment = async (req, res) => {
//     try {

//         const razorpay_order_id = req.body?.razorpay_order_id;
//         const razorpay_payment_id = req.body?.razorpay_payment_id;
//         const razorpay_signature = req.body?.razorpay_signature;
//         const courses = req.body?.courses;

//         // validation
//         if (
//             !razorpay_order_id ||
//             !razorpay_payment_id ||
//             !razorpay_signature ||
//             !courses ||
//             !userId
//         ) {
//             return res.status(200).json({ success: false, message: "Payment Failed" })
//         }

//         const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//         hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//         const calculatedSignature = hmac.digest('hex');

//         // Authorized Payment
//         if (calculatedSignature === razorpay_signature) {
//             // //add into user
//             // const user = await User.findById(userId);


//             const notes = req.body?.payload?.payment?.entity?.notes; // Safe access
//             console.log("Extracted Notes:", notes);

//             const { courseId, userId } = notes;

//             try {
//                 // add into course
//                 const enrolledCourse = await Course.findByIdAndUpdate(courseId, { $push: { studentEnrolled: userId } }, { new: true });
//                 console.log("enrolledCourse : ", enrolledCourse);

//                 // add into user
//                 const enrolledStudent = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });

//                 console.log("enrolledStudent : ", enrolledStudent);

//                 // mail send for confirmation of enrolled
//                 await sendEmail(enrolledStudent.email, "confirm", "Congratulations from studymonk");

//                 return res.status(200).json({
//                     success: true,
//                     message: "Payment Successfull",
//                     payment
//                 })

//             } catch (error) {
//                 res.status(500).json({
//                     success: false,
//                     message: "See Your razorpay response",
//                     error: error.message
//                 })
//             }
//         }

//         return res.status(200).json({
//             success: false,
//             message: "Payment Failed",
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }