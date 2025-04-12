import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/TimeLineLogo/TimelineImage.png';

function TimelineSection() {
    const TimeLine = [
        {
            Logo: Logo1,
            Heading: "Leadership",
            Description: "Fully committed to the success company",
        },
        {
            Logo: Logo2,
            Heading: "Responsibility",
            Description: "Students will always be our top priority",
        },
        {
            Logo: Logo3,
            Heading: "Flexibility",
            Description: "The ability to switch is an important skills",
        },
        {
            Logo: Logo4,
            Heading: "Solve the problem",
            Description: "Code your way to a solution",
        },
    ];

    const items = TimeLine.map((item, index) => {
        return (
            <div className="flex items-start gap-6" key={index}>
                <div className="w-[50px] flex flex-col items-center gap-4">
                    <div className='relative rounded-full bg-white flex items-center justify-center w-[50px] h-[50px] shadow-[0px_4px_6px_1px_rgba(0,_0,_0,_0.1)]'>
                        <img src={item.Logo} alt="" className="w-6 h-6" />
                    </div>
                    <div >
                        {/* Dotted line  */}
                        {index !== TimeLine.length - 1 && (
                            <div className="relative h-14">
                                <div
                                    className="absolute left-1/2 top-0 h-full  border-dotted border-r-2 border-gray-400"
                                    style={{ transform: 'translateX(-50%)' }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Text content */}
                <div className="flex-1 pt-2"> {/* Added pt-2 to align text with logo */}
                    <h1 className="text-lg font-semibold">{item.Heading}</h1>
                    <p className="text-base">{item.Description}</p>
                </div>
            </div>

        );
    })


    return (
        <div className="py-12 text-black">
            <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto px-4">
                <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {items}
                </div>
                <div className="relative w-fit shadow-[0px_4px_13px_11px_#A0CFDE]">
                    <img
                        src={TimelineImage}
                        alt="Timeline"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-[500px]"
                    />
                    <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-[#014A32] flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'>
                        <div className='flex gap-5 items-center lg:border-r border-[#04a77b] px-7 lg:px-14'>
                            <h1 className="text-3xl font-bold w-[75px]">10</h1>
                            <p className='text-[#04a77b] text-sm w-[75px]'>Years experiences</p>
                        </div>
                        <div className='flex gap-5 items-center lg:px-14 px-7'>
                            <h1 className='text-3xl font-bold w-[75px]'>250</h1>
                            <p className='text-[#04a77b] text-sm w-[75px]'>Type of courses</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TimelineSection