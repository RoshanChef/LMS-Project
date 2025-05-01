import React, { useEffect, useState } from 'react';
import { ACCOUNT_TYPE } from "../data/constants";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailAPI';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../components/Common/RatingStars';
import GetAvgRating from '../utils/GetAvgRat';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { formatDate } from '../services/formatDate';
import { BsGlobe } from 'react-icons/bs';
import { createorderApi } from '../services/operations/paymentAPI';
import { IoIosTimer } from "react-icons/io";
import { FaArrowPointer } from "react-icons/fa6";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FiUser } from 'react-icons/fi';

function DetailsPage() {
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function getCourse() {
      const response = await fetchCourseDetails(id, token);
      setCourse(response);
      console.log("courses ", response);
    }
    getCourse();
  }, [id, token]);

  useEffect(() => {
    if (course?.rate_review?.length > 0) {
      setAvgRating(GetAvgRating(course.rate_review));
    }
  }, [course]);

  useEffect(() => {
    if (course?.createdAt) {
      setDate(formatDate(course.createdAt));
    }
  }, [course]);

  async function handleBuyNow() {
    if (token) {
      let result = await createorderApi({ courses: course }, user, token, navigate, dispatch);
      if (result) {
        console.log('result i got of payment ', result);
      } else {
        console.log('error in payment');
      }
    }
  }

  if (!course) {
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className='custom-loader'></div>
      </div>
    );
  }
  console.log(course);

  return (
    <div className='min-h-screen' >
      <div>

        {/* upper section */}
        <div className="relative flex flex-col lg:flex-row gap-8 bg-gray-900 p-6 rounded-b-xl shadow-lg">

          {/* Course Info Section */}
          <div className="flex-1 space-y-5 text-white">
            <h1 className="text-4xl font-extrabold drop-shadow-sm">{course[0].courseName}</h1>
            <p className="text-gray-300">{course[0].courseDescription}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <p className="font-semibold text-yellow-400 text-lg">{avgRating}</p>
              <RatingStars Review_Count={avgRating} />
              <p className='text-white'>({course[0]?.rate_review?.length} Reviews)</p>
              <p>{course[0]?.studentEnrolled?.length} Students Enrolled</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="relative">
                <FiUser className="h-5 w-5 p-1 text-gray-300 bg-gray-700/80 rounded-full border border-gray-600" />
                {course[0]?.instructor?.profilePicture && (
                  <img
                    src={course[0].instructor.profilePicture}
                    alt="Instructor"
                    className="absolute inset-0 h-5 w-5 rounded-full object-cover"
                  />
                )}
              </div>
              <p className="text-sm text-gray-400">
                Created by{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {course[0]?.instructor?.firstName} {course[0]?.instructor?.lastName}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <AiOutlineInfoCircle />
              <p>{formatDate(course[0]?.createdAt)}</p>
              <p className='flex items-center gap-2 text-white'> <BsGlobe /> English</p>
            </div>
          </div>

          {/* Card */}
          <div className="w-full absolute right-12 box-content lg:w-80 bg-gray-700/60 rounded-xl p-5 shadow-md space-y-4">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
              <img
                src={course[0]?.thumbnail}
                alt="Course Thumbnail"
                className="w-full h-full object-cover rounded-lg transition-all duration-400 hover:scale-110"
              />
            </div>
            <p className="text-2xl font-bold text-white">₹ {course[0]?.price}</p>

            <button
              onClick={handleBuyNow}
              className="w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Buy Now
            </button>
            <button className="w-full border cursor-pointer border-yellow-400 text-yellow-400 font-semibold py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition">
              Add to Cart
            </button>

            <p className="text-xs text-gray-400 text-center">30-day Money Back Guarantee</p>

            <div className="border-t border-gray-700 pt-4">
              <p className="font-medium text-white mb-2">This Course Includes:</p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-center text-green-400 gap-2"><IoIosTimer /> 8 hours on-demand video</li>
                <li className="flex items-center text-green-400 gap-2"><FaArrowPointer /> Full lifetime access</li>
                <li className="flex items-center text-green-400 gap-2"><SiPrivateinternetaccess /> Access on mobile and TV</li>
                <li className="flex items-center text-yellow-400 gap-2"><AiOutlineSafetyCertificate /> Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* learn section */}
        <div className='border flex flex-col gap-2 border-gray-500 w-[60vw] p-4 m-3'>
          <h2 className='text-xl'>What you'll learn</h2>
          <p className='text-gray-300 text-sm'>{course[0]?.what_learn}</p>
        </div>

        {/* description section */}

      </div>
    </div >

  );
}

export default DetailsPage;
