import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailAPI';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../components/Common/RatingStars';
import GetAvgRating from '../utils/GetAvgRat';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { formatDate } from '../services/formatDate';
import { BsGlobe } from 'react-icons/bs';
import { createorderApi } from '../services/operations/paymentAPI';
import { IoMdReturnRight } from "react-icons/io";
import { FiShare2, FiUser } from 'react-icons/fi';
import ConfirmationModel from '../components/Common/ConfirmationModel';
import toast from 'react-hot-toast';
import { addToCart } from '../Redux/Slices/cartSlice';
import Accrodian from '../components/core/DetailPage/Accrodian';

function DetailsPage() {
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.profile);
  const { loading } = useSelector(state => state.auth);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [date, setDate] = useState(null);

  const [totalNumOfLec, setTotalNumOfLec] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isActive, setIsActive] = useState([]);

  function check() {
    console.log(course._id, user.courses)
    return user.courses.includes(course._id);
  }

  function handleActive(id) {
    setIsActive(!isActive.includes(id) ? isActive.concat(id) : isActive.filter(e_id => e_id !== id))
  }

  useEffect(() => {
    async function getCourse() {
      const response = await fetchCourseDetails(id, token);
      setCourse(response[0]);
      // console.log("courses ", response);
    }
    getCourse();
  }, [id, token]);

  useEffect(() => {
    if (course?.rate_review?.length > 0) {
      setAvgRating(GetAvgRating(course.rate_review));
    }
    let lectures = 0, total_dur = 0;

    (course?.courseContent || []).forEach(sec => {
      lectures += sec.subSection.length;
      if (sec?.subSection?.length > 0) {
        sec.subSection.forEach(sub => {
          total_dur += parseFloat(sub.timeDuration);
        })
      }
    });

    setTotalNumOfLec(lectures);
    setTotalDuration(total_dur);
  }, [course]);

  useEffect(() => {
    if (course?.createdAt) {
      setDate(formatDate(course.createdAt));
    }
  }, [course]);

  useEffect(() => {
    if (course && user) {
      const isEnrolled = course.studentEnrolled?.some((student) => {
        return String(student._id) === String(user._id);
      });
      setAlreadyEnrolled(isEnrolled);
    } else {
      setAlreadyEnrolled(false);
    }
  }, [course, user?._id]);
  // /view-course/course?._id/section/course?.courseContent[0]._id/sub-section/course?.courseContent[0].subSection[0]._id
  console.log(course, course?.courseContent[0].subSection[0]._id)

  async function handleBuyNow() {
    if (token) {
      let result = await createorderApi({ courses: [course._id] }, user, token, navigate, dispatch);
      if (result) {
        console.log('result i got of payment ', result);
      }
    }
    else {
      setConfirmationModal({
        text1: "you are not logged in",
        text2: "please login to continue",
        btn1Text: "login",
        btn2Text: "cancel",
        btn1Handler: () => navigate('/login'),
        btn2Handler: () => setConfirmationModal(null)
      });
    }
  }

  if (!course) {
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className='custom-loader'></div>
      </div>
    );
  }

  if (loading || !course) {
    return (
      <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className='custom-loader'></div>
      </div>
    )
  }

  function handleAddToCart() {
    if (!user || !token || user.accountType === 'instructor') {
      navigate('/login');
      return;
    }
    dispatch(addToCart(course));
  }

  return (
    <div className='min-h-[100vh] bg-[#01050C] mt-16'>
      <div className='w-full mx-auto px-4 sm:px-6'>
        {/* Upper section */}
        <div className="relative flex w-full flex-col lg:flex-row gap-6 bg-gray-900 p-4 md:p-6 rounded-b-xl shadow-lg">
          {/* Course Info Section */}
          <div className="space-y-4 text-white lg:w-[65%] xl:w-[70%]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-sm">{course?.courseName}</h1>
            <p className="text-sm sm:text-base text-gray-300">{course?.courseDescription}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-400">
              <p className="font-semibold text-yellow-400 text-base sm:text-lg">{avgRating}</p>
              <RatingStars Review_Count={avgRating} />
              <p className='text-white'>({course?.rate_review?.length} Reviews)</p>
              <p>{course?.studentEnrolled?.length} Students Enrolled</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <FiUser className="h-5 w-5 p-1 text-gray-300 bg-gray-700/80 rounded-full border border-gray-600" />
                  {course?.instructor?.profilePicture && (
                    <img
                      src={course.instructor.profilePicture}
                      alt="Instructor"
                      className="absolute inset-0 h-5 w-5 rounded-full object-cover"
                    />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  Created by{" "}
                  <span className="font-semibold text-yellow-300">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm">
                <AiOutlineInfoCircle />
                <p>{formatDate(course?.createdAt)}</p>
                <p className='flex items-center gap-2 text-white'> <BsGlobe /> English</p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="w-full lg:w-[31%] lg:absolute right-4 xl:w-[26%] bg-gray-700/60 rounded-xl p-4 shadow-md space-y-4 mt-4 lg:mt-0">
            <div className='w-full h-40 sm:h-44 overflow-hidden rounded-lg'>
              <img
                src={course?.thumbnail}
                alt="Course Thumbnail"
                className="w-full h-full object-cover rounded-lg transition-all duration-400 hover:scale-110"
              />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">₹ {course?.price}</p>

            {user?.accountType === 'Instructor' ? (
              <div className="text-center text-gray-300 py-2">
                Not available for instructors
              </div>
            ) : !alreadyEnrolled ? (
              <>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition text-sm sm:text-base"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-2 rounded-lg transition text-sm sm:text-base">
                  Add to Cart
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]._id}/sub-section/${course?.courseContent[0].subSection[0]._id}`)}
                className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold py-2 rounded-lg transition text-sm sm:text-base">
                Go to Course
              </button>
            )}

            <p className="text-xs text-gray-400 text-center">30-day Money Back Guarantee</p>

            <div className="border-t border-gray-700 pt-3">
              <p className="font-medium text-white mb-2 text-sm sm:text-base">This Course Includes:</p>
              <div className="space-y-1">
                {course?.instructions?.map((item, inx) => (
                  <p key={inx} className="flex items-start gap-2 text-xs sm:text-sm text-green-300">
                    <IoMdReturnRight className="mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('URL copied to clipboard');
                }}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-xl shadow-md transition-all"
              >
                <FiShare2 className="text-sm sm:text-lg" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Learn section */}
        <div className='border border-gray-500 rounded-lg p-4 my-4 w-full lg:w-[65%] xl:w-[70%]'>
          <h2 className='text-lg sm:text-xl font-semibold mb-2'>What you'll learn</h2>
          <p className='text-gray-300 text-sm'>{course?.what_learn}</p>
        </div>

        {/* Course content section */}
        <div className="flex flex-col gap-3 p-4 rounded-xl w-full lg:w-[65%] xl:w-[70%] shadow-md mb-6">
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Course Content</h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-300 text-sm font-medium">
            <div className='flex gap-2 flex-wrap'>
              <span>{course.courseContent.length} sections</span>
              <span>{totalNumOfLec} lectures</span>
              <span>{(totalDuration / 60).toFixed(2)} Hrs</span>
            </div>
            <button
              className="text-yellow-300 hover:text-yellow-400 text-sm font-semibold cursor-pointer transition-colors"
              onClick={() => setIsActive([])}
            >
              Collapse all sections
            </button>
          </div>
          <div className="mt-3">
            {course?.courseContent.map((sec, inx) => (
              <Accrodian
                section={sec}
                key={inx}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>
        </div>

        {/* Author section */}
        <div className='p-4 flex flex-col gap-4  mb-6 w-full lg:w-[65%] xl:w-[70%]'>
          <h1 className='text-xl sm:text-2xl font-medium'>Author</h1>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 sm:h-12 sm:w-12'>
              <img
                src={course.instructor.image}
                alt=""
                className='object-cover rounded-full w-full h-full'
              />
            </div>
            <div>
              <p className='text-base sm:text-xl font-medium'>
                {course.instructor.firstName} {course.instructor.lastName}
              </p>
              <p className='text-gray-400 text-sm'>
                Instructor at Learnify
              </p>
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModel modelData={confirmationModal} />}
    </div>
  );
}

export default DetailsPage;
