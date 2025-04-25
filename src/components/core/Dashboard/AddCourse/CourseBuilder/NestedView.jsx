import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { VscTrash } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import ConfirmationModel from '../../../../Common/ConfirmationModel';
import SubSectionModal from './SubSectionModal';

function NestedView({ handleChangeEditSectionName }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { course } = useSelector(state => state.course);
  console.log('Nested view ', course);


  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handeldeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token);
    if (result) {
      dispatch(setCourse(result));
      setConfirmationModal(null);
    }
  }

  const handeldeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, courseId: course._id, sectionId }, token);
    if (result) {
      dispatch(setCourse(result));
      setConfirmationModal(null);
    }
  }

  return (
    <div>
      <div>
        {
          course?.courseContent?.map((section) => (
            <details key={section._id} open className='mt-4'>
              <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-gray-600 py-2'>
                <div className='flex items-center gap-x-3'>
                  <RxDropdownMenu size={25} className=' text-gray-400' />
                  <p className='font-semibold text-gray-400'>{section.sectionName}</p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <button>
                    <VscEdit className='text-lg text-gray-400 cursor-pointer' onClick={() => {
                      handleChangeEditSectionName(section._id, section.sectionName);
                    }} />
                  </button>
                  <button>
                    <VscTrash className='text-lg text-gray-300' onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2: "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handeldeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }} />
                  </button>
                  <span className="font-medium text-gray-400">|</span>
                  <VscTriangleDown className='text-lg text-gray-300' />
                </div>
              </summary>
              <div className='px-6 pb-4'>
                {
                  section.subSection.map((subSection) => (
                    <div
                      key={subSection._id}
                      onClick={(e) => {
                        if (e.currentTarget != e.target) return;
                        setviewSubSection(subSection);
                      }}
                      className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-gray-500 py-2 z-0'>

                      <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu size={25} className=' text-richblack-50' />
                        <p className='font-semibold text-richblack-50' >{subSection.title}</p>
                      </div>

                      <div className='flex items-center gap-x-3'>
                        <button>
                          <VscEdit className='text-lg text-gray-300 z-50' onClick={
                            () => {
                              setEditSubsection(subSection);
                            }
                          } />
                        </button>
                        <button>
                          <VscTrash className='text-lg text-richblack-50 z-50' size={21} onClick={() => {
                            setConfirmationModal({
                              text1: "Delete this Sub-Section?",
                              text2: "Selected lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => handeldeleteSubSection(subSection._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }} />
                        </button>
                      </div>

                    </div>
                  ))
                }
                <button onClick={() => setAddSubSection(section._id)} className='mt-3 flex items-center gap-x-1 text-yellow-400 font-bold'>
                  <VscAdd className='text-lg text-yellow-400' />
                  <p>Add Lecture</p>
                </button>

              </div>

            </details>
          ))
        }
      </div>
      {
        addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} /> :
          editSubsection ? <SubSectionModal modalData={editSubsection} setModalData={setEditSubsection} edit={true} /> :
            viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setviewSubSection} view={true} /> : null
      }
      {
        confirmationModal ? <ConfirmationModel modalData={confirmationModal} setConfirmationModal={setConfirmationModal} /> : null
      }

    </div >
  )
}

export default NestedView
