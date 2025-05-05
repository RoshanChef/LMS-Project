import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse, setStep } from '../../../../../Redux/Slices/courseSlice';
import RenderSteps from '../RenderSteps';
import { getFullDetailsOfCourse } from '../../../../../services/operations/courseDetailAPI';

function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        async function populateDetails() {
            if (courseId) {
                setLoading(true);
                const result = await getFullDetailsOfCourse(courseId, token);

                dispatch(setCourse(result.courseDetails));
                dispatch(setEditCourse(true));
                dispatch(setStep(1));

                setLoading(false);
                console.log("result ", result);
            }

        }
        populateDetails();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-[80vh]">
            <div className="custom-loader"></div>
        </div>
    }

    return (
        <div>
            <div className='text-3xl mb-14 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400'> EditCourse</div>
            <div>
                {course ? (<RenderSteps />) : (<p>No Course Found</p>)}
            </div>

        </div>
    )
}

export default EditCourse
