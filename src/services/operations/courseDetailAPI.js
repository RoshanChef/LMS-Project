import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import { courseEndpoints } from '../api';
import { categories } from '../api';

const { CREATE_CATEGORIES_API } = categories;
const { LECTURE_COMPLETION_API, COURSE_DETAILS_API, GET_FULL_COURSE_DETAILS_AUTHENTICATED, DELETE_COURSE_API, DELETE_SECTION_API, COURSE_CATEGORIES_API, CREATE_SECTION_API, EDIT_COURSE_API, CREATE_COURSE_API, DELETE_SUBSECTION_API, UPDATE_SECTION_API, UPDATE_SUBSECTION_API, CREATE_SUBSECTION_API, GET_ALL_INSTRUCTOR_COURSES_API } = courseEndpoints;

// get course categories
export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiconnector("GET", COURSE_CATEGORIES_API);
        // console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
        if (!response?.data?.success) {
            toast.error("Could Not Fetch Course Categories");
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
            toast.error("Could Not Edit Course Details");
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
            toast.error("Could Not Create Course");
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

        if (!response?.data?.success) {
            toast.error('Could Not Update Section');
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
            toast.error('Could Not create Section');
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
            toast.error('Could Not Delete SubSection');
        }

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
            toast.error('Could Not Create SubSection');
        }
        result = response?.data?.data?.updatedCourse;
        toast.success('Course SubSection Created Successfully');
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
            toast.error('Could Not Update SubSection');
        }
        result = response?.data?.updatedCourse;
        toast.success('Course SubSection Updated Successfully');


    } catch (error) {
        console.log('Update SubSection API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// detele section
export async function deleteSection(data, token) {
    let result = null;
    try {
        const response = await apiconnector('POST', DELETE_SECTION_API, data, {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        })
        if (!response?.data?.success) {
            toast.error('Could Not Delete Course Section');
        }
        toast.success('Course Section Deleted Successfully');
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log('Delete Course Section API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}

export async function fetchInstructorCourse(token) {
    let result = null;
    const toastId = toast.loading('Loading...');
    try {
        const response = await apiconnector('GET', GET_ALL_INSTRUCTOR_COURSES_API, null, {
            "Authorization": `Bearer ${token}`
        })

        if (!response.data.success) {
            toast.error('Could Not Get any Courses');
        }
        result = response?.data?.data;
    } catch (error) {
        console.log('Fetch Instructor Courses API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteCourse(data, token) {
    let result = null;
    const toastId = toast.loading('Deleting Course...');
    try {
        const response = await apiconnector('POST', DELETE_COURSE_API, data, {
            "Authorization": `Bearer ${token}`
        });

        if (!response.data.success) {

            throw new Error('Could Not Delete Course');
        }

        toast.success('Course Deleted Successfully');
        result = response?.data?.deletedCourse;
        console.log(result);
    } catch (error) {
        console.log('Delete Course API ERROR', error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;

}

export async function getFullDetailsOfCourse(courseId, token) {
    let result = null;
    const toastId = toast.loading('Loading Course Details...');
    try {
        const response = await apiconnector('POST', GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId: courseId }, {
            'Authorization': `Bearer ${token}`
        });
        if (!response.data.success) {
            toast.error('Could Not Get Course Details');
        }
        result = response?.data?.data;
    }
    catch (error) {
        toast.error(error?.response?.data?.message);
        console.log('Get Course Details API ERROR', error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function fetchCourseDetails(courseId, token) {
    let result = null;
    const toastId = toast.loading('Loading Course Details...');
    try {
        const response = await apiconnector('POST', COURSE_DETAILS_API, { courseId }, {
            "Authorization": `Bearear ${token}`
        })
        if (!response.data.success) {
            toast.error('Could Not Get Course Details');
        }
        // console.log('getcourseDetails ', response);
        result = response?.data?.data;
    } catch (error) {

    }
    toast.dismiss(toastId);
    return result;
}

export async function lecturesComplete(data, token) {
    try {
        const response = await apiconnector('POST', LECTURE_COMPLETION_API, data, {
            'Authorization': `Bearer ${token}`
        })

        if (!response.data.success) {
            toast.error('Could Not Complete Lecture');
        }
        // toast.success('Lecture Completed Successfully');

    } catch (error) {
        console.log('err ', error);
    }
}

export async function create_category(data, token) {
    let result = null;
    try {
        const response = await apiconnector('POST', CREATE_CATEGORIES_API, data, {
            'Authorization': `Bearer ${token}`
        })
        if (!response.data.success) {
            toast.error('Could Not Complete Lecture');
        }
        toast.success(response.data.message)
        result = response.data.message;
    } catch (err) {
        console.log(err);
    }
    return result;
}