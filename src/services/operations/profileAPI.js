import { toast } from "react-hot-toast";
import apiconnector from "../apiconnector";
import { profileEndpoints } from '../api';
import { settingsEndpoints } from '../api';
import { logout } from "./authAPI";
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;
const { DELETE_PROFILE_API } = settingsEndpoints;

export async function getEnrolledCourses(token) {
    let result = null;
    try {
        const response = await apiconnector('GET', GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        // console.log('get enroll ', response.data.data);
        if (!response.data.success) {
            throw new Error('No student enrolled in courses');
        }

        result = response?.data?.data?.courses
        result = response.data.data; 

    } catch (error) {
        console.log(error);
        toast.error(error.message || 'Something went wrong');
    }
    return result;
}


export async function delete_Account(token, password, navigate, dispatch) {
    const toastId = toast.loading("Deleting...");
    try {
        const response = await apiconnector('POST', DELETE_PROFILE_API, { password }, {
            'Authorization': `${token}`
        });
        console.log("response i got delete ", response);
        if (!response.data.success) {
            throw new Error('Not get any response of delete account');
        }
        toast.success('Deleted your account');
        dispatch(logout(navigate))
    } catch (error) {
        console.log(error);
        toast.error(error.message || 'Something went wrong');
    }
    toast.dismiss(toastId);
}