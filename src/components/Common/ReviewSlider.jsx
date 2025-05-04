import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { gettingReviews } from '../../services/operations/reviewAPI';
import ReactStars from 'react-stars';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async function () {
            const result = await gettingReviews();
            console.log(result);

            setReviews(result);
        })();
    }, []);

    return (
        <div className="w-full px-6 py-10 select-none">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                navigation
                autoplay={{ delay: 2000 }}
                loop={true}
                className='my-swiper !pb-24 cursor-pointer '
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mx-2 border border-white/20 shadow-xl hover:shadow-2xl transition duration-300">
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-3 mb-4">
                                <div className="relative w-16 h-16">
                                    <img
                                        className="relative rounded-full w-full h-full object-cover border-2 border-white/20"
                                        src={review?.user?.image || '/default-avatar.png'}
                                        alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                                    />
                                </div>

                                <div className="text-center">
                                    <h3 className="font-semibold text-white text-lg">
                                        {review?.user?.firstName} {review?.user?.lastName}
                                    </h3>
                                    <p className="text-blue-200 text-sm mt-1">
                                        {review?.course?.courseName}
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex justify-center mb-4">
                                <div className="px-4 py-1.5  rounded-full">
                                    <ReactStars
                                        count={5}
                                        value={review?.rating}
                                        size={20}
                                        edit={false}
                                        color1={'#334155'}
                                        color2={'#FBBF24'}
                                    />
                                </div>
                            </div>

                            {/* Review Text */}
                            <div className="px-3 text-center">
                                <p className="text-white/90 italic leading-relaxed">
                                    "{review?.review.length > 100 ? review?.review.substring(0, 60) + " ..." : review?.review}"
                                </p>
                            </div>

                            {/* Date */}
                            <div className="flex justify-center mt-5 text-sm text-white/60">
                                <svg className="w-4 h-4 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(review?.reviewedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewSlider;
