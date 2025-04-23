import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaStar } from "react-icons/fa"
import { removeFromCart } from '../../../../Redux/Slices/cartSlice';

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  async function getRatting(params) {
    return await dispatch(getAverageRating(course._id));
  }

  return (
    <div className="flex flex-1 flex-col">
      {
        cart.map((course, inx) => (
          <div key={course._id}
            className={`flex w-full flex-wrap items-start justify-between gap-6 ${indx !== cart.length - 1 && "border-b border-b-gray-400 pb-6"
              } ${indx !== 0 && "mt-6"} `}
          >
            <img src={course?.thumbnail} alt="course"
              className="h-[148px] w-[220px] rounded-lg object-cover" />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-gray-500">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">
                  {getRatting(course._id)}
                </span>
                <ReactStars
                  count={5}
                  value={course?.rate_review?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-gray-400">
                  {course?.rate_review?.length} Ratings
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="mb-6 text-3xl font-medium text-yellow-200">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        ))
      }

    </div >
  )
}

export default RenderCartCourses
