import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileAPI'
import { useNavigate } from 'react-router-dom';

function EnrolledCourses() {
  const { token } = useSelector(state => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  async function getEnrCourses() {
    try {
      const data = await getEnrolledCourses(token);
      setEnrolledCourses(data);
    } catch (error) {
      console.log('error in enrolled course ', error);
    }
  }

  function calDuration(content) {
    let totalSeconds = 0;

    content.forEach(sec => {
      sec.subSection.forEach(sub => {
        totalSeconds += parseFloat(sub.timeDuration);
      });
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const parts = [];
    if (hours > 0) parts.push(`${hours}hr`);
    if (minutes > 0) parts.push(`${minutes}min`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
  }



  useEffect(() => {
    getEnrCourses();

  }, []);

  return (
    <div className="min-h-screen mt-4 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        Enrolled Courses
      </h1>

      {!enrolledCourses ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : !enrolledCourses.length ? (
        <div className="text-center p-8 rounded-xl bg-[#1e2536] border border-[#2a3245]">
          <p className="text-gray-400 text-lg">You have not enrolled in any courses yet.</p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
          <div className="hidden md:flex font-medium text-gray-400 border-b border-[#2a3245] pb-3 px-2">
            <p className="w-1/3">Course</p>
            <p className="w-1/6">Duration</p>
            <p className="w-1/2">Progress</p>
          </div>

          {/* Course Cards */}
          {enrolledCourses.map((course, index) => (
            <div
              key={index}
              onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].
                subSection[0]._id}`)}
              className="group cursor-pointer flex flex-col md:flex-row md:items-center gap-4 p-2 bg-[#1e2536] rounded-xl border border-[#2a3245] hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              {/* Course Info */}
              <div className="flex items-start gap-4 md:w-1/3">
                <div className="relative w-40 flex-shrink-0">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-24 object-cover rounded-lg border border-[#2a3245] group-hover:border-indigo-500/30 transition-colors"
                  />
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-100">{course.courseName}</p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{course.courseDescription}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="w-full md:w-1/6 text-gray-300   font-medium">
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {calDuration(course.courseContent)}
                </span>
              </div>

              {/* Progress */}
              <div className="w-full md:w-1/2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-indigo-400">{course?.progressPercentage || 0}%</span>
                </div>
                <div className="w-full h-1 bg-[#2a3245] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${course?.progressPercentage || 0}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default EnrolledCourses;
