import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Loginform() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {

  }


  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-white mt-8 flex flex-col gap-2">
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
          <label className="relative gap-y-1 flex flex-col w-full text-white">
            <p className="text-sm">Password <sup className="text-red-400">*</sup></p>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: { value: 6, message: 'Max Len should be atleast 6' },
                  maxLength: { value: 20, message: 'Max Len should be max 20' }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="bg-[#161D29] p-2 pr-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              <div
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xl text-gray-400"
              >
                {showPassword ? <IoEyeOutline color="white" /> : <IoEyeOffOutline />}
              </div>
            </div>
            <Link to="/forgot-password" >
              <p className='text-green-400 text-xs absolute right-0'>Forgot Password?</p>
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-7 rounded-[8px] cursor-pointer  text-black bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Loginform
