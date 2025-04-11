import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from "../assets/Study.mp4";
import CodeBlocks from '../components/core/Homepage/CodeBlocks';

function Home() {
  return (
    <div>

      {/* Section 1 */}
      <div className="relative mx-auto w-full max-w-7xl px-4 flex flex-col items-center justify-between gap-8 text-white">

        {/* CTA Link - More elegant button */}
        <Link to="/signup" className="group mx-auto mt-8 w-fit">
          <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#161d29] to-[#2a3a4d] p-[2px] font-bold shadow-lg transition-all duration-300 hover:scale-95 hover:shadow-md">
            <div className="flex flex-row items-center gap-2 rounded-full bg-[#161d29] px-8 py-3 transition-all duration-300 group-hover:bg-[#05080a]">
              <p className="bg-gradient-to-r from-[#99ab60] to-[#c0d36e] bg-clip-text text-transparent">
                Become an Instructor
              </p>
              <FaArrowRight className="text-[#99ab60] transition-transform animate-pulse duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center mt-8">
          <h1 className="text-4xl md:text-2xl font-bold leading-tight">
            Empower Your Future with <br />
            <span className="relative inline-block">
              <HighlightText text={"Coding Skills"} />
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-[#99ab60] to-[#c0d36e] rounded-full animate-ping"></span>
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
            position={"flex"}
            heading={<div>Unlock your <HighlightText text={"coding potentail"} /> with our online courses.</div>}
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            btn1={{ link: "/signup", title: "Try it Yourself", active: true }}
            btn2={{ link: "/login", title: "Learn More", active: false }}
            codeblack={`#include <bits/stdc++.h>\n\t\tusing namespace std;\n\t\tint main() {\n\t\tint value = 10;\n\t\tfor (int i = 1; i<=value; i++)\n\t\tcout << "Improve " << i << endl;\n\t\t}\n\t\treturn 0;\n\t\t}`}
          />
          <CodeBlocks
            position={"row-reverse"}
            heading={<div>Start <HighlightText text={"coding in seconds"} /> </div>}
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            btn1={{ link: "/signup", title: "Continue Lesson", active: true }}
            btn2={{ link: "/login", title: "Learn More", active: false }}

          />

        </div>
      </div>

      {/* section 2 */}

      {/* section 3 */}

      {/* footer */}
      {/* Section 1 */}

    </div>
  )
}

export default Home