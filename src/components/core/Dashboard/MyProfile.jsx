import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import { CiEdit } from "react-icons/ci";


function MyProfile() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-8 w-full max-w-screen-xl mx-auto px-4 py-8'>

            {/* Header with gradient text */}
            <h1
                className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400'>
                My Profile
            </h1>

            {/* Top Two Sections */}
            <div className='flex flex-col lg:flex-row gap-6 w-full'>

                {/* Profile Card */}
                <div className='flex flex-col lg:flex-row items-center gap-6 bg-[#1e2536] p-6 rounded-xl border border-[#2a3245] hover:border-indigo-500/50 transition-colors flex-1'>
                    {/* <div className='relative overflow-hidden'>
                        <img
                            src={user.image}
                            className='w-20 h-20 aspect-square rounded-full object-cover border-2 border-[#2a3245] group-hover:border-indigo-500/60 transition-colors'
                        /> */}
                    <div className="group relative">
                        <img
                            src={user.image}
                            alt={`profile-${user?.img}`}
                            className="h-14 w-14 rounded-full border-2 border-[#2a3245] object-cover transition-all group-hover:border-indigo-500/60"
                        />
                    </div>

                    <div className='flex flex-col gap-1 text-center lg:text-left'>
                        <h1 className='font-bold text-xl text-gray-100'>{user.firstName} {user.lastName}</h1>
                        <p className='text-gray-400 flex items-center justify-center lg:justify-start gap-1'>
                            <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                        bg-gray-50 hover:bg-indigo-500
                        border border-[#3a4255] 
                        text-indigo-500 hover:text-indigo-50
                        rounded-lg transition-colors duration-200"
                    >
                        Edit <CiEdit size={18} />
                    </button>
                </div>

                {/* About Card */}
                <div className='flex flex-col bg-[#1e2536] rounded-xl border border-[#2a3245] hover:border-indigo-500/50 transition-colors flex-1'>
                    <div className='flex justify-between items-center p-6 border-b border-[#2a3245]'>
                        <h2 className='text-xl font-semibold text-gray-100'>About</h2>
                        <button
                            onClick={() => navigate("/dashboard/settings")}
                            className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                            bg-gray-50 hover:bg-indigo-500
                            border border-[#3a4255] 
                            text-indigo-500 hover:text-indigo-50
                            rounded-lg transition-colors duration-200"
                        >
                            Edit <CiEdit size={18} />
                        </button>
                    </div>
                    <p className='p-6 text-gray-400'>
                        {user?.additionDetail?.about || (
                            <span className='text-gray-500 italic'>Write something about yourself...</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Personal Details Card */}
            <div className='flex flex-col bg-[#1e2536] rounded-xl border border-[#2a3245] hover:border-indigo-500/50 transition-colors'>
                <div className='flex justify-between items-center p-6 border-b border-[#2a3245]'>
                    <h2 className='text-xl font-semibold text-gray-100'>Personal Details</h2>
                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className="px-4 py-2 flex items-center gap-2 cursor-pointer 
                        bg-gray-50 hover:bg-indigo-500
                        border border-[#3a4255] 
                        text-indigo-500 hover:text-indigo-50
                        rounded-lg transition-colors duration-200"
                    >
                        Edit <CiEdit size={18} />
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                    {[
                        { label: "First Name", value: user.firstName },
                        { label: "Last Name", value: user.lastName },
                        {
                            label: "Email",
                            value: user.email,
                            icon: <svg className='w-4 h-4 mr-2 text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        },
                        {
                            label: "Phone Number",
                            value: user?.additionDetail?.ContactNumber || "Not specified",
                            icon: <svg className='w-4 h-4 mr-2 text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        },
                        {
                            label: "Gender",
                            value: user?.additionDetail?.gender || "Not specified",
                            icon: <svg className='w-4 h-4 mr-2 text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        },
                        {
                            label: "Date of Birth",
                            value: user?.additionDetail?.dateOfBirth || "Not specified",
                            icon: <svg className='w-4 h-4 mr-2 text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        }
                    ].map((item, index) => (
                        <div key={index} className='flex flex-col gap-1'>
                            <div className='flex items-center text-gray-400 text-sm'>
                                {item.icon || <span className='w-4 h-4 mr-2' />}
                                {item.label}
                            </div>
                            <p className='text-gray-100 ml-6'>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyProfile
