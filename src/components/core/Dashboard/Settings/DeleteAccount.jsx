import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_Account } from "../../../../services/operations/profileAPI";

function DeleteAccount() {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmData: false,
            confirmAccess: false,
        },
    });

    const onSubmit = async (data) => {
        console.log("Account deletion submitted:", data);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            delete_Account(token, data.password, navigate, dispatch);
        } catch (error) {
            console.error("Account deletion failed:", error);
        }
    };

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#161d29]">
            <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 flex flex-col md:flex-row">
                {/* Left Side - Warning Illustration */}
                <div className="md:w-1/3 bg-indigo-900/10 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-700">
                    <div className="w-20 h-20 bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Account Deletion</h2>
                    <p className="text-indigo-300 text-center">This action cannot be undone. All your data will be permanently removed from our systems.</p>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-2/3 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Confirm Account Deletion</h3>
                            <div className="space-y-4">
                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                        Enter Your Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"
                                                } rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                            placeholder="••••••••"
                                            {...register("password", {
                                                required: "Password is required",

                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                {showPassword ? (
                                                    <>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirmation Checkboxes */}
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="confirmData"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                                                {...register("confirmData", {
                                                    required: "You must confirm this",
                                                })}
                                            />
                                        </div>
                                        <label htmlFor="confirmData" className="ml-3 block text-sm text-gray-300">
                                            I understand that all my data including profile information, saved content, and preferences will be permanently deleted.
                                        </label>
                                    </div>
                                    {errors.confirmData && (
                                        <p className="text-sm text-red-400">{errors.confirmData.message}</p>
                                    )}

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="confirmAccess"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500 bg-gray-700"
                                                {...register("confirmAccess", {
                                                    required: "You must confirm this",
                                                })}
                                            />
                                        </div>
                                        <label htmlFor="confirmAccess" className="ml-3 block text-sm text-gray-300">
                                            I understand I will lose access to all services associated with this account immediately.
                                        </label>
                                    </div>
                                    {errors.confirmAccess && (
                                        <p className="text-sm text-red-400">{errors.confirmAccess.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Warning Message */}
                        <div className="flex items-center text-sm text-red-400 bg-red-900/20 rounded-lg p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>Warning: Account deletion is immediate and permanent. You won't be able to recover any data after this action.</span>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard/my-profile")}
                                className="px-6 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={`px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors ${!isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    "Permanently Delete Account"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;