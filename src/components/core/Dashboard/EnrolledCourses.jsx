import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileAPI.JS';

function EnrolledCourses() {
  const { token } = useSelector(state => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const dispatch = useDispatch();

  async function getEnrCourses(token) {
    try {
      let data = await getEnrolledCourses(token);
      setEnrolledCourses(data);
    } catch (error) {

    }
  }

  useEffect(() => {
    getEnrCourses();
  }, []);
  return (
    <div className='min-h-[100vh]'>
      <h1 className='text-2xl font-bold'>Enrolled Courses</h1>
      {
        !enrolledCourses ? (<div className='custom-loader'> </div>)
          : !enrolledCourses.length ? (<p>You have not Enrolled in any courses yet </p>) :
            (<div>
              <div >
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>
              {/* card part started  */}
              {
                enrolledCourses.map((course, inx) => (
                  <div key={inx}>
                    <div>
                      <img src={`${course.thumbnail}`} alt="" />
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>

                    {/* duration */}
                    <div>
                      {course?.courseDuration}
                    </div>

                    {/* progress */}
                    <div>
                      <p>Progress : {course?.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course?.progressPercentage || 0}
                        height='8px'
                        isLabelVisible={false}
                        bgColor="#4f46e5" />
                    </div>
                  </div>
                ))
              }
            </div>)
      }
    </div>
  )
}

export default EnrolledCourses
