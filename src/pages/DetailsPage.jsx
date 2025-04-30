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

function DetailsPage() {
    const { id } = useParams();
    const { token } = useSelector(state => state.auth);
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null); // Initialize as null
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

    return (
        <div>
             
        </div>
    );
}

export default DetailsPage;
