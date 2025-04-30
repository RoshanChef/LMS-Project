import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiX, FiCalendar, FiChevronDown, FiPhone, FiUser, FiSave } from "react-icons/fi"
import { updateProfile } from "../../../../services/operations/settingAPI"
import { useRef } from "react"

const genders = ["Male", "Female", "Prefer not to say", "Other"]

export default function EditProfile() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const dateRef = useRef(null);

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8">
                {/* Profile Information Section */}
                <div className="rounded-xl border transition-all hover:border-indigo-500/30 border-[#2a3245] bg-[#1e2536] p-8">
                    <h2 className="mb-6 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Profile Information
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-1">
                                First Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter first name"
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 pl-3 pr-10 text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                    {...register("firstName", { required: true })}
                                    defaultValue={user?.firstName}
                                />
                                <FiUser className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>
                            {errors.firstName && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    Please enter your first name
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">
                                Last Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter last name"
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 pl-3 pr-10 text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                    {...register("lastName", { required: true })}
                                    defaultValue={user?.lastName}
                                />
                                <FiUser className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>
                            {errors.lastName && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    Please enter your last name
                                </p>
                            )}
                        </div>

                        {/* Date of Birth - Fixed Calendar Icon */}
                        <div className="space-y-2">
                            <label
                                htmlFor="dateOfBirth"
                                className="block text-sm font-medium text-gray-400 mb-1"
                            >
                                Date of Birth
                            </label>
                            <div className="relative">
                                <input
                                    {...register("dateOfBirth", {
                                        required: "Please enter your Date of Birth",
                                        max: {
                                            value: new Date().toISOString().split("T")[0],
                                            message: "Date cannot be in the future",
                                        },
                                    })}
                                    ref={(e) => {
                                        register("dateOfBirth").ref(e);  // Hook Form ref
                                        dateRef.current = e;             // Your custom ref
                                    }}
                                    type="date"
                                    id="dateOfBirth"
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 pl-3 pr-10 text-gray-200 appearance-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                // defaultValue={user?.additionDetails?.dateOfBirth || ""}
                                />
                                <FiCalendar
                                    className=" absolute right-3 top-3.5 h-4 w-4 text-gray-500 cursor-pointer z-[1000]"
                                    onClick={() => { dateRef.current.showPicker(); }}
                                />
                            </div>
                            {errors.dateOfBirth && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    {errors.dateOfBirth.message}
                                </p>
                            )}
                        </div>



                        {/* Gender - Fixed Select Arrow */}
                        <div className="space-y-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-400 mb-1">
                                Gender
                            </label>
                            <div className="relative">
                                <select
                                    id="gender"
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 pl-3 pr-8 text-gray-200 appearance-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                    {...register("gender", { required: true })}
                                    defaultValue={user?.additionalDetails?.gender}
                                >
                                    {genders.map((gender, index) => (
                                        <option key={index} value={gender} className="bg-[#1e2536]">
                                            {gender}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>


                            {errors.gender && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    Please select your gender
                                </p>
                            )}
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2">
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-400 mb-1">
                                Contact Number
                            </label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    placeholder="Enter phone number"
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 pl-3 pr-10 text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                    {...register("contactNumber", {
                                        required: "Please enter your contact number",
                                        minLength: {
                                            value: 10,
                                            message: "Number must be at least 10 digits"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Number cannot exceed 12 digits"
                                        }
                                    })}
                                    defaultValue={user?.additionalDetails?.contactNumber}
                                />
                                <FiPhone className="absolute right-3 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                            </div>
                            {errors.contactNumber && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    {errors.contactNumber.message}
                                </p>
                            )}
                        </div>

                        {/* About */}
                        <div className="space-y-2">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-400 mb-1">
                                About
                            </label>
                            <div className="relative">
                                <textarea
                                    id="about"
                                    placeholder="Tell us about yourself"
                                    rows={3}
                                    className="w-full rounded-lg border border-[#2a3245] bg-[#161d29] p-3 text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                                    {...register("about", { required: "Please tell us about yourself" })}
                                    defaultValue={user?.additionalDetails?.about}
                                />
                            </div>
                            {errors.about && (
                                <p className="mt-1 text-xs text-amber-400 flex items-center gap-1">
                                    <FiAlertCircle className="h-3 w-3" />
                                    {errors.about.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3">
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
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
                    >
                        <FiSave className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    )
}