import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../Redux/Slices/viewCourseSlice";
import VideoDetailSlider from "../components/core/ViewCourse/VideoDetailSlider";
import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI'
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

export default function ViewCourse() {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getFullDetailsOfCors() {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            // console.log('courseData i got ', courseData);

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails.courseContent?.forEach((section) => {
                lectures += section.subSection.length;
            })
            dispatch(setTotalNoOfLectures(lectures));
        }

        getFullDetailsOfCors();
    }, []);

    return (
        <div className="mt-16 flex w-screen overflow-x-hidden">
            <VideoDetailSlider setReviewModal={setReviewModal} />
            <div className="w-[75%] h-[70vh]">
                <Outlet />
            </div>
            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
            }
        </div>
    )
}