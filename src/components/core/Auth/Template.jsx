import React from 'react'
import { useSelector } from 'react-redux';
import framebg from '../../../assets/images/framebg.png';
import Signupform from './Signupform';
import Loginform from './Loginform';

function Template({ title, description1, description2, image, formType }) {
    const { loading } = useSelector((state) => state.auth);

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                        <h1 className="text-[1.275rem] text-[#F1F2FF] font-semibold leading-[2.375rem] text-richblack-5">
                            {title}
                        </h1>
                        <p className="mt-4 text-[1.0005rem] leading-[1.625rem]">
                            <span className="text-[#AFB2BF]">{description1}</span>{" "}
                            <span className="Edu SA Beginner text-xs block font-bold italic text-[#47A5C5]">
                                {description2}
                            </span>
                        </p>
                        {formType === "signup" ? <Signupform /> : <Loginform />}
                     
                    </div>
                    <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                        <img
                            src={framebg}
                            alt="Pattern"
                            width={558}
                            height={504}
                            loading="lazy"
                            className='object-contain'
                        />
                        <img
                            src={image}
                            alt="Students"
                            width={558}
                            height={504}
                            loading="lazy"
                            className="absolute -top-4 right-4 z-10"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Template
