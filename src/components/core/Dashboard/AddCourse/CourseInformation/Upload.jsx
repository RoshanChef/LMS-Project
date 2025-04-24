import React, { useState } from 'react'
import { TbDragDrop } from "react-icons/tb";

function Upload({ name, register, errors, setValue, getValues }) {
    const [url, setUrl] = useState(null);
    function imageChange(event) {
        const file = event.target.files[0];
        const img_url = URL.createObjectURL(file);
        setUrl(img_url);
        setValue(name, img_url);
        console.log(file);
    }

    function dropping(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const img_url = URL.createObjectURL(file);
        setUrl(img_url);
        setValue(name, img_url);
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                className='hidden'
                {...register(name, {
                    required: true,
                    validate: {
                        isImage: (fileList) =>
                            fileList.length === 0 || fileList[0].type.startsWith('image/') || "Only image files are allowed",
                    },
                })}
                onChange={imageChange}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
            )}
            <div onDragOver={e => e.preventDefault()}
                onDrop={dropping}
                className='flex flex-col  items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer hover:border-amber-300 rounded-lg h-64 w-full bg-[#2C333F]'
            >
                {url ? (
                    <img src={url} alt="Uploaded preview" className="object-cover h-full w-full rounded-lg" />
                ) : (
                    <>
                        <TbDragDrop size={50} className="text-yellow-300" />
                        <div className="text-gray-400 text-sm text-center mt-2">
                            <p>Drag and drop an image, or</p>
                            <p>
                                click to <span className="text-yellow-300 font-medium">Browse</span> a file
                            </p>
                            <ul className="list-disc flex gap-4 text-gray-400 list-inside text-sm mt-12 space-y-1">
                                <li>Aspect ratio: 16:9</li>
                                <li>Recommended size: 1024×576</li>
                            </ul>
                        </div>
                    </>
                )}



            </div>
        </div >
    )
}

export default Upload
