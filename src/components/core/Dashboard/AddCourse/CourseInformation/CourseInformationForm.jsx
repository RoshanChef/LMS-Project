import React, { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { createCourse, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailAPI';
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementFeild from './RequirementFeild';
import { setCourse, setStep } from '../../../../../Redux/Slices/courseSlice';
import IconBtn from '../../../../Common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../data/constants';

function CourseInformationForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
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
            setValue("courseTitle", course?.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.what_learn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, [])

    function isFormUpdated() {
        const currentValues = getValues();
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tags.toString() ||
            currentValues.courseBenefits !== course.what_learn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        else
            return false;
    }

    async function onSubmit(data) {
        // console.log('formdata ........... ', data);

        // edit course
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append('courseId', course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append('courseName', data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append('courseDescription', data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append('price', data.coursePrice);
                }
                if (currentValues.courseTags !== course.tag) {
                    formData.append('tags', JSON.stringify(data.courseTags));
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append('what_learn', data.courseBenefits);
                }
                if (currentValues.courseCategory !== course.category) {
                    formData.append('category', data.courseCategory._id);
                }
                if (currentValues.courseRequirements !== course.instructions) {
                    formData.append('instructions', JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append('thumbnailImage', data.courseImage);
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result.newCourse || result));  
                }
                setLoading(false);
                // console.log("PRINTING result", result);


            } else {
                toast.error("No changes made");
            }
        }
        // create course
        else {
            const formData = new FormData();
            formData.append('courseName', data.courseTitle);
            formData.append('courseDescription', data.courseShortDesc);
            formData.append('price', data.coursePrice);
            formData.append('tags', JSON.stringify(data.courseTags));
            formData.append('what_learn', data.courseBenefits);
            formData.append('category', data.courseCategory._id);
            formData.append('instructions', JSON.stringify(data.courseRequirements));
            formData.append('thumbnailImage', data.courseImage);
            formData.append('status', COURSE_STATUS.DRAFT);

            setLoading(true);
            const result = await createCourse(formData, token);
            if (result) {
                dispatch(setStep(2));
                dispatch(setCourse(result.newCourse));
            }
            setLoading(false);
        }
    }

    return (
        <div className='mx-auto w-full'>
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                    <ChipInput
                        name="courseTags"
                        label="Tags"
                        placeholder="Enter tags and press enter"
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                    />

                </div>

                <div>
                    <Upload
                        label="Course Thumbnail"
                        name="courseImage"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                    />
                </div>

                <div>
                    <label>
                        <p>
                            Benefits of the course
                            <sup className='text-red-500 '>*</sup>
                        </p>
                        <textarea
                            {...register("courseBenefits", { required: "Please enter the Benifits of course" })}
                            placeholder='Enter the Benefits of Course' rows={7}
                            className="bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                        </textarea>
                        {
                            errors["courseBenefits"] && (
                                <span className='ml-2 text-xs tracking-wide text-red-400'>{errors['courseBenefits'].message}</span>
                            )
                        }
                    </label>
                </div>

                <label>
                    <RequirementFeild
                        label="Requirements/Instructions"
                        name="courseRequirements"
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                    />
                </label>

                <div className='flex justify-end gap-x-2'>
                    {
                        editCourse && (
                            <button
                                onClick={() => dispatch(setStep(2))}
                                className=' text-[10px] cursor-pointer border-1 px-3 border-gray-400 md:text-sm p-2 px-1 font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300'
                            >
                                Continue Without Saving
                            </button>
                        )
                    }

                    <IconBtn type="submit"
                        text={!editCourse ? "Next" : "Save Changes"}
                    />
                </div>

            </form>
        </div >
    )
}

export default CourseInformationForm