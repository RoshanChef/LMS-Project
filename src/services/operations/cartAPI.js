import toast from 'react-hot-toast';
import { ratingsEndpoints } from '../../services/api';


const { AVG_RATING_API } = ratingsEndpoints;


export function getAverageRating(id) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiconnector('GET', AVG_RATING_API, { courseId: id });
            if (!response.data.success) throw new Error(response.data.message);
            return response.data;
        } catch (error) {

        }
        toast.dismiss(toastId);
    }
}