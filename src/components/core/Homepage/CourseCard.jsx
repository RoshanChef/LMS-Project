import React from 'react'
import { ImTree } from "react-icons/im";
import { HiOutlineUsers } from "react-icons/hi2";

function CourseCard({ cardData, setCurCard, currentCard }) {
  function clickHandler() {
    setCurCard(cardData);
  }


  return (
<div 
  onClick={clickHandler}
  className={`select-none w-full sm:w-[360px] mt-12 lg:mt-0 lg:w-[28%] p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg flex flex-col py-4 sm:py-5 justify-between h-[280px] sm:h-[300px] box-border cursor-pointer hover:scale-105 transition-all duration-200
    ${currentCard.heading == cardData.heading
      ? "bg-white shadow-[8px_8px_0_0] sm:shadow-[12px_12px_0_0] shadow-yellow-100 text-gray-800"
      : "bg-[#18181b4b]"
    }  
  `}
>
  <div className='lg:flex gap-3 sm:gap-2 flex-col'>
    <h1 className='text-[18px] sm:text-[20px] font-medium'>{cardData.heading}</h1>
    <p className={`text-[0.85rem] sm:text-[0.9rem] ${currentCard.description == cardData.description ? "text-gray-700" : "text-white"}`}>{cardData.description}</p>
  </div>
  <div className='flex justify-between text-sm sm:text-base'>
    <div className='flex items-center gap-2'>
      <HiOutlineUsers className="text-lg" />
      <span>{currentCard.level}</span>
    </div>
    <div className='flex items-center gap-2'>
      <ImTree className="text-lg" />
      <span>{currentCard.lessionNumber} Lessons</span>
    </div>
  </div>
</div>

  )
}

export default CourseCard
