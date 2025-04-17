import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../Redux/Slices/authSlice";
import { endpoints } from "../api"
import apiconnector from "../apiconnector";
import { useDispatch, useSelector } from "react-redux";


const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST", LOGIN_API, { email, password });

            if (!response.data.success) {
                toast.error(response.data.message);
            } else {
                dispatch(setToken(response.data.token));
                navigate("/dashboard");
            }
        } catch (error) {
            console.log("error while login", error);
            toast.error("Login failed. Please try again.");
        }
        dispatch(setLoading(false));
    }
}


export function getResetPassword(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        console.log(RESETPASSTOKEN_API);
        // Backend call 
        try {
            const res = await apiconnector("POST", RESETPASSTOKEN_API, { email });
            if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                setEmailSent(true);
                toast.success("Reset Email sent");
            }
        } catch (error) {
            console.log('reset password token error', error.response.data.message);
            toast.error(`${error.response.data.message}`);
        }

        dispatch(setLoading(false));
    }
}

export function resetPassword(password, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        // Backend call
        try {
            const response = await apiconnector("POST", RESETPASSWORD_API, { password, token });
            console.log("response i got ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");

        } catch (error) {
            console.log("RESET PASSWORD Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}


export function sendOtp() {

    return async (dispatch) => {
        dispatch(setLoading(true));

        // Backend call
        try {

            const response = await apiconnector("POST", SENDOTP_API, { email });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");

        } catch (error) {
            toast.error("Unable to send otp");
        }

        dispatch(setLoading(false));
    }

}


export function signUp({ password, token }) {
    
}