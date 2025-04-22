import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import { CiEdit } from "react-icons/ci";


function MyProfile() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-10 w-full max-w-screen-xl mx-auto'>

            <h1 className='text-2xl font-bold'>My Profile</h1>

            {/* Top Two Sections */}
            <div className='flex lg:flex-row flex-col justify-between w-full gap-4'>

                {/* section 1 */}
                <div className='flex lg:flex-row flex-col gap-5 bg-[#101828] p-8 items-center rounded-lg flex-1'>
                    <img src={user.image} className='w-[60px] h-[60px] rounded-full object-cover' />
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold text-xl'>{user.firstName + " "}{user.lastName}</h1>
                        <p className='text-md text-gray-400'>{user.email}</p>
                    </div>
                    <div className='ml-auto'>
                        <IconBtn onclick={() => navigate("/dashboard/settings")}>Edit <CiEdit size={20} /></IconBtn>
                    </div>
                </div>

                {/* section 2 */}
                <div className='flex flex-col bg-[#101828] justify-start rounded-lg flex-1'>
                    <div className='flex justify-between gap-5 text-xl p-8 items-center'>
                        <p>About</p>
                        <IconBtn onclick={() => navigate("/dashboard/settings")}>Edit <CiEdit size={20} /></IconBtn>
                    </div>
                    <p className='px-8 pb-8 text-gray-400'>{user?.additionDetail?.about ?? "Write Something about Yourself"}</p>
                </div>

            </div>

            {/* section 3 */}
            <div className='flex flex-col bg-[#101828] w-full rounded-lg'>
                <div className='flex justify-between gap-5 text-xl p-8 items-center'>
                    <p>Personal Details</p>
                    <IconBtn onclick={() => navigate("/dashboard/settings")}>Edit <CiEdit size={20} /></IconBtn>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-8 w-full items-center'>
                    <div>
                        <h1 className='text-gray-400'>First Name</h1>
                        <p>{user.firstName}</p>
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Last Name</h1>
                        <p>{user.lastName}</p>
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Email</h1>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Phone Number</h1>
                        <p>{user?.additionDetail?.ContactNumber ?? "Add Contact Number"}</p>
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Gender</h1>
                        <p>{user?.additionDetail?.Gender ?? "Add Gender"}</p>
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Date of Birth</h1>
                        <p>{user?.additionDetail?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default MyProfile
