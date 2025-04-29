import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../Common/RatingStars';
import GetAvgRating from '../../../utils/GetAvgRat';

function Course_card({ course, Height, Width }) {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.rate_review);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className="w-full max-w-sm rounded-xl bg-gray-900/40 select-none shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <Link to={`/course/${course._id}`}>
                {/* Thumbnail */}
                <div className="overflow-hidden rounded-t-xl">
                    <img
                        src={course.thumbnail}
                        alt={`${course.courseName} Thumbnail`}
                        className={`${Width || "w-full"} ${Height || 'h-40'} object-cover transition-transform duration-300 hover:scale-105`}
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 px-4 py-3">
                    <p className="text-base font-semibold text-white truncate">
                        {course.courseName}
                    </p>

                    <p className="text-sm text-gray-400">
                        By{" "}
                        <span className="text-yellow-400 font-medium">
                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </span>
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-yellow-400 font-semibold">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="hidden md:flex items-center gap-1 ml-2">
                            <span>{course?.rate_review?.length}</span>
                            <span>Ratings</span>
                        </span>
                    </div>

                    <p className="text-md text-green-400 font-semibold">
                        ₹{course?.price}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Course_card;
