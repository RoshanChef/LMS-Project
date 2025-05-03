import React from 'react'
import IconBtn from './IconBtn';

function ConfirmationModel({ modelData }) {
    return (
        <div className="fixed text-black inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-transparent bg-opacity-100 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6 text-black animate-fadeIn">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-800">{modelData?.text1}</h2>

                {/* Subheading */}
                <p className="text-md text-gray-600">{modelData?.text2}</p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    {/* Primary Action */}
                    <IconBtn
                        onclick={modelData?.btn1Handler}
                        text={modelData?.btn1Text}
                        customClasses="bg-yellow-400 cursor-pointer hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-md transition"
                    />

                    {/* Secondary Action */}
                    <button
                        onClick={modelData?.btn2Handler}
                        className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white font-medium px-5 py-2 rounded-md transition"
                    >
                        {modelData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModel;
