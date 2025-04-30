import { toast } from "react-hot-toast";
import apiconnector from "../apiconnector";
import { profileEndpoints } from '../api';
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

export async function getEnrolledCourses(token) {
    let result = null;
    try {
        const response = await apiconnector('GET', GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log('get enroll ', response.data.data.courses);
        if (!response.data.success) {
            throw new Error('No student enrolled in courses');
        }

        result = response?.data?.data?.courses

    } catch (error) {
        console.log(error);
        toast.error(error.message || 'Something went wrong');
    }
    return result;
}
