import React from 'react'
import { ImTree } from "react-icons/im";
import { HiOutlineUsers } from "react-icons/hi2";

function CourseCard({ cardData, setCurCard, currentCard }) {
  function clickHandler() {
    setCurCard(cardData);
  }


  return (
    <div onClick={clickHandler}
      className={`w-[360px] lg:w-[28%] p-3 rounded-2xl bg-[#18181b4b] backdrop-blur-md border border-white/10 shadow-lg flex flex-col py-5 justify-between h-[300px] box-border cursor-pointer hover:scale-105 transition-all duration-200
      ${currentCard.heading == cardData.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-100 text-gray-800"
          : "bg-[#18181b4b]"
        }  
      `}>
      <div className='flex gap-4 flex-col'>
        <h1 className='text-[20px]'>{cardData.heading}</h1>
        <p className='text-[.9rem]'>{cardData.description}</p>
      </div>
      <div className='flex justify-between'>
        <div className='text-base flex items-center gap-2'><HiOutlineUsers />{currentCard.level}</div>
        <div className='flex items-center gap-2'><ImTree /> {currentCard.lessionNumber} Lessions</div>
      </div>
    </div>

  )
}

export default CourseCard
