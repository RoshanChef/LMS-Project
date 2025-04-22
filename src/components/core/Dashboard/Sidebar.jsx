import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../../Common/ConfirmationModel';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (profileLoading || authLoading) {
        return (<div className='custom-loader flex items-center justify-center'></div>)
    }

    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div className="lg:flex hidden h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-gray-900 py-10">
            <div className="flex flex-col">
                {
                    sidebarLinks.map((link) => {
                        console.log(user.accountType);
                        
                        if (link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        )
                    })}
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700" />
            <div className="flex flex-col">
                <SidebarLink
                    link={{ name: "Settings", path: "/dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
                <button
                    onClick={() =>
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                    }
                    className="px-8 py-2 text-sm font-medium text-richblack-300 cursor-pointer">
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
            {confirmationModal && <ConfirmationModal modelData={confirmationModal} />}
        </div >
    )
}
export default Sidebar