import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from "react-player";
import { FaStepBackward, FaPlay, FaStepForward } from "react-icons/fa";
import { lecturesComplete } from '../../../services/operations/courseDetailAPI';
import { MdOutlineDescription } from "react-icons/md";
import { setCompletedLectures } from '../../../Redux/Slices/viewCourseSlice';

function ViewDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { courseId, sectionId, subSectionId } = useParams();
    const [videoData, setVideoData] = useState([]);
    const [videEnded, setVideoEnded] = useState(false);
    const [showVideoControls, setShowVideoControls] = useState(false);

    const playerRef = useRef(null);

    const location = useLocation();

    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        if (!courseId && !sectionId && !subSectionId)
            navigate('/dashboard/enrolled-courses');

        if (!courseSectionData?.length)
            return;

        const filterData = courseSectionData.filter(section => section._id === sectionId);
        const filterVideoData = filterData[0]?.subSection?.filter(subSection => subSection._id === subSectionId);

        setVideoData(filterVideoData?.[0]);
        setVideoEnded(false);

    }, [courseSectionData, courseEntireData, location.pathname]);

    function isFirstVideo() {
        const currentSectionIndex = courseSectionData?.findIndex(section => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(subSection => subSection._id === subSectionId);

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0)
            return true;
        else
            return false;
    }

    function isLastVideo() {
        const currentSectionIndex = courseSectionData?.findIndex(section => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(subSection => subSection._id === subSectionId
        );

        const noOfSubSection = courseSectionData[currentSectionIndex]?.subSection?.length;
        const noOfSection = courseSectionData.length;

        if (currentSectionIndex === noOfSection - 1 && currentSubSectionIndex === noOfSubSection - 1)
            return true;
        else
            return false;
    }

    function goToNextVideo() {
        if (isLastVideo())
            return;

        const currentSectionIndex = courseSectionData?.findIndex(section => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(subSection => subSection._id === subSectionId);

        const noOfSubSection = courseSectionData[currentSectionIndex]?.subSection?.length;


        if (currentSubSectionIndex !== noOfSubSection - 1) {
            const nextSubIndex = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubIndex}`);
        }
        else {
            const nextSubIndex = courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;
            const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubIndex}`);
        }
    }

    function goToPrevVideo() {
        if (isFirstVideo())
            return;
        const currentSectionIndex = courseSectionData?.findIndex(section => section._id === sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(subSection => subSection._id === subSectionId);

        const noOfSubSection = courseSectionData[currentSectionIndex]?.subSection?.length;
        if (currentSubSectionIndex != 0) {
            const prevSubIndex = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubIndex}`);
        } else {
            const prevSectionIndex = courseSectionData[currentSectionIndex - 1]?._id;
            const prevSubIndex = courseSectionData[currentSectionIndex - 1]?.subSection[noOfSubSection - 1]?._id;
            navigate(`/view-course/${courseId}/section/${prevSectionIndex}/sub-section/${prevSubIndex}`);
        }
    }

    async function handleLectureCompletion(Data) {
        if (Data) {

            let obj = {
                courseId,
                sectionId,
                subSectionId
            }
            if (completedLectures.includes(videoData._id)) return;
            await lecturesComplete(obj, token);
            dispatch(setCompletedLectures([...completedLectures, videoData._id]));
        }
        else {
            let newcompledLec = completedLectures.filter((item) => item !== videoData._id);
            console.log(newcompledLec);

            dispatch(setCompletedLectures(newcompledLec));
        }
    }

    return (
        <div>
            {
                !videoData ? (<div>
                    No Data Found
                </div>) : (
                    <div>
                        <div className='lg:w-[60vw]  w-screen p-8'>
                            <div className='relative aspect-video bg-black rounded-xl overflow-hidden'>
                                <ReactPlayer
                                    ref={playerRef}
                                    url={videoData?.videoUrl}
                                    controls={true}
                                    height="100%"
                                    width="100%"
                                    style={{ borderRadius: '0.5rem' }}
                                    onEnded={() => {
                                        setVideoEnded(true);
                                        handleLectureCompletion(true);
                                        setShowVideoControls(true);
                                    }}
                                />
                                {
                                    showVideoControls && (
                                        <div className="absolute inset-0 flex items-center justify-center gap-8 bg-black/70">
                                            <button
                                                className="border text-white p-4 cursor-pointer bg-white/10 rounded-full"
                                                onClick={() => {
                                                    setShowVideoControls(false);
                                                    goToPrevVideo();
                                                }}
                                            >
                                                <FaStepBackward />
                                            </button>
                                            <button
                                                className="border text-white p-4 cursor-pointer bg-white/10 rounded-full"
                                                onClick={() => {
                                                    if (playerRef?.current) {
                                                        playerRef?.current.seekTo(0);
                                                        playerRef.current.getInternalPlayer().play();
                                                        handleLectureCompletion(false);
                                                        setVideoEnded(false);
                                                        setShowVideoControls(false);
                                                    }
                                                }}
                                            >
                                                <FaPlay />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowVideoControls(false);
                                                    goToNextVideo();
                                                }}
                                                className="border text-white p-4 cursor-pointer bg-white/10 rounded-full"><FaStepForward /></button>

                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-2xl'>{videoData.title}</p>
                                <p className='text-gray-400 flex items-center gap-2'><MdOutlineDescription />{videoData.description}</p>
                            </div>
                        </div>

                    </div>

                )
            }

        </div>
    )
}

export default ViewDetails
