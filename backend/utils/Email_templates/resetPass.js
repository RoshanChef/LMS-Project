function getResetContent(link) {
    return `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Password Reset Request</title>
                        <style>
                        :root {
                            --primary-color: #4285f4;
                            --secondary-color: #f1f3f4;
                            --text-color: #333;
                            --light-text: #666;
                            --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            --tooltip-bg: rgba(0, 0, 0, 0.9);
                            --tooltip-text: #fff;
                            --tooltip-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
                            color: #202124;
                            font-size: clamp(20px, 5vw, 24px);
                            margin-bottom: 15px;
                        }

                        p {
                            margin-bottom: 15px;
                            font-size: clamp(14px, 3vw, 16px);
                        }

                        .reset-link {
                            display: inline-block;
                            background-color: var(--primary-color);
                            color: #fff;
                            padding: 12px 24px;
                            border-radius: 6px;
                            text-decoration: none;
                            font-size: 16px;
                            margin: 20px 0;
                            transition: background-color 0.3s;
                        }

                        .reset-link:hover {
                            background-color: #3367d6;
                        }

                        .footer {
                            margin-top: 25px;
                            font-size: 14px;
                            color: var(--light-text);
                            text-align: center;
                        }

                        .note {
                            font-size: 13px;
                            color: var(--light-text);
                            margin-top: 20px;
                        }

                        .divider {
                            border-top: 1px solid #eee;
                            margin: 20px 0;
                        }
                        </style>
                        </head> 
                        <body>  
                        <div class="container">
                            <div class="header">
                                <img src="https://cdn-icons-png.flaticon.com/512/5778/5778234.png" alt="Reset Password" class="logo" />
                                <h1>Reset Your Password</h1>
                            </div>

                            <p>Hello,</p>

                            <p>We received a request to reset your password. Click the button below to choose a new password:</p>

                            <a href=${link} target="_blank" class="reset-link">Reset Password</a>

                            <p>This link is valid for 5 minutes. If you did not request a password reset, please ignore this email or contact our support team for further assistance.</p>

                            <div class="divider"></div>

                            <p class="note">If you encounter any issues, please reach out to us.</p>

                            <div class="footer">
                                <p>Thanks,<br />The StudyMonk Team</p>
                            </div>
                        </div>
                        </body>

                        </html>
`;
}

module.exports = getResetContent; 