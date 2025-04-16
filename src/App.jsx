import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from './components/Common/Navbar';
import './app.css';
import Login from "./pages/Login";
import Error from "./pages/Error";

export default function App() {

  return <>
    <div className="w-full min-h-screen flex flex-col bg-[#01050c] ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route> 
      </Routes>
    </div>
  </>
}