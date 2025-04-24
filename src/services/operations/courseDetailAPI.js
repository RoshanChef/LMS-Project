import toast from "react-hot-toast";
import apiconnector from "../apiconnector";
import {courseEndpoints} from '../api';

const { COURSE_CATEGORIES_API } = courseEndpoints;


export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiconnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
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