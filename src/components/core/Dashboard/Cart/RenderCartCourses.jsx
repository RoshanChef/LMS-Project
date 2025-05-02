import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaStar } from "react-icons/fa"
import { removeFromCart } from '../../../../Redux/Slices/cartSlice';
import RatingStars from '../../../Common/RatingStars';
import GetAvgRating from '../../../../utils/GetAvgRat';

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(0);
  const { course } = useSelector(state => state.course);

  useEffect(() => {
    if (course?.rate_review?.length > 0) {
      setAvgRating(GetAvgRating(course.rate_review));
    }
  }, [course]);


  return (
    <div className="flex flex-1 flex-col">
      {
        cart.map((course, inx) => (
          <div key={course._id}
            className={`flex w-full flex-wrap items-start justify-between gap-6 ${inx !== cart.length - 1 && "border-b border-b-gray-400 pb-6"
              } ${inx !== 0 && "mt-6"} `}
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
                <p>{avgRating}</p>
                <RatingStars Review_Count={avgRating} />
                <span className="text-gray-400">
                  ( {course?.rate_review?.length} Ratings )
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center cursor-pointer gap-x-2 rounded-lg border border-indigo-500/30 bg-indigo-600/10 hover:bg-indigo-600/20 py-2.5 px-4 text-indigo-100 hover:text-white transition-all duration-200 group shadow-[0_0_0_1px_rgba(99,102,241,0.2)] hover:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
              >
                <RiDeleteBin6Line className="text-indigo-300 group-hover:text-indigo-100 transition-colors duration-200 transform group-hover:scale-110" />
                <span className="text-sm font-medium">Remove</span>
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
