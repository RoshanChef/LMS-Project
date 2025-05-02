import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getResetPassword } from '../services/operations/authAPI';

function ForgotPassword() {
    const { loading } = useSelector(state => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [resetComplete, setresetComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setformData] = useState({
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getResetPassword(email, setEmailSent));
    }

    return (
        <div className='grid text-white min-h-[calc(100vh-3.5rem)] place-items-center'>
            {loading == 1 ?
                (
                    <div className='w-screen h-[80vh] flex justify-center items-center'>
                        <div className="custom-loader"></div>
                    </div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-gray-100'>
                            {!emailSent ? "Reset your password" : "Check email"}
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-gray-400'>
                            {!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                `We have sent the reset email to {email}`}
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent ? (
                                    <label>
                                        <p className='text-sm py-2'>Email Address</p>
                                        <input type="email" required
                                            className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            name='email' placeholder='Enter the Email' value={email} onChange={e => setEmail(e.target.value)} />
                                    </label>

                                ) : (
                                    <div></div>
                                )
                            }
                            <button className="mt-7 rounded-[8px] cursor-pointer  text-black bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full">
                                {!emailSent ? "Resend  Password" : "Resend Email"}
                            </button>
                        </form>
                        <div >
                            <Link to="/login" className='flex py-3 items-center gap-3'>
                                <FaArrowLeftLong size={12} />
                                <p>Back to Login</p>
                            </Link>
                        </div>


                    </div>
                )
            }
        </div >
    );
}

export default ForgotPassword;