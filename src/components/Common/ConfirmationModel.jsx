import React from 'react'
import IconBtn from './IconBtn'; 

function ConfirmationModel({ modelData }) {
    return (
        <div className="fixed text-black inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-transparent bg-opacity-100 backdrop-blur-sm">
            <div className="w-11/12 max-w-[400px] rounded-lg bg-white/90 p-6">
                <p className='text-3xl font-semibold'>{modelData?.text1}</p>
                <p className='text-lg mb-10'>{modelData?.text2}</p>
                <div className='flex gap-2'>
                    <IconBtn onclick={modelData?.btn1Handler}
                        text={modelData?.btn1Text}
                    />
                    <button onClick={modelData?.btn2Handler}
                        className="cursor-pointer bg-[#1D1629] rounded-md    py-[8px] px-[20px] font-semibold text-gray-900"
                    >
                        {modelData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModel
