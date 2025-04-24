import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailAPI';
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementFeild from './RequirementFeild';

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();

            if (categories.length > 0) {
                setCourseCategories(categories);
            }

            setLoading(false);
        }

        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, [])

    function submitInformation(formdata) {

    }

    return (
        <div className='mx-auto w-full'>
            <form onSubmit={handleSubmit(submitInformation)} tabIndex={0}
                className='bg-[#161D29] mx-auto flex flex-col gap-6 border mr-6 border-gray-500 rounded-lg p-5 h-[100%]'>

                <label className='flex flex-col gap-2'>
                    <p>Course Title <sup className='text-red-500'>*</sup></p>
                    <input {...register('courseTitle', { required: true })} placeholder='Enter Course Title'
                        className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    {
                        errors.courseTitle && (
                            <span className='ml-2 text-xs tracking-wide text-red-400'>Course Title is Required**</span>
                        )
                    }
                </label>

                <label className='flex flex-col gap-2'>
                    <p>Course Short Description<sup className='text-red-500'>*</sup></p>
                    <textarea
                        {...register('courseShortDesc', { required: true })}
                        placeholder='Enter Course Description' rows={7}
                        className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    {
                        errors.courseShortDesc && (<span className='ml-2 text-xs tracking-wide text-red-400'>
                            Course Description is required**
                        </span>)
                    }
                </label>
                <div className='relative flex flex-col space-y-2'>

                    <label className='flex flex-col gap-2'>
                        <p>Course Price<sup className='text-red-500'>*</sup></p>
                        <input {...register("coursePrice", { required: true })}
                            className="bg-[#2C333F] w-full !pl-12 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder='Enter Course Price'
                        />
                        <HiOutlineCurrencyRupee size={30} className='absolute top-11 left-2 text-[#606d80]' />
                        {
                            errors.coursePrice && (
                                <span className='ml-2 text-xs tracking-wide text-red-400'>Course Price is Required**</span>
                            )
                        }

                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label>
                        <p>Course Category<sup className='text-red-500'>*</sup></p>
                        <select disabled={editCourse}
                            className="bg-[#2C333F] w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            id='courseCategory'
                            defaultValue=""
                            {...register("courseCategory", { required: true })}
                        >
                            <option value="" disabled>Choose a Category</option>

                            {
                                !loading && courseCategories.map((category, index) => (
                                    <option key={index} value={category?._id}>
                                        {category?.name}
                                    </option>
                                ))
                            }

                        </select>
                    </label>
                </div>

                {/* custom component for handling tags input */}
                <div>
                    <label>
                        <p className='mb-1'>
                            Tags <sup className='text-red-500 '>*</sup>
                        </p>
                        <ChipInput
                            name="courseTags"
                            placeholder="Enter tags and press enter"
                            setValue={setValue}
                            getValues={getValues}
                            register={register}
                            errors={errors}
                        />

                    </label>
                </div>

                <div>
                    <label>
                        <p className='mb-1'>
                            Course Thumbnail  <sup className='text-red-500 '>*</sup>
                        </p>
                        <Upload
                            name={"courseImage"}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p>
                            Benefits of the course
                            <sup className='text-red-500 '>*</sup>
                        </p>
                        <textarea
                            {...register("courseBenefits", { required: true })}
                            placeholder='Enter the Benefits of Course' rows={7}
                            className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                        </textarea>
                    </label>
                </div>

                <label>
                    <p>Requirements/Instructions
                        <sup className='text-red-500 '>*</sup>
                    </p>
                    <RequirementFeild
                        name="courseRequirements"
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                    />
                </label>

            </form>
        </div>
    )
}

export default CourseInformationForm
