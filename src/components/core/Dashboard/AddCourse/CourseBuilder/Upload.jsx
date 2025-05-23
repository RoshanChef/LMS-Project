import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  getValues
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-gray-100 font-semibold" htmlFor={name}>
        {label} {!viewData && <sup className="text-red-500">*</sup>}
      </label>
      <div
        className={`${isDragActive ? "bg-gray-600" : "bg-gray-700"
          } flex min-h-[250px] hover:border-amber-300 cursor-pointer items-center justify-center rounded-lg border-2 border-dotted border-gray-500 hover:shadow-xl transition-all ease-in-out duration-200`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6 space-y-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover transform hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="relative w-full aspect-video">
                <ReactPlayer
                  url={previewSource}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-gray-400 cursor-pointer hover:text-gray-200 underline transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6 space-y-3"
            {...getRootProps()}
            onClick={() => inputRef.current.click()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center border-[.1rem] border-yellow-200 rounded-full bg-pure-greys-800 shadow-md hover:shadow-xl transition duration-300 ease-in-out">
              <FiUploadCloud className="text-3xl text-yellow-400" />
            </div>
            <p className="mt-3 max-w-[200px] text-center text-sm text-gray-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-400">Browse</span> a file
            </p>
            <ul className="mt-4 flex list-disc justify-between space-x-12 text-center text-xs text-gray-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-red-400">
          {label} is required
        </span>
      )}
    </div>
  )
}
