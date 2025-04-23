import { toast } from "react-hot-toast";
import apiconnector from "../apiconnector";

export function getEnrolledCourses(token) {
    return async (dispatch) => {
        const response = await apiconnector('GET', null, {
            Authorization: `Bearer ${token}`
        });

    }
}