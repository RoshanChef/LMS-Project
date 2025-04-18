import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../Homepage/Button';

function LearningGrid() {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ];

    return (
        <div className='grid text-white grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
            {
                LearningGridArray.map((card, inx) => (
                    <div
                        key={inx}
                        className={`${inx === 0 && "lg:col-span-2 bg-transparent"}
                    ${inx % 2 === 1 ? "bg-gray-700" : "bg-[#161D29]"}
                    ${card.order == 3 && "lg:col-start-2"} 
                            `}

                    >

                        {
                            card.order === -1 &&
                            <div className='lg:col-span-2 lg:h-[280px] p-5 bg-transparent'>
                                <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                    <h1 className='text-4xl font-semibold'>{card.heading}</h1>
                                    <div className='text-4xl'>
                                        <HighlightText text={card.highlightText} />
                                    </div>
                                    <p className='font-medium'>{card.description}</p>
                                    <div className="w-fit mt-2">
                                        <CTAButton active={true} linkto={card.BtnLink}>
                                            {card.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            card.order > 0 && (
                                <div className='false lg:h-[280px] p-5 false false'>
                                    <div className='flex flex-col gap-8 p-7'>
                                        <h1 className='text-xl'>{card.heading}</h1>
                                        <p className='text-gray-400 font-medium'>{card.description}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
                )
            }
        </div >
    )
}

export default LearningGrid
