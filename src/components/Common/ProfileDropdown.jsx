import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../services/operations/authAPI"
import useOutsideClose from "../../hooks/OutsideClose"

function ProfileDropdown() {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const closeDashboard = useRef(null);
    useOutsideClose(closeDashboard, () => setOpen(false));

    if (!user) return null

    return (
        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1 cursor-pointer" onClick={() => setOpen(!open)}>
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
                {open && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[118%] bg-[##01050C] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                        ref={closeDashboard} >
                        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-black-500 hover:bg-[#252b35] hover:text-white">
                                <VscDashboard className="text-lg" />
                                Dashboard
                            </div>
                        </Link>
                        <div
                            onClick={() => {
                                dispatch(logout(navigate))
                                setOpen(false)
                            }}
                            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-black-500 hover:bg-[#252b35] hover:text-white"
                        >
                            <VscSignOut className="text-lg" />
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </button>
    )
}

export default ProfileDropdown;