import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from './components/Common/Navbar';
import './app.css';
import Login from "./pages/Login";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Dashboard from "./components/core/Auth/Dashboard";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import About_us from "./pages/About_us";
import Contact_us from "./pages/Contact_us";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./data/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/AddCourse/EditCourse";
import Catelog from "./pages/Catelog";
import DetailsPage from "./pages/DetailsPage";
import AdminLog from "./pages/AdminLog";
import { useEffect, useState } from "react";
import ViewCourse from "./pages/ViewCourse";
import ViewDetails from "./components/core/ViewCourse/ViewDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

export default function App() {
    const { user } = useSelector(state => state.profile);
    const location = useLocation();
    const [path, setPath] = useState(location.pathname.substring(1));
    useEffect(() => {
        setPath(location.pathname.substring(1));
    }, [location.pathname]);

    return <>
        <div className="w-full text-white min-h-screen flex flex-col bg-[#01050c] ">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/signup"
                    element={
                        <OpenRoute>
                            <Signup />
                        </OpenRoute>
                    }
                ></Route>

                <Route
                    path="/login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                ></Route>

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update-password/:token" element={
                    <OpenRoute>
                        <UpdatePassword />
                    </OpenRoute>
                } />
                <Route path="/verify-email" element={
                    <OpenRoute>
                        <VerifyEmail />
                    </OpenRoute>
                } />

                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="my-profile" element={<MyProfile />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="instructor" element={<Instructor />} />

                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <>
                                <Route path="enrolled-courses" element={<EnrolledCourses />} />
                                <Route path="cart" element={<Cart />} />
                            </>
                        )
                    }

                    {
                        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                            <>
                                <Route path="add-course" element={<AddCourse />} />
                                <Route path="my-courses" element={<MyCourses />} />
                                <Route path="edit-course/:courseId" element={<EditCourse />} />

                            </>
                        )
                    }

                </Route>

                <Route path="catalog/:catalogName" element={<Catelog />} />

                <Route path="/about" element={<About_us />} />
                <Route path="/contact" element={<Contact_us />} />
                <Route path="/course/:id" element={<DetailsPage />} />

                <Route element={
                    <PrivateRoute>
                        <ViewCourse />
                    </PrivateRoute>
                }>
                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT &&
                        <>
                            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element={<ViewDetails />}
                            ></Route>
                        </>
                    }
                </Route>


                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    </>
}