import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { courseEndpoints } from '../api';

const { DELETE_SECTION_API, COURSE_CATEGORIES_API, CREATE_SECTION_API, EDIT_COURSE_API, CREATE_COURSE_API, DELETE_SUBSECTION_API, UPDATE_SECTION_API, UPDATE_SUBSECTION_API, CREATE_SUBSECTION_API } = courseEndpoints;

// get course categories
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiconnector("GET", COURSE_CATEGORIES_API);
        // console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}

// edit the course details
export const editCourseDetails = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Edit Course Details");
        }
        toast.dismiss(toastId);
        toast(`Course Details Updated Successfully`);
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_EDIT API ERROR............", error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}

// create course
export const createCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could Not Create Course");
        }
        result = response?.data?.data;
        toast.dismiss(toastId);
        toast(`Course Created Successfully`);
    } catch (error) {
        console.log("COURSE_CREATE API ERROR............", error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}

// update section
export async function updateSection(data, token) {
    let result = null;
    const toastId = toast.loading('Loding ....');
    try {
        const response = await apiconnector('POST', UPDATE_SECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        });
        console.log('Update Section API Response', response);
        if (!response?.data?.success) {
            throw new Error('Could Not Update Section');
        }
        toast.success('Course Section Updated Successfully');
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log('UPDATE SECTION API ERROR', error);
        toast.error(error?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create section
export async function createSection(data, token) {
    let result = null;
    const toastId = toast.loading('Loding ....');
    try {
        const response = await apiconnector('POST', CREATE_SECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error('Could Not create Section');
        }

        // console.log('Create Section API Response', response.data.updatedCourse);
        result = response?.data?.updatedCourse;

        toast.success('Course Section Created Successfully');
    }
    catch (error) {
        console.log('CREATE SECTION API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete sub-section
export async function deleteSubSection(data, token) {
    let result = null;
    const toastId = toast.loading('Loding ....');
    try {
        const response = await apiconnector('POST', DELETE_SUBSECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error('Could Not Delete SubSection');
        }

        console.log('Delete SubSection API Response', response.data.updatedCourse);
        toast.success('Course SubSection Deleted Successfully');
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log('Delete SubSection API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);

    return result;
}

export async function createSubSection(data, token) {
    let result = null;
    const toastId = toast.loading('Loding ....');
    try {
        const response = await apiconnector('POST', CREATE_SUBSECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error('Could Not Create SubSection');
        }
        result = response?.data?.updatedCourse;
        toast.success('Course SubSection Created Successfully');
        console.log('response i got ', result);
    } catch (error) {
        console.log('Create SubSection API ERROR', error);
        toast.error(error?.response?.data?.message);
    }

    toast.dismiss(toastId);
    return result;
}

export async function updateSubSection(data, token) {
    let result = null;
    const toastId = toast.loading('Loding ....');
    try {
        const response = await apiconnector('PUT', UPDATE_SUBSECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error('Could Not Update SubSection');
        }
        result = response?.data?.updatedCourse;
        toast.success('Course SubSection Updated Successfully');
        console.log('response i got ', result);

    } catch (error) {
        console.log('Update SubSection API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSection(data, token) {
    let result = null;
    try {
        const response = await apiconnector('POST', DELETE_SECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            throw new Error('Could Not Delete Course Section');
        }
        toast.success('Course Section Deleted Successfully');
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log('Delete Course Section API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}