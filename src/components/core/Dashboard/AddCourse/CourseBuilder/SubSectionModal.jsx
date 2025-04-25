import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false
}) {

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    useEffect(() => {
        if (view || edit) {
            setValue("lecture", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            // console.log("useeffect modalData", modalData);
        }
    }, [view, edit]);

    function onSubmit(data) {
        if (view) return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made");
            }
            else {
                handelEditSubsection(data);
            }
            return;
        }

        const formData = new FormData();
        formData.append("title", data.lecture);
        formData.append("description", data.lectureDesc);
        formData.append("sectionId", modalData);
        formData.append("courseId", course._id);
        formData.append("videoFile", data.lectureVideo);
        try {

            console.log("formdata", [...formData]);
            
        } catch (error) {

        }
    }



    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lecture !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        return false;
    }


    return (
        <div>

        </div>
    )
}

export default SubSectionModal