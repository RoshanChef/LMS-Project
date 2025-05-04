import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx"
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FaStar } from "react-icons/fa"
import ReactStars from "react-stars"
import { create_Rating } from '../../../services/operations/reviewAPI'

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    setValue('courseExperience', '')
    setValue('courseRating', 0)
  }, [setValue])

  const ratingChange = (rating) => {
    setValue('courseRating', rating)
  }


  const onSubmit = async (data) => {
    let obj = {
      rating: data.courseRating,
      review: data.courseExperience,
      courseId: courseEntireData._id
    };
    await create_Rating(obj, token);
    setReviewModal(false); 
  }

  return (
    // <div className="fixed text-black inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-transparent bg-opacity-100 backdrop-blur-sm">
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative transition-all duration-300 ease-in-out">

        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">Share Your Feedback</h2>
          <RxCross2
            onClick={() => setReviewModal(false)}
            className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition duration-200"
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <p className="text-lg font-medium text-gray-700">{user?.firstName} {user?.lastName}</p>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Rating Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Rate this course</label>
            <div className="flex items-center text-black gap-2">
              <ReactStars
                count={5}
                size={28}
                onChange={ratingChange}
                activeColor="#facc15"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
                color="#393E46"
              />
              <span className="text-sm text-gray-600 ml-2">
                {getValues("courseRating") || 0}/5
              </span>
            </div>
          </div>

          {/* Experience Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">Your Experience</label>
            <textarea
              {...register("courseExperience", { required: true })}
              placeholder="Write your thoughts about this course..."
              rows={5}
              className="w-full p-4 rounded-xl border border-gray-300 text-[#393E46] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition duration-200"
            />
            {errors.courseExperience && (
              <p className="text-red-500 text-sm mt-1">This field is required.</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-400 cursor-pointer hover:bg-yellow-300 text-black font-semibold rounded-xl shadow-sm transition duration-200"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default CourseReviewModal