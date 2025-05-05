import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChipInput = ({ name, label, register, errors, setValue }) => {
    const [tags, settags] = useState([])
    const { editCourse, course } = useSelector((state) => state.course);
    // console.log('chip ', course);

    useEffect(() => {
        register(name, {
            required: true,
            // validate: (value) => value.length > 0
        });
        if (editCourse) {
            settags(JSON.parse(course?.tags));
            setValue(name, (course?.tags));
        }
    }, [])

    return (
        <div>
            <label htmlFor={name}>{label}<sup className='text-red-500'>*</sup></label>
            <div className='flex flex-wrap gap-2 m-2'>
                {
                    tags?.map((tag, index) => (
                        <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400/10 px-2 py-1 text-xs my-3 text-yellow-400'>
                            <span className='text-richblack-5'>{tag}</span>
                            <button
                                type='button'
                                onClick={() => {
                                    const updatedTags = [...tags];
                                    updatedTags.splice(index, 1);
                                    // settags(updatedTags);
                                    setValue(name, updatedTags);
                                }}
                                className='ml-2 text-richblack-5'>
                                <span className="cursor-pointer">
                                    <FaTimes onClick={() => {
                                        settags(tags.filter((item) => item !== tag));
                                    }} />
                                </span>
                            </button>
                        </div>
                    ))
                }
            </div>
            <input
                type='text'
                id={name}
                placeholder='Press Enter or , to add a tag'
                className="bg-[#2C333F] select-none w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        if (e.target.value) {
                            settags([...tags, e.target.value]);
                            setValue(name, [...tags, e.target.value]);
                            e.target.value = "";
                        }
                    }
                }}
            />
            {
                errors[name] && <span className='text-xs text-red-400'>Tags are required</span>

            }

        </div>
    )
}

export default ChipInput;
