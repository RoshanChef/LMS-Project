import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
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

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, [])
    console.log(loading);


    function submitHandler(event) {
        event.preventDefault();
        console.log(signupData);

        const { accountType, firstname, lastname, email, password } = signupData;
        dispatch(signUp(otp, accountType, firstname, lastname, email, password, navigate));
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading == 1 ? (<div className="custom-loader"></div>)
                    : (
                        <div className="max-w-[500px] p-4 lg:p-8 text-white">
                            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                                Verify Email</h1>
                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                                A verification code has been sent to you. Enter the code below</p>
                            <form onSubmit={submitHandler}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input
                                            {...props}
                                            placeholder="-"
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }}
                                            className="w-[48px] lg:w-[60px] border-0 bg-[#131a27] rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-500"
                                        />
                                    )}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                    }}
                                />
                                <button type="submit" className="mt-7 rounded-[8px] cursor-pointer  text-black bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full">
                                    Verify Email
                                </button>
                            </form>
                            <div className="flex justify-between" >
                                <Link to="/signup" className='flex py-3 items-center gap-3'>
                                    <FaArrowLeftLong size={12} />
                                    <p>Back to Signup</p>
                                </Link>
                                <div className="text-sm text-blue-400 flex gap-2 items-center cursor-pointer"
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                                    <RxCountdownTimer />
                                    <p>Resend it</p>
                                </div>
                            </div>
                        </div>)
            }
        </div>
    );
}

export default VerifyEmail;
