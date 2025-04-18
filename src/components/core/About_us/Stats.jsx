import React from 'react'
import CountUp from 'react-countup';

function Stats() {
    const stats_data = [
        {
            count: "5K",
            label: "Active Students"
        },
        {
            count: "10+",
            label: "Mentors"
        },
        {
            count: "220+",
            label: "Courses"
        },
        {
            count: "50+",
            label: "Awards"
        }
    ];
    return (
        <div className='bg-[#2C333F]'>
            {/* Stats */}
            <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
                <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                    {stats_data.map((data, index) => {
                        return (
                            <div className="flex flex-col py-10" key={index}>
                                <h1 className="text-[30px] font-bold text-black-5">
                                    <CountUp end={parseInt(data.count.slice(0, data.count.length - 1))}
                                        enableScrollSpy
                                        scrollSpyOnce
                                        duration={2} />
                                    {data.count.at(-1)}
                                </h1>
                                <h2 className="font-semibold text-[16px] ">
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Stats
