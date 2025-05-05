import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import { deleteCourse, fetchInstructorCourse } from "../../../../services/operations/courseDetailAPI";
import { COURSE_STATUS } from "../../../../data/constants";
import ConfirmationModel from "../../../common/ConfirmationModel";

export default function CourseInsTable({ courses, setCourses }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30;

    const handleCourseDelete = async (courseId) => {

        setLoading(true);
        await deleteCourse({ courseId }, token);
        const result = await fetchInstructorCourse(token);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-[80vh]">
            <div className="custom-loader"></div>
        </div>
    }

    return (
        <>
            {/* Large Screen Card View */}
            <div className="hidden sm:block">
                <Table className="border  border-gray-700 w-full">
                    <Thead>
                        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-gray-700 bg-gray-800 px-6 py-3 text-white">
                            <Th className="flex-1 text-left text-sm font-semibold uppercase">Course</Th>
                            <Th className="text-left text-sm font-semibold uppercase">Price</Th>
                            <Th className="text-left text-sm font-semibold uppercase">Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {courses?.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-gray-400 col-span-3">
                                    No courses found
                                </Td>
                            </Tr>
                        ) : (
                            courses.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="flex gap-x-10 border-b border-gray-700 hover:bg-richblack-700 transition-all duration-200 px-6 py-6 rounded-md"
                                >
                                    {/* Course Info */}
                                    <Td className="flex flex-1 gap-5">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-36 w-56 rounded-lg object-cover shadow-md"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg font-bold text-gray-100">{course.courseName}</p>
                                            <p className="text-sm text-gray-300">
                                                {course?.courseDescription?.split(" ")?.length > TRUNCATE_LENGTH
                                                    ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                                    : course.courseDescription}
                                            </p>
                                            <p className="text-xs text-gray-300 mt-1">
                                                Created: {formatDate(course?.createdAt || course?.updatedAt)}
                                            </p>
                                            {/* Status */}
                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <span className="flex items-center gap-2 w-fit bg-yellow-900 text-yellow-200 px-2 py-1 rounded-full text-xs font-semibold">
                                                    <HiClock size={14} />
                                                    Draft
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 w-fit bg-green-700 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                    <FaCheckCircle size={14} />
                                                    Published
                                                </span>
                                            )}
                                        </div>
                                    </Td>

                                    {/* Price */}
                                    <Td className="flex items-center text-sm font-semibold text-richblack-100">
                                        ₹ {course.price}
                                    </Td>

                                    {/* Actions */}
                                    <Td className="flex items-center gap-4">
                                        {/* Edit Button */}
                                        <button
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                            title="Edit"
                                            className="text-caribbeangreen-300 cursor-pointer hover:scale-110 transition-all duration-200"
                                        >
                                            <FiEdit2 size={22} />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => { },
                                                    btn2Handler: !loading
                                                        ? () => setConfirmationModal(null)
                                                        : () => { },
                                                });
                                            }}
                                            title="Delete"
                                            className="text-[#ff4d4d] hover:scale-110 cursor-pointer transition-all duration-200"
                                        >
                                            <RiDeleteBin6Line size={22} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-6">
                {courses?.length === 0 ? (
                    <p className="text-center text-lg text-gray-400 mt-10">No courses found</p>
                ) : (
                    courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-richblack-800 p-4 rounded-lg border border-gray-700 shadow-sm"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.courseName}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-lg font-bold text-gray-100">{course.courseName}</h3>
                            <p className="text-sm text-gray-300 mt-1">
                                {course?.courseDescription?.split(" ")?.length > TRUNCATE_LENGTH
                                    ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                    : course.courseDescription}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Created: {formatDate(course?.createdAt || course?.updatedAt)}
                            </p>
                            <span className={`mt-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full
            ${course.status === COURSE_STATUS.DRAFT
                                    ? "bg-yellow-900 text-yellow-200"
                                    : "bg-green-700 text-white"}`}>
                                {course.status === COURSE_STATUS.DRAFT ? <HiClock size={14} /> : <FaCheckCircle size={14} />}
                                {course.status === COURSE_STATUS.DRAFT ? "Draft" : "Published"}
                            </span>

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm font-semibold text-richblack-100">₹ {course.price}</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                        className="text-caribbeangreen-300 hover:scale-110 transition-all duration-200"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading
                                                    ? () => handleCourseDelete(course._id)
                                                    : () => { },
                                                btn2Handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            });
                                        }}
                                        className="text-[#ff4d4d] hover:scale-110 transition-all duration-200"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {confirmationModal && <ConfirmationModel modelData={confirmationModal} />}
        </>
    );
}
