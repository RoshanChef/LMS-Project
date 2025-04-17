import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {
    const { loading } = useSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const {token} = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    function onSubmit(data) {
        const { password, confirmPassword } = data;
        if (password != confirmPassword) {
            return toast.error("Password and confirm password does not match");
        }

        dispatch(resetPassword(password, token));
    }
    return (
        <div className='grid text-white min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ? <div className='custom-loader'></div> : (
                    <div className='max-w-[450px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-gray-100'>
                            Choose  new password
                        </h1>

                        <p className="text-gray-400">Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex gap-3 flex-col">
                            <label>
                                <p className=' text-white text-sm'>New Password<sup className="text-red-400">*</sup></p>
                                <div className="relative">
                                    <input
                                        {...register("password", {
                                            required: true,

                                        })}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                    <div
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl text-gray-400"
                                    >
                                        {showPassword ? <IoEyeOutline color="white" /> : <IoEyeOffOutline />}
                                    </div>
                                    {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                                </div>
                            </label>
                            <label>
                                <p>Confirm New Password<sup className="text-red-400">*</sup></p>
                                <div className="relative">
                                    <input
                                        {...register("confirmPassword", {
                                            required: true,
                                            minLength: { value: 6, message: 'Max Len should be atleast 6' },
                                            maxLength: { value: 20, message: 'Max Len should be max 20' }
                                        })}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter Confirm Password"
                                        className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                    <div
                                        onClick={() => setshowConfirmPassword(prev => !prev)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl text-gray-400"
                                    >
                                        {showConfirmPassword ? <IoEyeOutline color="white" /> : <IoEyeOffOutline />}
                                    </div>
                                    {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
                                </div>
                            </label>

                            <button type="submit" className="mt-7 rounded-[8px] cursor-pointer  text-black bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full">
                                Reset Password
                            </button>
                        </form>
                        <div >
                            <Link to="/login" className='flex py-3 items-center gap-3'>
                                <FaArrowLeftLong size={12} />
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>)
            }

        </div>
    )
}

export default UpdatePassword