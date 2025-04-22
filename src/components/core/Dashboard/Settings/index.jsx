import React from 'react'
import UpdatePassword from './UpdatePassword'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'

function Settings() {
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            {/* Change Profile Picture */}
            <ChangeProfilePicture />

            {/* Profile */}
            <EditProfile />

            {/* Password */}
            <UpdatePassword />

            {/* Delete Account */}
            <DeleteAccount />

        </div>
    )
}

export default Settings
