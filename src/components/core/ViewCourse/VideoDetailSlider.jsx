import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { RiVideoLine } from "react-icons/ri";
import { MdChromeReaderMode } from "react-icons/md";

function VideoDetailSlider({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideoBarActive] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    function getData() {
      if (!courseSectionData?.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );

      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
          (subSection) => subSection._id === subSectionId
        );

      const activeSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    }

    getData();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      {/* Mobile toggle button (hidden on desktop) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-30 bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg"
      >
        {isMobileOpen ? <IoIosArrowUp /> : <MdChromeReaderMode />}
      </button>

      <div 
        className={`fixed lg:relative z-20 w-full lg:w-[20%] flex flex-col justify-between h-[89vh] p-4 bg-gray-900 text-white border-r border-gray-800/50 overflow-hidden transition-all duration-300
          ${isMobileOpen ? 'left-0' : '-left-full'} lg:left-0`}
      >
        {/* Header Section */}
        <div className='space-y-4'>
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="flex cursor-pointer items-center gap-2 group mb-2"
          >
            <div className="p-1 rounded-md bg-gray-800 group-hover:bg-gray-700 transition-all">
              <IoChevronBack className="text-base text-gray-300 group-hover:text-yellow-400 transition-colors" />
            </div>
            <span className="text-xs font-medium text-gray-300 group-hover:text-yellow-400 transition-colors">
              Back to course
            </span>
          </button>

          {/* Course Title and Progress */}
          <div className="space-y-3 pb-3 border-b border-gray-800/50">
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-gray-800 rounded-md">
                <RiVideoLine className="text-lg text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                  {courseEntireData?.courseName}
                </h2>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-1.5  rounded-full"
                        style={{
                          width: `${(completedLectures?.length / totalNoOfLectures) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-400 ml-2 whitespace-nowrap">
                    {Math.round((completedLectures.length / totalNoOfLectures) * 100)}%
                  </span>
                </div>
                <div className="text-[0.65rem] text-gray-400 mt-1">
                  {completedLectures.length}/{totalNoOfLectures} completed
                </div>
              </div>
            </div>
          </div>

          {/* Sections & Subsections */}
          <div className="space-y-2 select-none overflow-y-auto max-h-[65vh] pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {courseSectionData?.map((section, index) => (
              <div key={section._id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}
                  className={`flex cursor-pointer justify-between items-center w-full px-3 py-2 rounded-lg transition-all text-left ${activeStatus === section._id
                    ? "bg-gray-800/70"
                    : "hover:bg-gray-800/50"
                    }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${section.subSection.some(sub => completedLectures.includes(sub._id))
                      ? "bg-green-400"
                      : "bg-gray-600"
                      }`}></div>
                    <span className="text-xs font-medium truncate">
                      {section?.sectionName}
                    </span>
                  </div>
                  <IoIosArrowUp className={`text-xs text-gray-400 flex-shrink-0 transition-transform ${activeStatus === section._id ? "rotate-180" : ""
                    }`} />
                </button>

                {/* Subsections */}
                {activeStatus === section._id && (
                  <div className="ml-4 pl-2 border-l border-gray-800 space-y-1 mt-1 ">
                    {section?.subSection?.map((subSection) => (
                      <button
                        key={subSection._id}
                        onClick={() => {
                          navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`);
                          setVideoBarActive(subSection._id);
                          setIsMobileOpen(false); // Close sidebar on mobile after selection
                        }}
                        className={`flex cursor-pointer items-center gap-2 w-full p-2 rounded-md transition-all text-xs ${videobarActive === subSection._id
                          ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/5 text-yellow-400 font-medium"
                          : "text-gray-300 hover:bg-gray-800/30"
                          }`}
                      >
                        {completedLectures.includes(subSection._id) ? (
                          <FiCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-gray-500 flex-shrink-0"></div>
                        )}
                        <span className="truncate">{subSection.title}</span>
                        <div className={`ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 ${videobarActive === subSection._id ? "bg-yellow-400" : "bg-transparent"
                          }`}></div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Review Button */}
        <button
          onClick={() => {
            setReviewModal(true);
            setIsMobileOpen(false); // Close sidebar on mobile after clicking
          }}
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg cursor-pointer text-amber-300 transition-all text-xs font-medium mt-3 hover:bg-amber-300/10"
        >
          <BiCommentDetail className="text-sm" />
          Add Review
        </button>
      </div>
    </>
  );
}

export default VideoDetailSlider;