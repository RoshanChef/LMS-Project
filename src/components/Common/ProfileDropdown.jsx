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
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useOutsideClose(dropdownRef, () => setOpen(false))

    if (!user) return null

    return (
        <div className="relative">
            {/* Button Trigger */}
            <button
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
                onClick={() => setOpen((prev) => !prev)}
            >
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-white text-sm" />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    ref={dropdownRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-48 sm:w-52 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 overflow-hidden"
                >
                    <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-100 hover:bg-gray-700 transition-colors duration-200">
                            <VscDashboard className="text-lg" />
                            Dashboard
                        </div>
                    </Link>
                    <button
                        onClick={() => {
                            dispatch(logout(navigate))
                            setOpen(false)
                        }}
                        className="w-full text-left cursor-pointer flex items-center gap-2 px-4 py-3 text-sm text-gray-100 hover:bg-gray-700 transition-colors duration-200"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown
