import React from 'react'
import HighlightText from './HighlightText';
import Instructor from '../../../assets/images/Instructor.png';
import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa6";

function InstructorSec() {
    return (
        <div className='bg-[#01050c]  p-5 flex flex-col lg:flex-row gap-20 items-center'>

            <div className='flex w-11/12 mx-auto my-12 gap-18'>

                <div className='lg:w-[50%] flex gap-10 flex-col shadow-white shadow-[-20px_-20px_0px_0px]'>
                    <img className='object-contain' src={Instructor} alt="" />
                </div>
                <div className='w-[45%] font-semibold flex flex-col gap-4 justify-center'>
                    <h1 className="lg:w-[50%] text-4xl font-bold ">
                        Become an
                        <HighlightText text={"Instructor"} />
                    </h1>
                    <div className='font-medium text-[16px] text-justify w-[90%] text-gray-500'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-3">
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default InstructorSec
