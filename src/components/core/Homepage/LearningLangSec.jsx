import React from 'react'
import HighlightText from './HighlightText'
import Card2 from './../../../assets/images/Compare_with_others.png'
import Card1 from './../../../assets/images/Know_your_progress.png'
import Card3 from './../../../assets/images/Plan_your_lessons.png'
import CTAButton from './../../../components/core/Homepage/Button'

function LearningLangSec() {
  return (
    <div className='text-black items-center  flex flex-col w-full text-4xl font-semibold text-center my-28'>
      <div>
        <div className='lg:text-4xl text-4xl font-semibold text-center my-4'>
          Your swiss knife for
          <HighlightText text="learning any language" />
        </div>
        <p className='text-center text-gray-700 font-medium lg:w-[65%] mx-auto text-base'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
      </div>
      <div className='flex lg:flex-row flex-col items-center justify-center'>
        <img src={Card1} alt="img1" className='object-contain lg:-mt-4 mt-4 mr-3  lg:-mr-36' />
        <img src={Card2} alt="img2" className='object-contain ' />
        <img src={Card3} alt="img3" className='object-contain lg:-ml-36 lg:-mt-14' />
      </div>
      <div className='w-fit h-12'>
        <CTAButton active={true} linkto="/login">Learn More</CTAButton>
      </div>

    </div>
  )
}

export default LearningLangSec