
function getPaymentContent() {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Successful</title>
    <style>
        :root {
            --primary-color: #4285f4;
            /* Blue instead of green to match logo */
            --secondary-color: #e8f5e9;
            --text-color: #333;
            --light-text: #666;
            --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            --success-bg: #e8f5e9;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: #f9f9f9;
            padding: 10px;
        }

        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: var(--shadow);
            max-width: 600px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            max-width: 100px;
            height: auto;
            margin-bottom: 15px;
        }

        h1 {
            color: var(--primary-color);
            font-size: clamp(20px, 5vw, 24px);
            margin-bottom: 15px;
        }

        .success-icon {
            font-size: 60px;
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 15px;
            font-size: clamp(14px, 3vw, 16px);
        }

        .details-box {
            background-color: var(--secondary-color);
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }

        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .detail-label {
            font-weight: 500;
            color: var(--light-text);
        }

        .detail-value {
            font-weight: 600;
        }

        .btn {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            text-align: center;
            margin-top: 15px;
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: #3367d6;
        }

        .footer {
            margin-top: 25px;
            font-size: 14px;
            color: var(--light-text);
            text-align: center;
        }

        .divider {
            border-top: 1px solid #eee;
            margin: 20px 0;
        }

        @media (min-width: 480px) {
            .container {
                padding: 30px;
            }

            .logo {
                max-width: 150px;
            }

            .details-box {
                padding: 20px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn-icons-png.flaticon.com/512/5778/5778234.png" alt="StudyMonk Logo" class="logo" />
            <div class="success-icon">✓</div>
            <h1>Payment Received Successfully</h1>
        </div>

        <p>Thank you for your payment! Your transaction has been completed successfully.</p>

        <div class="details-box">
            <div class="detail-row">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value" id="paymentId">PAY123456789</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Amount Paid:</span>
                <span class="detail-value" id="amount">₹1,299.00</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Course Name:</span>
                <span class="detail-value" id="courseName">Advanced JavaScript</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time:</span>
                <span class="detail-value" id="dateTime">May 15, 2023 at 10:30 AM</span>
            </div>
        </div>

        <p>We've sent a confirmation email to your registered email address with all the details.</p>

        <div style="text-align: center;">
            <a href="/my-courses" class="btn">Access Your Course</a>
        </div>

        <div class="divider"></div>

        <div class="footer">
            <p>Need help? <a href="mailto:support@studymonk.com">Contact our support team</a></p>
            <p>Thanks,<br />The StudyMonk Team</p>
        </div>
    </div>
</body>

</html>`;
}

module.exports = getPaymentContent;