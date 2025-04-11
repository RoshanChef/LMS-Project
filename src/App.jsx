import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

export default function App() {

  return <>
    <div className="w-full min-h-screen flex flex-col bg-[#01050c] ">

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  </>
}