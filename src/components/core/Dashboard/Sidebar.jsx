import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import ConfirmationModal from '../../Common/ConfirmationModel';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (<div className='custom-loader w-[100vw] min-h-[100vh] flex items-center justify-center'></div>);
    }

    // Filter links based on user type
    const filteredLinks = sidebarLinks.filter(link => {
        if (link.type && user?.accountType !== link.type) return false;
        return true;
    });

    // For mobile view, we'll show only 3 main links + settings + logout
    const mobileLinks = filteredLinks.slice(0, 3);

    return (
        <>
            {/* Desktop Sidebar - shows on medium screens and larger */}
            <div className="hidden md:flex min-w-[220px] lg:min-h-screen flex-col border-r-[1px] border-r-gray-700 bg-gray-900 py-0 lg:py-10">
                <div className="flex flex-col">
                    {filteredLinks.map((link) => (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                    ))}
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
                        className="px-8 py-2 text-sm font-medium text-richblack-300 cursor-pointer"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Bar - shows on small screens */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around items-center z-50">
                {mobileLinks.map((link) => (
                    <div key={link.id} className="flex flex-col items-center">
                        <SidebarLink link={link} iconName={link.icon} mobile />
                    </div>
                ))}
                
                <div className="flex flex-col items-center">
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                        mobile
                    />
                </div>
                
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
                    className="flex flex-col items-center text-sm font-medium text-richblack-300 cursor-pointer"
                >
                    <VscSignOut className="text-lg m-4" />
                    <span className="text-xs mt-1 hidden lg:inline">Logout</span>
                </button>
            </div>

            {confirmationModal && <ConfirmationModal modelData={confirmationModal} />}
        </>
    );
}

export default Sidebar