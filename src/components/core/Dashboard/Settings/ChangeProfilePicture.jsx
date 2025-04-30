import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from "react-icons/fi";
import { FiCamera, FiFolder, FiLoader } from "react-icons/fi"

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

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      await dispatch(updateDisplayPicture(token, imageFile));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile]);


  return (
    <div className="rounded-xl border border-[#2a3245] bg-[#1e2536] p-6 transition-all hover:border-indigo-500/50">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Profile Image with Hover Effect */}
        <div className="group relative">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-20 w-20 rounded-full border-2 border-[#2a3245] object-cover transition-all group-hover:border-indigo-500/60"
          />
          <div onClick={() => { fileInputRef.current.click() }} className="absolute cursor-pointer inset-0 flex items-center justify-center rounded-full   bg-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100">
            <FiCamera className="h-5 w-5 text-white opacity-80" />
          </div>
        </div>

        {/* Upload Controls */}
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-lg font-medium text-gray-100">Profile Picture</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/webp"
            />

            {/* Select Button */}
            <button
              onClick={handleClick}
              disabled={loading}
              className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-[#2a3245] px-4 py-2 text-sm font-medium text-gray-200 transition-all hover:bg-indigo-500/10 hover:text-indigo-400 disabled:opacity-50"
            >
              <FiFolder className="h-4 w-4" />
              Select Image
            </button>

            {/* Upload Button */}
            <button
              onClick={handleFileUpload}
              disabled={loading || !previewSource}
              className={`flex items-center justify-center cursor-pointer gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${loading
                ? 'bg-indigo-500/50 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
            >
              {loading ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload className="h-4 w-4" />
                  Upload
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500">
            Supports JPG, PNG, GIF, WEBP (Max 2MB)
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
