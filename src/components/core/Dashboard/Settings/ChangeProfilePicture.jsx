import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import IconBtn from '../../../Common/IconBtn';
import { updateDisplayPicture } from '../../../../services/operations/settingAPI';

function ChangeProfilePicture() {
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const previewFile = (file) => {
    const url = URL.createObjectURL(file);
    setPreviewSource(url);
  }

  const handleFileUpload = () => {
    try {

      setLoading(true);

      dispatch(updateDisplayPicture(token, imageFile));

      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile]);


  return (
    <div>
      <div className="flex items-center justify-between rounded-md border-[1px] border-gray-600 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
