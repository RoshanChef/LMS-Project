import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";


function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function submitHandler(event) {
        event.prevent
    }

    return (
        <div>
            {
                loading ? <div className="custom-loader"></div> : (<div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={submitHandler}>
                        <OTPInput
                            value={otp}
                        ></OTPInput>
                    </form>
                </div>)
            }
        </div>
    );
}

export default VerifyEmail;
