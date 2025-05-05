import apiconnector from "../apiconnector";
import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../Redux/Slices/authSlice";
import { setUser } from "../../Redux/Slices/profileSlice";
import { settingsEndpoints } from "../api";


const { UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API } = settingsEndpoints;

//updateProfilePicture
export function updateDisplayPicture(token, displayPic) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        try {
            const formData = new FormData();
            formData.append("displayPic", displayPic);

            const response = await apiconnector('POST', UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.user));
            toast.success("Profile picture updated successfully");

        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

// updateProfile
export function updateProfile(token, data) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiconnector('PUT', UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                toast.error(response.data.message);
            }

            const userImage = response.data.user.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(
                setUser({ ...response.data.user, image: userImage })
            )

            toast.success("Profile Updated Successfully")

        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token, oldPassword, newPassword) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {

            const response = await apiconnector('POST', CHANGE_PASSWORD_API, { oldPassword, newPassword }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                toast.success("Password Changed Successfully")
            }
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error("Could Not Change Password")
        }
        toast.dismiss(toastId);
    }
}