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
  const { paymentLoading } = useSelector(state => state.course);

  console.log()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [date, setDate] = useState(null);

  const [totalNumOfLec, setTotalNumOfLec] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isActive, setIsActive] = useState(Array(0));
  function handleActive(id) {
    setIsActive(!isActive.includes(id) ? isActive.concat(id) : isActive.filter(e_id => e_id !== id))
  }


  console.log('pagedetails ', course);

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
    console.log(total_dur);
  }, [course]);

  useEffect(() => {
    if (course?.createdAt) {
      setDate(formatDate(course.createdAt));
    }
  }, [course]);

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
    <div className='box-content h-[120vh] lg:relative bg-[#01050C] mt-16' >
      <div className='h-full'>

        {/* upper section */}
        <div className="relative flex flex-col lg:flex-row gap-8 bg-gray-900 p-6 rounded-b-xl shadow-lg">

          {/* Course Info Section */}
          <div className="space-y-5 text-white lg:w-[65vw]">
            <h1 className="text-4xl font-extrabold drop-shadow-sm">{course?.courseName}</h1>
            <p className="text-gray-300">{course?.courseDescription}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <p className="font-semibold text-yellow-400 text-lg">{avgRating}</p>
              <RatingStars Review_Count={avgRating} />
              <p className='text-white'>({course?.rate_review?.length} Reviews)</p>
              <p>{course?.studentEnrolled?.length} Students Enrolled</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
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
              <p className="text-sm text-gray-400">
                Created by{" "}
                <span className="font-semibold text-yellow-300">
                  {course?.instructor?.firstName} {course?.instructor?.lastName}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <AiOutlineInfoCircle />
              <p>{formatDate(course?.createdAt)}</p>
              <p className='flex items-center gap-2 text-white'> <BsGlobe /> English</p>
            </div>
          </div>

          {/* Card */}
          <div className="w-full absolute right-12 box-content lg:w-80 bg-gray-700/60 rounded-xl p-5 shadow-md space-y-4">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
              <img
                src={course?.thumbnail}
                alt="Course Thumbnail"
                className="w-full h-full object-cover rounded-lg transition-all duration-400 hover:scale-110"
              />
            </div>
            <p className="text-2xl font-bold text-white">₹ {course?.price}</p>
            {
              user?.accountType === 'Instructor' ? (
                <div>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="w-full border cursor-pointer border-yellow-400 text-yellow-400 font-semibold py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                    Add to Cart
                  </button>
                </>
              )
            }

            <p className="text-xs text-gray-400 text-center">30-day Money Back Guarantee</p>

            <div className="border-t border-gray-700 pt-4">
              <p className="font-medium text-white mb-2">This Course Includes:</p>
              {
                JSON.parse(course?.instructions).map((item, inx) => {
                  return (
                    <div key={inx}>
                      <p className="flex items-center gap-2 text-sm text-green-300"><IoMdReturnRight /> {item}</p>
                    </div>
                  )
                })
              }
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  // navigator.share()
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('URL copied to clipboard');
                }}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-md transition-all duration-200"
              >
                <FiShare2 className="text-lg" />
                Share
              </button>
            </div>

          </div>
        </div>

        {/* learn section */}
        <div className='border flex flex-col gap-2 border-gray-500 w-[60vw] p-4 m-3'>
          <h2 className='text-xl'>What you'll learn</h2>
          <p className='text-gray-300 text-sm'>{course?.what_learn}</p>
        </div>

        {/* description section */}
        <div className="flex flex-col gap-3  p-4 rounded-xl w-[62vw] shadow-md">
          <h1 className='text-3xl font-bold'>Course Content</h1>
          <div className="flex justify-between space-x-6  text-gray-300 text-sm font-medium">
            <span>{course.courseContent.length} sections</span>
            <span>{totalNumOfLec} lectures</span>
            <span>{(totalDuration / 60).toFixed(2)} Hrs</span>
            <button className="text-yellow-300 hover:text-yellow-400 text-sm font-semibold transition-colors">
              Collapse all sections
            </button>
          </div>
          <div>
            {
              course?.courseContent.map((sec, inx) => {
                return <Accrodian section={sec} key={inx} isActive={isActive} handleActive={handleActive} />
              })
            }
          </div>
        </div>



      </div>
      {
        confirmationModal && <ConfirmationModel modelData={confirmationModal} />
      }
    </div >

  );
}

export default DetailsPage;
