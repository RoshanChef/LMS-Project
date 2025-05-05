import { useEffect, useState } from "react"
import { getInstructorData } from "../../../../services/operations/profileAPI.JS";
import { useSelector } from "react-redux";
import { fetchInstructorCourse } from "../../../../services/operations/courseDetailAPI";
import { Link } from "react-router-dom";
import InstructorChars from "./InstructorChars";
import { FiExternalLink, FiBook, FiUsers, FiDollarSign } from "react-icons/fi";

export default function Instructor() {
    const [loading, setLoading] = useState(true);
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const [instructorData, setInstructorData] = useState(null);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const instructor_data = await getInstructorData(token);
            const course_result = await fetchInstructorCourse(token);
            if (course_result?.length) setCourse(course_result);
            if (instructor_data) setInstructorData(instructor_data.coursesDetails);
            setLoading(false);
        })()
    }, [])

    const totalAmount = instructorData?.reduce((prev, cur) => prev + cur?.totalAmountGenerated, 0);
    const totalStudent = instructorData?.reduce((prev, cur) => prev + cur?.totalStudentsEnrolled, 0);
    const totalCourse = course?.length;

    return (
        <div className="space-y-8 p-4 md:p-6">
            {loading ? (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            ) : course.length > 0 ? (
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400'>
                            Welcome back, {user.firstName} {user.lastName}!
                        </h1>
                        <p className="text-gray-300">Here's what's happening with your courses today</p>
                    </div>

                    {/* Stats and Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Statistics Card */}
                        <div className="bg-gradient-to-br from-[#1f2735] to-[#2a3441] p-6 rounded-2xl shadow-xl lg:col-span-1">
                            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                                <FiBook className="text-amber-400" /> Statistics
                            </h2>

                            <div className="space-y-4">
                                <div className="px-4 py-3 rounded-lg bg-[#2a3441]/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-amber-500/10 text-amber-300">
                                            <FiBook size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/80">Total Courses</p>
                                            <p className="text-lg font-semibold text-amber-300">{totalCourse}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-3 rounded-lg bg-[#2a3441]/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-300">
                                            <FiUsers size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/80">Total Students</p>
                                            <p className="text-lg font-semibold text-emerald-300">{totalStudent}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-3 rounded-lg bg-[#2a3441]/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-blue-500/10 text-blue-300">
                                            <FiDollarSign size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/80">Total Income</p>
                                            <p className="text-lg font-semibold text-blue-400">₹{totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-gradient-to-br from-[#1f2735] to-[#2a3441] p-6 rounded-2xl shadow-xl lg:col-span-2">
                            <InstructorChars courses={instructorData} />
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="bg-gradient-to-br from-[#1f2735] to-[#2a3441] p-6 rounded-2xl shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <FiBook className="text-amber-400" /> Your Courses
                            </h2>
                            <Link to="/dashboard/my-courses" className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm hover:underline transition-colors">
                                View All <FiExternalLink size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.slice(0, 3).map((courseItem, index) => (
                                <div key={index} className="bg-[#2a3441] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/5 hover:border-white/10">
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={courseItem.thumbnail}
                                            alt="Course Thumbnail"
                                            className="w-full h-full object-cover transition-transform hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                            <h3 className="text-white font-medium truncate">{courseItem.courseName}</h3>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
                                            <span className="flex items-center gap-1">
                                                <FiUsers size={14} /> {courseItem.studentEnrolled?.length || 0}
                                            </span>
                                            <span className="font-medium text-white">₹{courseItem.price}</span>
                                        </div>
                                        <Link
                                            to={`/course/${courseItem._id}`}
                                            className="w-full mt-2 py-2 px-4 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <div className="bg-[#1f2735] p-8 rounded-2xl max-w-md w-full">
                        <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
                        <p className="text-gray-400 mb-6">You haven't created any courses yet</p>
                        <Link
                            to="/dashboard/add-course"
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Create Your First Course
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}