import React from 'react'

function RequirementFeild({ name, register, errors, setValue, getValues }) {

    return (
        <div>
            <input
                {...register(name, {
                    required: "This field is required",
                })
                }

                className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
            <div className='text-amber-300 text-lg mt-3 font-semibold'>
                <p>Add</p>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default RequirementFeild