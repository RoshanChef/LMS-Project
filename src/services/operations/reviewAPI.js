import toast from 'react-hot-toast';
import { ratingsEndpoints } from '../api';
import apiconnector from '../apiconnector';

const { CREATE_REVIEW_API, REVIEWS_DETAILS_API } = ratingsEndpoints;

export async function create_Rating(data, token) {
    try {
        const response = await apiconnector('POST', CREATE_REVIEW_API, data, {
            "Authorization": `Bearer ${token}`
        });

        if (!response) {
            throw new Error('Something went wrong while reviewing');
        }
        toast.success('Reviewed saved successfully');

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong while reviewing');
    }
}

export async function gettingReviews() {
    try {
        const response = await apiconnector('GET', REVIEWS_DETAILS_API);

        // Optional: check success flag if your API returns it
        if (!response?.data?.success) {
            toast.error('Failed to fetch reviews');
            return [];
        }

        // Return reviews array or empty array if none
        return response?.data?.reviews || [];

    } catch (error) {
        console.log('Error fetching reviews:', error);
        toast.error(error?.response?.data?.message || 'Something went wrong while fetching reviews');
        return [];
    }
}
