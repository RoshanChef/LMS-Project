import { useRef, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";

function Accordion({ section, isActive, handleActive }) {
    const contentRef = useRef(null);
    useEffect(() => {
        contentRef.current.style.maxHeight = isActive.includes(section._id)
            ? `${contentRef.current.scrollHeight}px`
            : "0px";
    }, [isActive, section._id]);
    function formatDuration(seconds) {
        if (!seconds) return "0s"; // Handle undefined/0 case

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        // Return formatted string based on duration length
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
    return (
        <div className="mb-3 rounded-lg overflow-hidden shadow-sm bg-[#1e2535] border border-[#2a3344] select-none">
            {/* Section Header */}
            <div
                onClick={() => handleActive(section._id)}
                className="flex justify-between items-center p-4 cursor-pointer bg-[#232b3b] hover:bg-[#2a3344] transition-colors duration-200"
            >
                <div className="flex items-center gap-3">
                    <IoIosArrowUp
                        className={`text-[#8a9bb9] transition-transform duration-300 ${isActive.includes(section._id) ? "rotate-0" : "-rotate-180"
                            }`}
                    />
                    <h3 className="font-medium text-[#d1d9e8]">{section.sectionName}</h3>
                </div>
                <span className="text-sm text-[#8a9bb9]">
                    {section.subSection.length} {section.subSection.length === 1 ? "Lecture" : "Lectures"}
                </span>
            </div>

            {/* Animated Content */}
            <div
                ref={contentRef}
                className="transition-all duration-300 ease-in-out select-none overflow-hidden"
                style={{ maxHeight: "0px" }}
            >
                {section.subSection.map((subSection, index) => (
                    <div
                        key={index}
                        className="flex items-center p-3 pl-12 border-t border-[#1a2236] hover:bg-[#0a101d] transition-all duration-200 group"
                    >
                        <div className="flex items-center w-full">
                            <HiOutlineVideoCamera className="mr-4 text-[#5a6a8f] group-hover:text-[#7d8db5] flex-shrink-0 transition-colors duration-200" />
                            <p className="text-[#c3cde0] group-hover:text-white truncate pr-3 transition-colors duration-200">
                                {subSection.title}
                            </p>
                            {/* Optional: Add duration if available */}
                            <span className="ml-auto text-xs text-[#5a6a8f] group-hover:text-[#7d8db5]">
                                {formatDuration(subSection.timeDuration)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accordion;