import React, { useEffect, useState } from 'react'
import IconBtn from '../../../../Common/IconBtn';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../Redux/Slices/courseSlice';
import { updateSubSection, createSubSection } from '../../../../../services/operations/courseDetailAPI';
import { RxCross1 } from 'react-icons/rx';
import Upload from './/Upload';
import toast from "react-hot-toast";

function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false
}) {
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            // console.log("useeffect modalData", modalData);
        }
    }, [view, edit]);

    async function onSubmit(data) {
        console.log('on submi clicked');

        if (view) return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made");
            }
            else {
                handelEditSubsection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);
        formData.append("sectionId", modalData);
        formData.append("courseId", course._id);

        setLoading(true);

        console.log("formdata", [...formData]);
        // api call 
        const result = await createSubSection(formData, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);

        setLoading(false);
    }

    async function handelEditSubsection() {
        const currentValues = getValues();
        const formdata = new FormData();
        formdata.append('sectionId', modalData.sectionId);
        formdata.append('subSectionId', modalData._id);

        if (currentValues.lectureTitle !== modalData.lectureTitle)
            formdata.append('title', currentValues.lectureTitle);


        if (currentValues.lectureTitle !== modalData.lectureVideo)
            formdata.append('video', currentValues.lectureVideo);

        if (currentValues.lectureDesc !== modalData.lectureDesc)
            formdata.append('description', currentValues.lectureDesc);

        setLoading(true);

        // api call 
        const result = await updateSubSection(formdata, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);

        setLoading(false);
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        return false;
    }


    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-transparent bg-opacity-90 backdrop-blur-sm'>
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-400 bg-gray-800'>
                <div className='flex items-center justify-between rounded-t-lg bg-gray-700 p-5'>
                    <p className='text-xl font-semibold text-gray-100'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross1 size={20} color={"white"} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                    <Upload
                        name="lectureVideo"
                        label="LectureVideo"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    <div className='flex flex-col space-y-2'>
                        <label className='text-sm text-gray-200' htmlFor='lectureTitle'>Lecture Title</label>
                        <input disabled={view}
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}
                            className='bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                        />
                        {errors.lectureTitle && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Lecture Title is required
                        </span>)}
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label className='text-sm text-gray-200'>Lecture Description</label>
                        <textarea disabled={view}
                            id='lectureDesc'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", { required: true })}
                            className='bg-[#2C333F] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-x-none min-h-[130px]'
                        />
                        {
                            errors.lectureDesc && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture Description is required
                            </span>)
                        }
                    </div>
                    {
                        !view && (
                            <div className='flex justify-end'>
                                <IconBtn
                                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }
                </form>

            </div>
        </div>
    )
}

export default SubSectionModal