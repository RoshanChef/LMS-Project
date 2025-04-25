import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import IconBtn from '../../../../Common/IconBtn';
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep, setEditCourse } from '../../../../../Redux/Slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailAPI';


function CourseBuilderForm() {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSection, setEditSec] = useState(null);
  
  console.log('course ', course);

  function cancelEdit() {
    setEditSec(null)
    setValue("sectionName", "")
  }
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  }

  async function submitBuilder(formdata) {
    setLoading(true);
    let result = null;

    if (editSection) {
      result = await updateSection({
        sectionName: formdata.sectionName,
        sectionId: editSection,
        courseId: course._id
      }, token);
    }
    else {
      result = await createSection({
        sectionName: formdata.sectionName,
        courseId: course._id
      }, token);
    }

    // update the values 
    if (result) {
      dispatch(setCourse(result));
      setEditSec(null);
      setValue('sectionName', '');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-gray-700 bg-gray-800 p-6">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(submitBuilder)}>
        <label>
          <p>Section Name <sup className='text-red-400'>**</sup></p>
          <input {...register('sectionName', { required: true })} className='bg-[#2C333F] select-none w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent' />
          {errors.sectionName && <span className='text-red-400'>Please enter the section name</span>}

          <div className="flex items-end gap-x-4">
            <IconBtn type="submit" text={`${editSection ? "Edit Section Name" : "Create Section"}`} >
              <IoAddCircleOutline size={20} className="text-yellow-50" />
            </IconBtn>

            {editSection && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-gray-400 underline"
              >
                Cancel Edit
              </button>
            )}

          </div>

        </label>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
