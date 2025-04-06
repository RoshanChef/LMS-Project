function getContactContent(email, firstname, lastname, message, phoneNo, countrycode) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form Response - StudyMonk</title>
    <style>
        :root {
            --primary-color: #4285f4;
            --secondary-color: #f8f9fa;
            --accent-color: #34a853;
            --text-color: #3c4043;
            --light-text: #70757a;
            --shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
            --border-radius: 12px;
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: #f9f9f9;
            padding: 20px 10px;
        }

        .container {
            background-color: #ffffff;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--shadow);
            max-width: 600px;
            margin: 0 auto;
            overflow: hidden;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
            position: relative;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        h1 {
            color: var(--accent-color);
            font-size: clamp(22px, 5vw, 28px);
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        p {
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 1.7;
        }

        .response-details {
            margin-top: 20px;
            background: var(--secondary-color);
            padding: 20px;
            border-radius: 8px;
        }

        .response-details p {
            margin-bottom: 10px;
        }

        .response-details strong {
            font-weight: 600;
        }

        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
            margin: 25px 0;
        }

        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: var(--light-text);
            text-align: center;
        }
.para{
    text-align: center;
}
        .footer p {
            margin-bottom: 8px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/5778/5778234.png" alt="StudyMonk Logo" class="logo" />
            <h1>Contact Form Response</h1>
        </div>

        <p>Thank you for your submission. We have received your message and will respond as soon as possible.</p>

        <div class="response-details">
            <p><strong>First Name:</strong> <span id="firstname"></span></p>
            <p><strong>Last Name:</strong> <span id="lastname"></span></p>
            <p><strong>Email:</strong> <span id="email"></span></p>
            <p><strong>Country Code:</strong> <span id="countrycode"></span></p>
            <p><strong>Phone Number:</strong> <span id="phoneNo"></span></p>
            <p><strong>Message:</strong> <span id="message"></span></p>
        </div>

        <div class="divider"></div>
        <p class="para">We appreciate your interest and will get back to you shortly.</p>
        <div class="footer">
            <p><strong>For any urgent queries:</strong></p>
            <p>Email us at <a href="mailto:info@studymonk.com">info@studymonk.com</a></p>
        </div>
    </div>

</body>
</html>
    `;
}


module.exports = getContactContent;