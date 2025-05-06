import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Bullet.css';

import Course_card from './Course_card';

function CourseSlider({ courses }) {
    return (
        <div className="relative py-4 mx-auto">
            {courses?.length ? (
                <Swiper
                    spaceBetween={24}
                    loop={true}
                    centeredSlides={false}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    // mousewheel={true}
                    keyboard={{ enabled: true }}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper !pb-16"
                    breakpoints={{
                        // 320: { slidesPerView: 1.2, spaceBetween: 16 },
                        // 640: { slidesPerView: 2, spaceBetween: 20 },
                        // 1024: { slidesPerView: 3, spaceBetween: 24 },
                        // 1280: { slidesPerView: 3.5 },
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                >
                    {courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <Course_card course={course} Height="h-[200px]" />
                        </SwiperSlide>
                    ))}
                </Swiper>

            ) : (
                <p className="text-center text-gray-300 py-8">There is no course</p>
            )}
        </div>
    );
}

export default CourseSlider;
import React from "react";