import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../Redux/Slices/authSlice";
import { setUser } from "../../Redux/Slices/profileSlice";
import { endpoints } from "../api";
import apiconnector from "../apiconnector";
import { resetCart } from "../../Redux/Slices/cartSlice";


const { SENDOTP_API, SIGNUP_GOOGLE_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST", LOGIN_API, { email, password });
            // console.log(response.data);
            if (!response.data.success) {
                toast.error(response.data.message);
            } else {
                toast.success("Login Successful");
                dispatch(setToken(response.data.token));
                console.log(response.data.user.accountType);

                const userImage = response.data?.user?.image
                    ? response.data.user.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

                dispatch(setUser({ ...response.data.user, image: userImage }));

                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));

                if (response.data.user.accountType === 'Admin')
                    navigate('/admin/board');
                else
                    navigate("/dashboard/my-profile");
            }
        } catch (error) {
            console.log("error while login", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}


export function getResetPassword(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));

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

            if (!response.data.success) {
                toast.error(response.data.message);
            }

            toast.success("Password has been reset successfully");

        } catch (error) {
            console.log("RESET PASSWORD Error", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}


export function sendOtp(email, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        // Backend call
        try {

            const response = await apiconnector("POST", SENDOTP_API, { email });
            if (!response.data.success) {
                toast.error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email")
        } catch (error) {
            toast.error(error.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}


export function signUp(otp, accountType, firstName, lastName, email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        //Backend call 
        try {

            const response = await apiconnector("POST", SIGNUP_API, { otp, email, firstName, lastName, password, accountType });
            if (!response.data.success) {
                toast.error(response.data.message);
            }

            toast.success("Account created successfully");

            navigate("/login");
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        }

        dispatch(setLoading(false));
    }
}

export async function signUpGoogle(data, navigate) {
    try {
        const response = await apiconnector('POST', SIGNUP_GOOGLE_API, data, null);
        if (!response.data.success) {
            toast.error("Please login vai signup form");
        }
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.newUser));
        navigate("/dashboard/my-profile");
    } catch (error) {
        console.log(error);
    }
}

