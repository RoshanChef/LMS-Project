function getConfirmContent(link) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🎉 Congratulations on Your Purchase!</title>
    <style>
        :root {
            --primary-color: #4285f4;
            --secondary-color: #f8f9fa;
            --accent-color: #34a853;
            --text-color: #3c4043;
            --light-text: #70757a;
            --shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
            --success-gradient: linear-gradient(135deg, #34a853 0%, #93c94e 100%);
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

        .subheader {
            color: var(--light-text);
            font-size: 16px;
            margin-bottom: 25px;
            font-weight: 400;
        }

        p {
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 1.7;
        }

        .course-card {
            background-color: white;
            border-radius: var(--border-radius);
            padding: 25px;
            margin: 25px 0;
            text-align: center;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            transition: var(--transition);
        }

        .course-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .course-name {
            font-size: clamp(18px, 5vw, 22px);
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 15px;
            line-height: 1.4;
        }

        .course-description {
            color: var(--light-text);
            font-size: 15px;
            margin-bottom: 20px;
        }

        .course-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .detail-item {
            background: var(--secondary-color);
            padding: 12px;
            border-radius: 8px;
        }

        .detail-label {
            font-size: 13px;
            color: var(--light-text);
            margin-bottom: 5px;
            font-weight: 500;
        }

        .detail-value {
            font-weight: 600;
            color: var(--text-color);
        }

        .btn-container {
            margin: 30px 0;
            text-align: center;
        }

        .btn {
            display: inline-block;
            background: var(--success-gradient);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(52, 168, 83, 0.3);
            transition: var(--transition);
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(52, 168, 83, 0.4);
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

        .footer p {
            margin-bottom: 8px;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }

        .social-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .social-icon:hover {
            background: var(--primary-color);
            transform: scale(1.1);
        }

        .social-icon img {
            width: 18px;
            height: 18px;
        }

        @media (max-width: 480px) {
            .container {
                padding: 25px 20px;
            }

            .course-details {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/5778/5778234.png" alt="StudyMonk Logo" class="logo" />
            <h1>🎉 Congratulations!</h1>
            <p class="subheader">You're now enrolled in your new course</p>
        </div>

        <p>Hello <strong>[Student's Name]</strong>,</p>

        <p>Thank you for choosing StudyMonk! We're thrilled to have you join our learning community and can't wait to
            see what you'll achieve.</p>

        <div class="course-card">
            <div class="course-name" id="courseName">Advanced JavaScript Programming</div>
            <p class="course-description">Master modern JavaScript concepts and build real-world applications</p>

            <div class="course-details">
                <div class="detail-item">
                    <div class="detail-label">Order ID</div>
                    <div class="detail-value" id="orderId">ORD789456</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Amount Paid</div>
                    <div class="detail-value" id="amount">₹1,299.00</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Enrollment Date</div>
                    <div class="detail-value" id="enrollDate">15 May 2023</div>
                </div>
            </div>
        </div>

        <div class="btn-container">
            <a href=${link} fclass="btn" > Start Learning Now →</a >
        </div >

        <p>We've attached your payment receipt to this email for your records. Your course materials are ready and
            waiting!</p>

        <div class="divider"></div>

        <div class="footer">
            <p><strong>Need help getting started?</strong></p>
            <p>Visit our <a href="[Help Center URL]" style="color: var(--primary-color);">Help Center</a> or reply to
                this email.</p>

            <div class="social-links">
                <a href="#" class="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
                </a>
            </div>

            <p>Happy Learning!<br />The StudyMonk Team</p>
        </div>
    </div >
</body >

</html > `;
}

module.exports = getConfirmContent;