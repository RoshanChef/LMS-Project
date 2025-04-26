import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import IconBtn from '../../../../Common/IconBtn';
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep, setEditCourse } from '../../../../../Redux/Slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailAPI';
import NestedView from './NestedView';
import toast from 'react-hot-toast';


function CourseBuilderForm() {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSection, setEditSec] = useState(null);

  // console.log('courseBuilder ', course);

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

  function handleChangeEditSectionName(sectionId, sectionName) {
    if (editSection === sectionId) {
      cancelEdit();
      return;
    }
    setEditSec(sectionId);
    setValue('sectionName', sectionName);
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
      // console.log('result ', result);
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
    <div className="space-y-10 rounded-2xl w-full mr-4 border border-gray-700 bg-gray-800 p-8 shadow-lg">
      <p className="text-xl font-semibold text-white">Course Builder</p>

      <form onSubmit={handleSubmit(submitBuilder)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Section Name <sup className="text-red-400">*</sup>
          </label>
          <input
            {...register('sectionName', { required: true })}
            className="w-full rounded-lg bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter section name"
          />
          {errors.sectionName && (
            <p className="mt-1 text-sm text-red-400">Please enter the section name</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <IconBtn type="submit" text={editSection ? "Edit Section Name" : "Create Section"}>
            <IoAddCircleOutline size={20} className="text-[#121d29]" />
          </IconBtn>

          {editSection && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-gray-400 underline hover:text-gray-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
        <button
          onClick={goBack}
          className="rounded-lg cursor-pointer bg-gray-300 px-5 py-2 font-semibold text-gray-900 hover:bg-gray-400"
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
