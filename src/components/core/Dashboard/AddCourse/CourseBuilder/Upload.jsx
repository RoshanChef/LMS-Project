import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";
import { MdClose } from "react-icons/md";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [videoUrl, setVideoUrl] = useState(null);
  const inputRef = useRef(null);

  function clickHandle(e) {
    e.preventDefault();
    inputRef.current?.click();
  }

  function handleDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      inputRef.current.files = files;

      const file = files[0];
      if (video) {
        setValue(name, URL.createObjectURL(file));
        setVideoUrl(URL.createObjectURL(file));
      } else {
        setValue(name, file);
      }
    }
  }

  console.log(videoUrl);


  return (
    <div className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <label className="flex flex-col gap-2">
          <p>
            {label}
            <sup className="text-red-500">*</sup>
          </p>

          {/* Correct ref handling */}
          <input
            {...register(name, { required: true })}
            ref={(e) => {
              if (e) {
                register(name, { required: true }).ref(e);
                inputRef.current = e;
              }
            }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (video) {
                  const videoBlobUrl = URL.createObjectURL(file);
                  setValue(name, video);
                  setVideoUrl(videoBlobUrl);
                } else {
                  setValue(name, file);
                }
              }
            }}
            name={name}
            type="file"
            accept="video/*"
            className="hidden"
          />

          {videoUrl ? (
            // Video Preview
            <div className="w-full relative aspect-video mt-4 rounded-xl overflow-hidden group">
              {/* Video Player */}
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                className="rounded-xl"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  setVideoUrl(null);
                  setValue(name, null, { shouldValidate: true });
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-gray-800/70 backdrop-blur-md hover:bg-yellow-400/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Remove media"
              >
                <MdClose className="text-white text-xl" />
              </button>
            </div>

          ) : (
            // Upload box
            <div
              className="flex flex-col items-center justify-center gap-4 p-6 bg-richblack-800 border-2 border-dashed border-richblack-600 hover:border-yellow-200 transition-all duration-300 rounded-2xl min-h-[280px] cursor-pointer shadow-inner hover:shadow-yellow-400/30 hover:scale-101 transform"
              onClick={clickHandle}
            >
              <FiUploadCloud className="text-yellow-300 text-6xl mb-2 animate-bounce-slow" />
              <div className="text-center px-6">
                <p className="text-richblack-200 text-sm leading-relaxed">
                  Drag & drop or{" "}
                  <span className="font-semibold text-yellow-300 underline underline-offset-4">
                    browse
                  </span>{" "}
                  to upload
                </p>

                <ul className="mt-5 text-xs text-richblack-300 space-y-1">
                  <li>
                    Recommended aspect ratio: <strong>16:9</strong>
                  </li>
                  <li>
                    Ideal resolution: <strong>1024×576</strong>
                  </li>
                  <li>
                    File types: <strong>.mkv, .mp4</strong>
                  </li>
                  <li>
                    Max size: <strong>1MB</strong>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
