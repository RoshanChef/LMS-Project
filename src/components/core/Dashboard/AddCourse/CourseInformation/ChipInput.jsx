// import { useState, useEffect, useRef } from "react";
// import { RxCross1 } from "react-icons/rx";

// function ChipInput({ label, name, placeholder, setValue, getValues, register, errors }) {
//     const [tags, setTags] = useState(() => getValues(name) || []);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         register(name);
//         setValue(name, tags);
//     }, [register, name, setValue]);


//     function clickHandle(event) {
//         if (event.key === ',' || event.key === 'Enter') {
//             event.preventDefault();

//             const inputValue = event.target.value.trim();

//             if (!inputValue || tags.includes(inputValue)) {
//                 event.target.value = '';
//                 return;
//             }

//             const updatedTags = [...tags, inputValue];
//             setTags(updatedTags);
//             setValue(name, updatedTags);

//             console.log('values', getValues(name));


//             event.target.value = '';
//         }
//     }

//     function removeTag(event, tagToRemove) {
//         event.preventDefault();
//         event.stopPropagation();

//         const updatedTags = tags.filter(tag => tag !== tagToRemove);
//         setTags(updatedTags);
//         setValue(name, updatedTags);
//         inputRef.current.value = "";
//     }

//     return (
//         <div>
//             <label className="block">
//                 <p className="mb-1">
//                     {label} <sup className="text-red-500">*</sup>
//                 </p>

//                 <div className={`flex flex-wrap gap-2 ${tags.length > 0 ? 'my-3' : ''}`}>
//                     {tags.map((tag, index) => (
//                         <div
//                             key={index}
//                             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-sm font-medium shadow-sm backdrop-blur-md transition-all duration-200"
//                         >
//                             <span>{tag}</span>
//                             <button
//                                 type="button"
//                                 onClick={(e) => removeTag(e, tag)}
//                                 className="rounded-full p-1 hover:bg-yellow-500/20 cursor-pointer transition-colors"
//                             >
//                                 <RxCross1 size={12} />
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 <input
//                     type="text"
//                     ref={(el) => {
//                         inputRef.current = el;
//                         register(name, { required: "Please enter tags" }).ref(el);
//                     }}
//                     onKeyDown={clickHandle}
//                     placeholder={placeholder}
//                     className="bg-[#2C333F] select-none w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                 />
//                 {
//                     errors[name] && <p className="text-red-400 text-sm mt-1">{errors[name]?.message}</p>
//                 }
//             </label>


//         </div>
//     );
// }

// export default ChipInput;

import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChipInput = ({ name, label, register, errors, setValue }) => {
    const [tags, settags] = useState([])
    const { editCourse, course } = useSelector((state) => state.course);



    useEffect(() => {
        register(name, {
            required: true,
        });
        if (editCourse) {
            settags(JSON.parse(course?.tags));
            setValue(name, JSON.parse(course?.tags));
        }
    }, [])

    return (
        <div>
            <label htmlFor={name}>{label}<sup className='text-red-500'>*</sup></label>
            <div className='flex flex-wrap gap-2 m-2'>
                {
                    tags.map((tag, index) => (
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
                                    <FaTimes />
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
