import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from "../assets/Study.mp4";
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLangSec from '../components/core/Homepage/LearningLangSec';

import InstructorSec from '../components/core/Homepage/InstructorSec';
import Footer from '../components/Common/Footer';
import ExploreMore from '../components/core/Homepage/ExploreMore';

function Home() {
  return (
    <div className='flex flex-col mt-24'>
      {/* Section 1 */}
      <div className="relative mx-auto w-full max-w-7xl px-4 flex flex-col items-center justify-between gap-8 text-white">

        {/* CTA Link - More elegant button */}
        <Link to="/signup" className="group mx-auto mt-8 w-fit">
          <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#161d29] to-[#2a3a4d] p-[2px] font-bold shadow-lg transition-all duration-300 hover:scale-95 hover:shadow-md">
            <div className="flex flex-row items-center gap-2 rounded-full bg-[#161d29] px-8 py-3 transition-all duration-300 group-hover:bg-[#05080a]">
              <p className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
                Become an Instructor
              </p>
              <FaArrowRight className="text-indigo-500 transition-transform animate-pulse duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center mt-8">
          <h1 className="text-4xl md:text-2xl font-bold leading-tight">
            Empower Your Future with <br />
            <span className="relative inline-block">
              <HighlightText text={"Coding Skills"} />
              <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-ping"></span>
            </span>
          </h1>
        </div>

        {/* Subheading*/}
        <div className="mt-6 w-full max-w-2xl text-center text-md font-medium text-[#b8bfd6] leading-relaxed">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* Button Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <CTAButton active={true} linkto="/signup" className="px-8 py-3 text-lg">Start Learning Now</CTAButton>
          <CTAButton active={false} linkto="/login" className="px-8 py-3 text-lg border border-[#99ab60] hover:bg-[#99ab60]/10">Book a Demo</CTAButton>
        </div>

        {/* Video Section */}
        <div className="relative m-8 w-[90%] max-w-6xl rounded-2xl shadow-orange-800 shadow-[0px_7px_27px_-7px_#99ab60] mt-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 via-white/1 to-transparent z-10 rounded-2xl pointer-events-none 
          shadow-[0px_4px_26px_-7px_#99ab60] shadow-blue-400" />
          <video
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-auto object-cover rounded-2xl"
          >
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={<div>Unlock your <HighlightText text={"coding potentail"} /> with our online courses.</div>}
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            btn1={{ link: "/signup", title: "Try it Yourself", active: true }}
            btn2={{ link: "/login", title: "Learn More", active: false }}
            codeColor={"text-white"}
            codeblock={`#include <iostream>
using namespace std;

int main() {
  int value = 10;
  
  for (int i = 1; i <= value; i++) {
    cout << "Improved " << i << endl;
  }
  
  return 0;
}`}
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={<div className="w-[100%] text-4xl font-semibold lg:w-[50%]">Start <HighlightText text={"coding in seconds"} /> </div>}
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            btn1={{ link: "/signup", title: "Continue Lesson", active: true }}
            btn2={{ link: "/login", title: "Learn More", active: false }}
            codeColor={"#ffff76"}
            codeblock={`import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";
const Home = () => {
  return (
    <div>
      Home
    </div>
  );
};
export default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
      </div>

      {/* section 2 */}
      <div className='bg-white text-white'>
        {/* ExploreMore */}
        <ExploreMore />

        {/* home background */}
        <div className='h-[333px] homebg relative'>
          <div className='w-11/12 max-w-max md:w-10/12 mx-auto flex flex-col items-center gap-5 justify-center'>
            <div className='h-[150px]'></div>
            <div className='flex gap-6 lg:my-10 absolute top-20 lg:top-45'>
              <CTAButton linkto={"/signup"} active={true}>
                <div className='flex items-center gap-2 '>
                  <span>Expore Full Catalog</span>
                  <FaArrowRight className='animate-pulse' />
                </div>
              </CTAButton>
              <CTAButton linkto={"/login"} active={false}>Learn More </CTAButton>
            </div>
          </div>
        </div>

        {/*mini content    */}
        <div className="mx-auto flex w-11/12 max-w-maxContent  text-black flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        {/* TimelineSection */}
        <TimelineSection />

        {/* LearningLangSec */}
        <LearningLangSec />

        <div className='bg-[#01050c]'>
          {/* Instructor */}
          <InstructorSec />

          <h1 className='text-4xl font-semibold text-center'>Reviews from other learners</h1>

          {/* Review slider */}
        </div>

        {/* section 3 */}

        {/* footer */}
        <div className='bg-[#161D29] text-gray-400'>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default Home