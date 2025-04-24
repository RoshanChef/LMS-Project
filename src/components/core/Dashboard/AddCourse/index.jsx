import React from 'react'
import RenderSteps from './RenderSteps'
import { useForm } from 'react-hook-form'

function AddCourse() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    function submitCourse(data) {
        console.log(data);
    }
    return (
        <>
            <div className='flex mt-10 lg:flex-row flex-col justify-between'>
                <div className='flex-col flex-2/12'>
                    <div>
                        <h1 className="mb-14 text-3xl font-medium text-gray-5">Add Course</h1>
                    </div>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className="sticky h-fit select-none top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-gray-700 bg-gray-800 p-6 xl:block">
                    <p className="mb-8 text-lg text-gray-50 ">⚡ Course Upload Tips</p>
                    <ul className="ml-5 list-item list-disc space-y-4 text-xs text-gray-50">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create and organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AddCourse