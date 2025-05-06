import * as Icons from 'react-icons/vsc';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName];
    const location = useLocation();


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink
            to={link.path}
            className={`relative lg:px-8 lg:py-2 lg:p-5 p-7 text-sm font-medium ${matchRoute(link.path)
                ? "lg:bg-blue-600/50 bg-[#01050C]  text-blue-50"
                : "bg-opacity-0 text-gray-200"
                } transition-all duration-200`}
        >
            <span
                className={`absolute left-0 top-0 h-0 lg:h-full w-[0.15rem] bg-blue-50 transition-all duration-300
                    ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                    }`}
            ></span>

            {/* Options Name */}
            <div className="flex items-center gap-x-2">
                {/* Icon Goes Here */}
                <Icon className="text-lg" /> 
                <span className='lg:inline hidden '>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink
