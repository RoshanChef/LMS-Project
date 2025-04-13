import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from '../Homepage/HighlightText';
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurCard] = useState(HomePageExplore[0].courses[0]);

    function setTab(value) {
        setCurrentTab(value);
        let cur = (HomePageExplore.filter(val => (val.tag === value)));
        setCourses(cur[0].courses);
        setCurCard(cur[0].courses[0]);
    }

    const tabs = tabsName.map((ele, inx) => {
        return <div key={inx} onClick={() => (setTab(ele))} className={`px-10 py-2 rounded-full transition-all duration-300 hover:bg-[#01050c] hover:text-white ${ele == currentTab ? "bg-[#01050c] text-white" : "bg-[#161D29]"} `}>
            {ele}
        </div>
    })

    const cards = courses.map((ele, inx) => {
        return <CourseCard key={inx}
            cardData={ele}
            setCurCard={setCurCard}
            currentCard={currentCard}
        />
    })

    return (
        <div className='bg-[#01050c] text-white py-10 px-10'>
            <div className='flex gap-2 text-4xl font-semibold justify-center items-center'>
                <span>Unlock the</span>
                <HighlightText text={"Power of Code"} />
            </div >
            <div className='text-center text-xl text-gray-400 mt-2 font-semibold'>
                Learn to Build Anything You Can Imagine
            </div>

            <div className='lg:flex sm:hidden items-center flex-col gap-12'>
                <div className='lg:flex px-2 py-2 my-[10rem] text-gray-400 bg-[#161D29] hidden gap-2 rounded-4xl justify-between cursor-pointer w-fit mt-8 text-[1rem]'>
                    {tabs}
                </div>
                <div className='lg:absolute items-center justify-center flex lg:flex-row flex-col gap-12 lg:mt-36 sm:mt-24'>
                    {cards}
                </div>
            </div>
        </div>
    )
}

export default ExploreMore
