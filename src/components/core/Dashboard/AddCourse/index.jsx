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
            <div className='flex lg:flex-row flex-col justify-between'>
                <div>
                    <div>
                        <h1>Add Course</h1>
                    </div>
                    <div>
                        <RenderSteps />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(submitCourse)}>

                        </form>
                    </div>
                </div>
                <div>
                    <p>⚡ Code Upload Tips</p>
                    <ul>
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