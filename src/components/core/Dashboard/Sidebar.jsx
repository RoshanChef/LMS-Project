import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (profileLoading || authLoading) {
        return (<div className='custom-loader flex items-center justify-center'></div>)
    }


    return (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-gray-900 py-10">
            <div className="flex flex-col">
                {sidebarLinks.map((link) => {
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
            </div>

        </div>
    )
}
export default Sidebar