import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailAPI';
import { useSelector } from 'react-redux';
import RatingStars from '../components/Common/RatingStars';
import GetAvgRating from '../utils/GetAvgRat';
import { formatDate } from '../services/formatDate';

function DetailsPage() {
    const { id } = useParams();
    const { token } = useSelector(state => state.auth);
    const [course, setCourse] = useState({});
    const [avgRating, setAvgRating] = useState(0);
    const [date, setDate] = useState(null);

    useEffect(() => {
        async function getCourse() {
            const response = await getFullDetailsOfCourse(id, token);
            setCourse(response);
        }
        getCourse();
    }, [id, token]);

    useEffect(() => {
        if (course?.rate_review) {
            setAvgRating(GetAvgRating(course.rate_review)); // Update avgRating after course data is set
        }
    }, [course]);
    useEffect(() => {
        if (course?.createdAt) {
            setDate(formatDate(course.createdAt)); // Update date after course data is set
        }
    }, [course]); // Runs whenever course data changes

    return (
        <div>
            <div>
                <h1>{course.courseName}</h1>
                <p>{course.courseDescription}</p>
                <p className='flex gap-2 items-center'>
                    {avgRating || 0}
                    <RatingStars Review_Count={avgRating} />
                    <p>({course?.rate_review?.length || 0} Reviews)</p>
                    <p>{course?.studentEnrolled?.length || 0} Students enrolled</p>
                </p>
                <p>Created By {course.instructor?.firstName} {course.instructor?.lastName}</p>
                <p>Created At {date}</p>
            </div>
        </div>
    )
}

export default DetailsPage;
