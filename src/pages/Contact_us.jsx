import React from 'react'
import ContactUsForm from '../components/Common/ContactUsForm';
import Footer from '../components/Common/Footer';
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"


const contactDetails = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "info@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
    },
]

function Contact_us() {
    return (
        <div>
            <div className='flex mt-16 justify-center mx-auto'>
                <div className='flex mt-14 mx-auto gap-12'>
                    <div className="flex flex-col max-h-max gap-6 rounded-xl  bg-[#161D29] p-4 lg:p-6">
                        {contactDetails.map((ele, i) => {
                            let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
                            return (
                                <div
                                    className="flex flex-col gap-[2px] p-3 text-sm text-gray-500"
                                    key={i}
                                >
                                    <div className="flex flex-row items-center gap-3">
                                        <Icon size={25} />
                                        <h1 className="text-lg font-semibold text-gray-200">
                                            {ele?.heading}
                                        </h1>
                                    </div>
                                    <p className="font-medium">{ele?.description}</p>
                                    <p className="font-semibold text-gray-400">{ele?.details}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-[720px] p-4 flex flex-col gap-12 py-14 border-gray-600 border rounded-xl'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-left pl-6 text-4xl font-bold'>Got a Idea? We've got the skills. Let's team up</h1>
                            <p className='pl-6 '>Tell us more about yourself and what you're got in mind.</p>
                        </div>
                        <ContactUsForm width="650" />
                    </div>
                </div>
            </div>

            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                {/* <ReviewSlider /> */}
            </div>

            {/* footer */}
            <footer className='bg-[#222a38] text-gray-400'>
                <Footer />
            </footer>
        </div >
    )
}

export default Contact_us
