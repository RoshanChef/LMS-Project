import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Upload = ({ name, label, register, errors, setValue }) => {
  const [image, setImage] = useState(null);
  const { editCourse, course } = useSelector((state) => state.course);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setValue(name, file, { shouldValidate: true });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editCourse && course?.courseDetails?.thumbnail) {
      setImage(course?.courseDetails?.thumbnail);
    }
  }, [editCourse, course]);

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-2 font-medium">
        {label} <sup className="text-red-500">*</sup>
      </p>

      {image ? (
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg group border border-richblack-600 bg-richblack-700">
          <img
            src={image}
            alt="Uploaded thumbnail"
            className="w-full h-64 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setValue(name, null, { shouldValidate: true });
            }}
            className="absolute top-2 right-2 bg-gray-800 p-1.5 rounded-full hover:bg-yellow-500/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="Remove image"
          >
            <MdClose className="text-white cursor-pointer text-lg" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={label}
          className="flex flex-col items-center justify-center gap-3 bg-richblack-800 border-2 border-dashed border-richblack-500 hover:border-yellow-300 transition-all duration-300 rounded-xl min-h-[250px] cursor-pointer shadow-inner"
        >
          <input
            id={label}
            name={name}
            type="file"
            accept="image/*,.jpeg,.jpg,.png"
            className="hidden"
            {...register(name, { required: true })}
            onChange={handleChange}
          />

          <FiUploadCloud className="text-yellow-300 text-5xl" />

          <div className="text-center px-4">
            <p className="text-richblack-200 text-sm">
              Drag & drop or{' '}
              <span className="font-semibold text-yellow-50 underline underline-offset-2">
                browse
              </span>{' '}
              to upload
            </p>

            <ul className="mt-4 text-xs text-richblack-300 space-y-1">
              <li>Recommended aspect ratio: <strong>16:9</strong></li>
              <li>Ideal resolution: <strong>1024×576</strong></li>
              <li>File types: <strong>.jpg, .jpeg, .png</strong></li>
              <li>Max size: <strong>1MB</strong> (optional check)</li>
            </ul>
          </div>
        </label>
      )}

      {errors[name] && (
        <span className="mt-2 block text-xs text-red-400 tracking-wide">
          {label} is required**
        </span>
      )}
    </div>
  );
};

export default Upload;

