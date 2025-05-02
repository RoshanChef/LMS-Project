import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourse } from '../../../services/operations/courseDetailAPI';
import IconBtn from '../../common/IconBtn';
import CourseInsTable from './InstructorCourse/CourseInsTable';

function MyCourses() {
    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourse() {
            const result = await fetchInstructorCourse(token);
            if (result) {
                setCourses(result);
            }
        }
        fetchCourse();
    }, [token]);

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">My Courses</h1>
                <IconBtn text="Add Course" onclick={()=>navigate("/dashboard/add-course")} />
            </div>
            <div>
                <CourseInsTable courses={courses} setCourses={setCourses} />
            </div>
        </div>
    );
}

export default MyCourses;
