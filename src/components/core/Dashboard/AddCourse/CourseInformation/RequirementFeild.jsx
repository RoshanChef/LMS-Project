import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course);

    // Register the field once
    useEffect(() => {
        register(name, { required: true });
    }, [register, name]);

    // Populate list on edit mode
    useEffect(() => {
        if (editCourse && course?.instructions) {
            try {
                const parsed = JSON.parse(course.instructions);
                if (Array.isArray(parsed)) {
                    setRequirementList(parsed);
                    setValue(name, parsed);
                }
            } catch (err) {
                setRequirementList(course?.instructions);
                setValue(name, course?.instructions);
            }
        }
    }, [editCourse, course, name, setValue]);

    // Update the form value whenever the list changes
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, name, setValue]);

    const handleAddRequirement = () => {
        if (requirement.trim() !== "") {
            setRequirementList(prev => [...prev, requirement.trim()]);
            setRequirement(""); // Clear input after adding
        }
    };

    const handleRemoveRequirement = (index) => {
        setRequirementList(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className=''>
            <label className='text-sm text-richblack-5' htmlFor={name}>
                {label}<sup className='text-red-500'>*</sup>
            </label>

            <div className="flex flex-col gap-2 mt-1">
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRequirement()}
                    className="bg-[#2C333F] w-full p-3 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter a requirement"
                />

                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='self-start cursor-pointer text-sm text-yellow-300 hover:text-yellow-400 transition'
                >
                    + Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul className='mt-3 list-inside list-disc space-y-1 text-gray-300'>
                    {requirementList.map((req, index) => (
                        <li key={index} className='flex items-center justify-between'>
                            <span>{req}</span>
                            <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs cursor-pointer flex items-center gap-1 text-red-300 hover:text-red-500'
                            >
                                <MdDelete size={16} />  Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && (
                <span className='mt-1 block text-xs text-pink-200'>
                    {label} is required
                </span>
            )}
        </div>
    );
};

export default RequirementField;
