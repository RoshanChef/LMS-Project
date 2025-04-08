function getOtpContent(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>OTP Verification</title>
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

.otp-box {
    background-color: var(--secondary-color);
    border-radius: 6px;
    padding: 12px;
    text-align: center;
    font-size: clamp(20px, 6vw, 28px);
    font-weight: bold;
    letter-spacing: 3px;
    color: var(--primary-color);
    margin: 20px 0;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.otp-box:active {
    transform: scale(0.97);
    background-color: #e1eafc;
}

.tooltip {
    visibility: hidden;
    background: var(--tooltip-bg);
    color: var(--tooltip-text);
    text-align: center;
    border-radius: 6px;
    padding: 8px 16px;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%) scale(0.9);
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
    z-index: 100;
    box-shadow: var(--tooltip-shadow);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-top: 8px solid var(--tooltip-bg);
}

.tooltip.show {
    visibility: visible;
    opacity: 1;
    transform: translateX(-50%) scale(1);
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-5px);
    }
}

.tooltip svg {
    margin-right: 6px;
    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));
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

@media (min-width: 480px) {
    .container {
        padding: 30px;
    }
    .logo {
        max-width: 150px;
    }
    .otp-box {
        padding: 15px;
        letter-spacing: 5px;
        margin: 25px 0;
    }
    .tooltip {
        font-size: 15px;
        padding: 10px 20px;
        top: -55px;
    }
}

@media (max-width: 360px) {
    .otp-box {
        font-size: 18px;
        letter-spacing: 2px;
        padding: 10px;
    }
    .tooltip {
        font-size: 13px;
        top: -45px;
        padding: 7px 14px;
    }
}
</style>
</head> 
<body>  
<div     class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dfxv7kj1t/image/upload/v1744096242/course_thumbnail/lhou8tihajmfzdxgocbl.png" alt="Gmail Logo" class="logo" />
            <h1>Verify your email address</h1>
        </div>

    <p>Hello,</p>

    <p>To complete your verification process, please use the following One-Time Password (OTP):</p>

    <div class="otp-box" id="otpBox">
        <div id="otp_text">${otp}</div>
        <div class="tooltip" id="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            OTP copied!
        </div>
    </div>

    <p>This OTP is valid for 5 minutes. Please do not share this code with anyone.</p>

    <div class="divider"></div>

    <p class="note">If you didn't request this code, you can safely ignore this email. Someone might have entered
        your email address by mistake.</p>

    <div class="footer">
        <p>Thanks,<br />The StudyMonk Team</p>
    </div>
</div>
</body>

</html>`;
}


module.exports = getOtpContent;