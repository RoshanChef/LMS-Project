import React from 'react'
import { useSelector } from 'react-redux';
import framebg from '../../../assets/images/framebg.png';
import Signupform from './Signupform';
import Loginform from './Loginform';
import { FcGoogle } from "react-icons/fc";
import { auth, google_provider } from '../../../services/firebase';
import { signInWithPopup } from "firebase/auth";

function Template({ title, description1, description2, image, formType }) {
    const { loading } = useSelector((state) => state.auth);

    async function googleLogin() {
        const res = await signInWithPopup(auth, google_provider);
        let user = await res.user;
        let dataObj = {
            firstName: user.displayName.split(" ")[0],
            lastName: user.displayName.split(" ")[1],
            email: user.email,
            password: user.uid,
            mobile: user.phoneNumber,
            image: user.photoURL
        }
        console.log('Google ', dataObj);
    }

    return (
        <div className="min-h-[calc(100vh-3.5rem)]">
            {loading ? (
                <div className='w-full h-[80vh] flex justify-center items-center'>
                    <div className="custom-loader"></div>
                </div>
            ) : (<div className="mx-auto  my-0 flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <h1 className="text-[1.275rem] text-[#F1F2FF] font-semibold leading-[2.375rem] text-richblack-5">
                        {title}
                    </h1>
                    <p className="mt-4 text-[1.0005rem] leading-[1.625rem]">
                        <span className="text-[#AFB2BF]">{description1}</span>{" "}
                        <span className="Edu SA Beginner text-xs block font-bold italic text-[#47A5C5]">
                            {description2}
                        </span>
                    </p>
                    {formType === "signup" ? <Signupform /> : <Loginform />}
                    <div className='flex  w-full items-center my-4 gap-x-2'>
                        <div className='h-[1px] w-full bg-gray-800'></div>
                        <p className='text-white'>OR</p>
                        <div className='h-[1px] w-full bg-gray-800'></div>
                    </div>
                    <div className=' hover:scale-102 duration-200 transition-all w-full' onClick={googleLogin}>
                        <button className='text-white cursor-pointer items-center gap-2 border-gray-800 p-1 rounded-[8px] gap-x-2 mt-5 border flex justify-center w-[100%]'>
                            <FcGoogle />
                            <p >
                                Sign Up with Google
                            </p>
                        </button>
                    </div>

                </div>
                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <img
                        src={framebg}
                        alt="Pattern"
                        width={558}
                        height={504}
                        loading="lazy"
                        className='object-contain'
                    />
                    <img
                        src={image}
                        alt="Students"
                        width={558}
                        height={504}
                        loading="lazy"
                        className="absolute -top-4 right-4 z-10"
                    />
                </div>
            </div>

            )}


        </div>
    )
}

export default Template
