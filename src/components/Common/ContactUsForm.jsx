import React, { useEffect, useState } from 'react';
import CountryCode from '../../data/countrycode.json';
import { useForm } from 'react-hook-form';
import apiconnector from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/api';
import toast from 'react-hot-toast';

function ContactUsForm() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        try {
            setLoading(true);
            // Backend call
            const res = await apiconnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );
            console.log(res);
            toast.success("Message sent successfully!");
            setLoading(false);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error);
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }

    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
                countryCode: "",
            });
        }
    }, [reset, isSubmitSuccessful])

    return (
        <div className="relative mx-auto w-full max-w-[450px] px-6">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#000000aa] rounded-md">
                    <div className="custom-loader w-[64px] h-[64px]"></div>
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`flex flex-col items-center gap-4 ${loading ? 'opacity-40 pointer-events-none' : ''}`}
            >
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-5 w-full">
                    <label className="flex flex-col gap-1 w-full">
                        <p>First Name</p>
                        <input
                            type="text"
                            {...register('firstname')}
                            placeholder="First Name"
                            className="bg-[#161D29] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>

                    <label className="flex flex-col gap-1 w-full">
                        <p>Last Name</p>
                        <input
                            type="text"
                            {...register('lastname')}
                            placeholder="Last Name"
                            className="bg-[#161D29] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                </div>

                {/* Email Field */}
                <div className="w-full">
                    <label className="flex flex-col gap-1 w-full">
                        <p>Email</p>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className="bg-[#161D29] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                </div>

                {/* Mobile Field */}
                <label className="flex flex-col gap-1 w-full">
                    <p>Phone Number</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <div className="lg:w-[78px] sm:w-[120px]">
                            <div className="relative w-full">
                                <select
                                    name="countryCode"
                                    {...register('countryCode', { required: true })}
                                    className="appearance-none w-full bg-[#161D29] text-white p-2 pr-8 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm transition"
                                >
                                    <option value="" disabled hidden>
                                        Select Code
                                    </option>
                                    {CountryCode.map((item, idx) => (
                                        <option key={idx} value={item.code}>
                                            {item.code} {item.country}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute top-1/2 right-2 transform -translate-y-1/2 text-white">
                                    ▼
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <input
                                type="tel"
                                placeholder="12345 67890"
                                className="w-full bg-[#161D29] text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                {...register('phoneNo', {
                                    required: { value: true, message: 'Please enter your Phone Number.' },
                                    minLength: { value: 10, message: 'Invalid Phone Number' },
                                    maxLength: { value: 12, message: 'Invalid Phone Number' },
                                })}
                            />
                        </div>
                    </div>
                </label>

                {/* Message field */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="flex flex-col gap-1">
                        <p>Message</p>
                        <textarea
                            cols="30"
                            rows="7"
                            placeholder="Enter your message here"
                            className="w-full bg-[#161d29] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            {...register('message', { required: true })}
                        />
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md cursor-pointer w-full bg-yellow-300 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${!loading ? 'transition-all duration-200 hover:scale-95 hover:shadow-none' : ''} 
                disabled:bg-richblack-500 sm:text-[16px]`}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
};

export default ContactUsForm;