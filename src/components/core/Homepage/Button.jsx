import React from 'react'
import { Link } from 'react-router-dom'

function Button({ linkto, active, children, hovereffect = true }) {
    return (
        <Link to={linkto}>
            <div
                className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${active ? "bg-[#ffd60a] text-black " : "bg-[#121D29]"
                    } hover:shadow-none hover:scale-95 transition-all duration-200 relative

                    ${active ? "before:bg-[#000]" : "before:bg-[#ffd60a]"} 

                    before:content-[''] before:absolute before:bottom-0 before:left-1/2 
                    before:transform before:-translate-x-1/2 
                    before:w-0 
                ${hovereffect && "hover:before:w-full "} 
                    before:h-[0.08rem] before:transition-all before:duration-600 
                    before:rounded-2xl
                    `}
            >
                {children}
            </div>
        </Link>
    )
}

export default Button