const sendEmail = require("../utils/sendEmail");

exports.contactUsController = async (req, res) => {
    try {
        const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;

        console.log(req.body);
        // send to admin
        await sendEmail("studymork@gmail.com", "Query received", "contact", null, null, firstname, lastname, message, phoneNo, countrycode);

        // send to user 
        await sendEmail(email, "Your Query received successfully", "contact", null, null, firstname, lastname, message, phoneNo, countrycode);

        res.status(200).json({
            success: true,
            message: "Email send successfully"
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
