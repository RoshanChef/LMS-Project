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

export default function App() {

  return <>
    <div className="w-full min-h-screen flex flex-col bg-[#01050c] ">
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
        <Route path="/verify-otp" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  </>
}