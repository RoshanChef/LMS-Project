import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconBtn from '../../../Common/IconBtn';
import { changePassword } from '../../../../services/operations/settingAPI';

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
    resetField,
    formState: { errors },
  } = useForm();


  const submitPasswordForm = async (data) => {
    try {
      dispatch(changePassword(token, data.oldPassword, data.newPassword));
      
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-700 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

          {/* Old Password Field */}
          <div className="relative flex flex-col gap-2 lg:w-[98%]">
            <label>
              <p>Old Password</p>
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* New Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label>
                New Password
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  {...register("newPassword", { required: true })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.newPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your New Password.
                  </span>
                )}
              </label>
            </div>

            {/* Confirm Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label>
                Confirm Password
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match",
                  })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.confirmPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-[#161D29] py-2 px-5 font-semibold text-gray-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </div>

  )
}

export default UpdatePassword