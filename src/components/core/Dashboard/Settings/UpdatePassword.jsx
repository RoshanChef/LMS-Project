import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from '../../../../services/operations/settingAPI';
import { FiX } from 'react-icons/fi';

function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const submitPasswordForm = async (data) => {
    try {
      await dispatch(changePassword(token, data.oldPassword, data.newPassword));
      reset();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-8 flex border border-[#2a3245 transition-all hover:border-indigo-500/50 flex-col gap-y-6 rounded-xl bg-[#161D29] p-8 shadow-lg border border-[#2D3748]">
          <h2 className="text-2xl font-bold text-indigo-200">Change Password</h2>

          {/* Old Password Field */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm font-medium text-indigo-100">
              Old Password
              <div className="relative mt-1">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="w-full rounded-lg border border-[#2D3748] bg-[#1A202C] p-3 pr-10 text-indigo-50 placeholder-indigo-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                  {...register("oldPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-indigo-100 focus:outline-none"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <span className="mt-1 text-xs text-rose-300">
                  Please enter your current password
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            {/* New Password */}
            <div className="relative flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium text-indigo-100">
                New Password
                <div className="relative mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Create new password"
                    className="w-full rounded-lg border border-[#2D3748] bg-[#1A202C] p-3 pr-10 text-indigo-50 placeholder-indigo-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                    {...register("newPassword", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-indigo-100 focus:outline-none"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={20} />
                    ) : (
                      <AiOutlineEye fontSize={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="mt-1 text-xs text-rose-300">
                    Please enter a new password
                  </span>
                )}
              </label>
            </div>

            {/* Confirm Password */}
            <div className="relative flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium text-indigo-100">
                Confirm Password
                <div className="relative mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full rounded-lg border border-[#2D3748] bg-[#1A202C] p-3 pr-10 text-indigo-50 placeholder-indigo-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === watch("newPassword") || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-indigo-100 focus:outline-none"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={20} />
                    ) : (
                      <AiOutlineEye fontSize={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="mt-1 text-xs text-rose-300">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="flex items-center gap-2 cursor-pointer rounded-lg border border-[#2a3245] bg-transparent px-5 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-[#2a3245] hover:text-white"
          >
            <FiX className="h-4 w-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:ring-offset-1 transition-colors"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>

  )
}

export default UpdatePassword