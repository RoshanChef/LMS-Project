import { resetCart } from '../../Redux/Slices/cartSlice';
import { studentEndpoints } from '../api';
import apiconnector from '../apiconnector';
import toast from 'react-hot-toast';

const { COURSE_PAYMENT_API, SEND_PAYMENT_SUCCESS_EMAIL_API, COURSE_VERIFY_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export const createorderApi = async (data, userDetails, token, navigate, dispatch) => {
    let result = null;
    const toastId = toast.loading("Please wait...");
    try {
        const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!isLoaded) {
            toast.dismiss(toastId);
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const orderResponse = await apiconnector('POST', COURSE_PAYMENT_API, data, {
            "Authorization": `Bearer ${token}`
        });

        if (!orderResponse?.data?.success || !orderResponse.data.data) {
            toast.error(orderResponse.data?.message || "Failed to create order");
            console.error("Order creation failed:", orderResponse);
            toast.dismiss(toastId);
            return;
        }

        const orderData = orderResponse.data.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.amount.toString(),
            currency: orderData.currency,
            order_id: orderData.id,
            name: "Study Notion",
            description: "Thank you for purchasing the course",
            prefill: {
                name: `${userDetails?.firstName} ${userDetails?.lastName}`,
                email: userDetails?.email,
            },
            handler: async function (response) {
                console.log("Razorpay payment successful:", response);
                await sendPaymentSuccessEmail(response, orderData.amount, token);
                await verifypayment(response, data.courses, token, navigate, dispatch);
            },
            theme: {
                color: "#686CFD",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        result = orderResponse.data;
    } catch (error) {
        console.log('Error during payment:', error?.response?.data?.message);
        toast.error(error?.response?.data?.message || 'went wrong ');
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const sendPaymentSuccessEmail = async (response, amount, token) => {
    const toastId = toast.loading('Sending payment success email...');
    try {
        const { razorpay_order_id, razorpay_payment_id } = response;

        const result = await apiconnector('POST', SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount
        }, {
            "Authorization": `Bearer ${token}`
        });

        if (!result?.data?.success) {
            throw new Error(result?.data?.message || "Email sending failed");
        }

        toast.success('Payment confirmation email sent!');
    } catch (error) {
        console.error('Payment success email error:', error);
        toast.error('Failed to send confirmation email');
    } finally {
        toast.dismiss(toastId);
    }
};

export const verifypayment = async (response, courses, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying payment...");
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const result = await apiconnector('POST', COURSE_VERIFY_API, {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courses
        }, {
            "Authorization": `Bearer ${token}`
        });

        if (!result?.data?.success) {
            throw new Error(result?.data?.message || "Payment verification failed");
        }

        toast.success("Payment verified successfully!");
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Could not verify payment');
    } finally {
        toast.dismiss(toastId);
    }
};
