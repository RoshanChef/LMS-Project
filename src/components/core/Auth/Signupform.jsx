import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { setSignupData } from "../../../Redux/Slices/authSlice"
import { sendOtp } from "../../../services/operations/authAPI"

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { signupData } = useSelector((state) => state.auth);
    const [accountType, setAccountType] = useState("Student");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function onSubmit(data) {
        try {
            if (data.password !== data.confirmPassword) {
                return toast.error("Please enter same password", { duration: 1000 });
            }

            const payload = {
                ...data,
                accountType,
            };
            console.log(data , payload);
            

            // Setting signup data to state
            // To be used after otp verification
            dispatch(setSignupData(payload));

            console.log(signupData);


            // Send OTP to user for verification
            dispatch(sendOtp(data.email, navigate))


            // reset
            setAccountType("Student");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };



    return (
        <div className="mx-auto flex flex-col w-full">
            {/* Account Type Switch */}
            <div className="bg-[#161D29] text-gray-400 rounded-full my-6 flex p-1 items-center max-w-max select-none">
                <button
                    type="button"
                    className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200 ${accountType === "Student" ? "bg-[#01050C] text-white" : "bg-[#161D29]"}`}
                    onClick={() => setAccountType("Student")}
                >
                    Student
                </button>
                <button
                    type="button"
                    className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-200 ${accountType === "Instructor" ? "bg-[#01050C] text-white" : "bg-[#161D29]"}`}
                    onClick={() => setAccountType("Instructor")}
                >
                    Instructor
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-white">
                {/* First & Last Name */}
                <div className="flex gap-3 flex-wrap w-full">
                    <label className="gap-y-1 flex flex-col flex-1 min-w-[200px]">
                        <p className="text-sm">First Name<sup className="text-red-400">*</sup></p>
                        <input
                            {...register("firstname", { required: true })}
                            type="text"
                            placeholder="First Name"
                            className="bg-[#161D29] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>

                    <label className="gap-y-1 flex flex-col flex-1 min-w-[200px]">
                        <p className="text-sm">Last Name<sup className="text-red-400">*</sup></p>
                        <input
                            {...register("lastname", { required: true })}
                            type="text"
                            placeholder="Last Name"
                            className="bg-[#161D29] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                </div>

                {/* Email */}
                <label>
                    <p>Email<sup className="text-red-400">*</sup></p>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="xyz@gmail.com"
                        className="bg-[#161D29] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                </label>

                {/* Passwords */}
                <div className="flex lg:flex-row flex-col gap-3">
                    {/* Create Password */}
                    <label className="gap-y-1 flex flex-col w-full">
                        <p className="text-sm">Create Password <sup className="text-red-400">*</sup></p>
                        <div className="relative">
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: { value: 6, message: 'Max Len should be atleast 6' },
                                    maxLength: { value: 15, message: 'Max Len should be max 15' },
                                    validate: {
                                        hasUpper: (value) =>
                                            /[A-Z]/.test(value) || "Must include at least one uppercase letter , one special character , one lowercase lette,one number",
                                        hasLower: (value) =>
                                            /[a-z]/.test(value) || "Must include at least one uppercase letter , one special character , one lowercase lette,one number",
                                        hasNumber: (value) =>
                                            /[0-9]/.test(value) || "Must include at least one uppercase letter , one special character , one lowercase lette,one number",
                                        hasSpecial: (value) =>
                                            /[^A-Za-z0-9]/.test(value) || "Must include at least one uppercase letter , one special character , one lowercase lette,one number",
                                    }
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
                        </div>
                        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}

                    </label>

                    {/* Confirm Password */}
                    <label className="gap-y-1 flex flex-col w-full">
                        <p className="text-sm">Confirm Password <sup className="text-red-400">*</sup></p>
                        <div className="relative">
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                    minLength: { value: 6, message: 'Max Len should be atleast 6' },
                                    maxLength: { value: 15, message: 'Max Len should be max 15' }
                                })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            />
                            <div
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl text-gray-400"
                            >
                                {showConfirmPassword ? <IoEyeOutline color="white" /> : <IoEyeOffOutline />}
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
                    </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-7 rounded-[8px] cursor-pointer  text-black bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full">
                    Create Account
                </button>
            </form>
        </div>
    );
}
