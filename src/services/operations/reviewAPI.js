import toast from 'react-hot-toast';
import { ratingsEndpoints } from '../api';
import apiconnector from '../apiconnector';

const { CREATE_REVIEW_API } = ratingsEndpoints;

export async function create_Rating(data, token) {
    try {
        const response = await apiconnector('POST', CREATE_REVIEW_API, data, {
            "Authorization": `Bearer ${token}`
        });
        console.log(response);
        if (!response) {
            throw new Error('Something went wrong while reviewing');
        }
        toast.success('Reviewed saved successfully');

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong while reviewing');
    }
}