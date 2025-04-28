import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../../Redux/Slices/courseSlice';
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
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
                setLoading(false);
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
            <div> EditCourse</div>
            <div>
                {course ? (<RenderSteps />) : (<p>No Course Found</p>)}
            </div>

        </div>
    )
}

export default EditCourse
