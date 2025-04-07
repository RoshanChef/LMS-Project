const User = require('../models/users');
const sendEmail = require('../utils/sendEmail');

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from body
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }

        // Generate token and set expiration (5 minutes from now)
        const token = crypto.randomUUID();
        const expirationTime = Date.now() + 5 * 60 * 1000;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpires: expirationTime
            },
            { new: true }
        );

        // create url 
        const url = `http://localhost:3000/update-password/${token}`;

        await sendEmail(email, "Password Reset Request", "reset", null, url);

        return res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully. Please check your email.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to process password reset request",
            error: error.message
        })
    }
}

// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, token } = req.body;

        // validation
        const userDetails = await User.findOne({ token });
        if (!userDetails)
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })

        // token expired logic
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token expired, regenerate token"
            });
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token },
            {
                password: hashedPassword,
                token: null,
                resetPasswordExpires: null
            }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Password reset successfull"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
