import { Route, Routes } from "react-router-dom";
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

export default function App() {
  const { user } = useSelector(state => state.profile);

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
              </>
            )
          }

        </Route>
        <Route path="/about" element={<About_us />} />
        <Route path="/contact" element={<Contact_us />} />


        <Route path="/:name" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </>
}