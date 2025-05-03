// import { Link, matchPath, useLocation } from "react-router-dom";
// import monk from '../../assets/images/ChatGPT Image Apr 13, 2025, 01_57_26 AM.png';
// import { NavbarLinks } from "../../data/navbar-links";
// import { useSelector } from "react-redux";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import apiconnector from "../../services/apiconnector";
// import { categories } from '../..//services/api';
// import { useEffect, useState } from "react";
// import { RiArrowDownWideLine } from "react-icons/ri";
// import ProfileDropdown from "./ProfileDropdown";

// function Navbar() {
//     const { token } = useSelector(state => state.auth);
//     const { user } = useSelector(state => state.profile);
//     const { totalItems } = useSelector(state => state.cart);

//     const [subLinks, setSubLinks] = useState([])
//     const [loading, setLoading] = useState(false);

//     const location = useLocation();

//     function matchRoute(route) {
//         return matchPath({ path: route }, location.pathname);
//     }

//     useEffect(() => {
//         setLoading(true);
//         (async () => {
//             try {
//                 const res = await apiconnector('GET', categories.CATEGORIES_API);
//                 setSubLinks(res.data.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         })();
//         setLoading(false);
//     }, []);

//     return (
//         <div className="flex select-none h-11 items-center justify-center border-b-[1px] border-b-gray-600 text-white">
//             <div className="flex w-11/12 items-center justify-between">

//                 <Link to={"/"}>
//                     <div className="flex items-center gap-2 my-2">
//                         <img src={monk} alt="" width={30} height={30} className="rounded-full block" loading="lazy" />
//                         <h1 className="text-white">study monk</h1>
//                     </div>
//                 </Link>

//                 {/* Navigation links */}
//                 <nav className="hidden md:block">
//                     <ul className="flex gap-x-6 text-gray-300">
//                         {
//                             NavbarLinks.map((link, inx) => (
//                                 <li key={inx}>
//                                     {link.title === "Catalog" ? (
//                                         <div className="group relative flex items-center justify-center gap-2 cursor-pointer">
//                                             {link.title}
//                                             <RiArrowDownWideLine />

//                                             <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-100 p-4 text-gray-300 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px">

//                                                 <div className="absolute left-[50%] bg-white top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45  rounded bg-richblack-5"></div>
//                                                 {
//                                                     loading ? (
//                                                         <p className="text-center">Loading...</p>
//                                                     ) :
//                                                         (subLinks.length > 0) ? (
//                                                             subLinks.map((ele, inx) => (
//                                                                 <Link
//                                                                     to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`}
//                                                                     className="text-black rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-400/40"
//                                                                     key={inx}
//                                                                 >
//                                                                     {ele.name}
//                                                                 </Link>
//                                                             ))
//                                                         ) : (
//                                                             <div>No sublinks</div>
//                                                         )
//                                                 }
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <Link to={link?.path} className={`${matchRoute(link?.path) ? "text-amber-300" : "text-gray-400"}`}>
//                                             <p>{link.title}</p>
//                                         </Link>
//                                     )}
//                                 </li>
//                             ))
//                         }

//                     </ul>
//                 </nav>

//                 <div className="hidden items-center gap-x-4 md:flex">
//                     {
//                         user && user?.accountType !== "Instructor" &&
//                         (

//                             <Link
//                                 to="/dashboard/cart"
//                                 className="relative flex items-center gap-2 text-gray-200 hover:text-blue-600 transition-colors duration-200"
//                             >
//                                 <AiOutlineShoppingCart className="text-2xl" />
//                                 {totalItems > 0 && (
//                                     <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold h-4 w-4 flex items-center justify-center rounded-full shadow">
//                                         {totalItems}
//                                     </span>
//                                 )}
//                             </Link>

//                         )
//                     }
//                     {
//                         token == null &&
//                         (
//                             <Link to="/login">
//                                 <div className="px-4 text-red-400 animate-bounce hover:animate-none py-1 backdrop-blur-md  rounded-lg shadow-lg transition-all ">
//                                     Log in
//                                 </div>
//                             </Link>
//                         )
//                     }
//                     {
//                         token == null &&
//                         (<Link to="/signup">
//                             <div className=" px-4 py-1 backdrop-blur-mdrounded-lg text-white shadow-lg transition-all">
//                                 Sign up
//                             </div>
//                         </Link>
//                         )
//                     }
//                     {token != null && <ProfileDropdown />}
//                 </div>
//                 <button className="mr-4 md:hidden cursor-pointer touch-pan-down">
//                     <AiOutlineMenu style={{ fontSize: 24, fill: "#AFB2BF" }} />
//                 </button>
//             </div>
//         </div >
//     )
// }

// export default Navbar; 


import { Link, matchPath, useLocation } from "react-router-dom";
import monk from '../../assets/images/ChatGPT Image Apr 13, 2025, 01_57_26 AM.png';
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import apiconnector from "../../services/apiconnector";
import { categories } from '../../services/api';
import { useEffect, useState } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const location = useLocation();

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await apiconnector('GET', categories.CATEGORIES_API);
                setSubLinks(res.data.data);
            } catch (error) {
                console.log(error);
            }
        })();
        setLoading(false);
    }, []);

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#161d29]/90 backdrop-blur-md shadow-lg' : 'bg-[#161d29]/80 backdrop-blur-sm'} border-b border-[#2a3344]`}>
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src={monk}
                            alt="Study Monk Logo"
                            width={32}
                            height={32}
                            className="rounded-full transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                        <h1 className="text-xl font-semibold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Study Monk
                        </h1>
                    </Link>

                    {/* Navigation links */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-x-8 items-center">
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className="group relative">
                                            <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg  transition-all duration-200">
                                                {link.title}
                                                <RiArrowDownWideLine className="transition-transform duration-200 group-hover:rotate-180" />
                                            </div>

                                            <div className="invisible absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 transform opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                                <div className="relative rounded-xl bg-[#1e2535]/95 backdrop-blur-lg p-2 shadow-2xl border border-[#2a3344]">
                                                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#1e2535] border-t border-l border-[#2a3344]"></div>
                                                    {loading ? (
                                                        <div className="flex justify-center py-4">
                                                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent"></div>
                                                        </div>
                                                    ) : subLinks.length > 0 ? (
                                                        subLinks.map((ele, idx) => (
                                                            <Link
                                                                to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`}
                                                                className="block rounded-lg px-4 py-3 text-[#d1d9e8] hover:bg-[#2a3344] hover:text-amber-300 transition-colors duration-200"
                                                                key={idx}
                                                            >
                                                                {ele.name}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-3 text-[#8a9bb9]">No categories found</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link?.path}
                                            className={`px-3 py-2 rounded-lg transition-all duration-200  ${matchRoute(link?.path) ? "text-amber-300 font-medium" : "text-[#d1d9e8] hover:text-amber-200"}`}
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-4">
                        {user && user?.accountType !== "Instructor" && (
                            <Link
                                to="/dashboard/cart"
                                className="relative p-2 rounded-full hover:bg-[#2a3344]/50 transition-all duration-200 group"
                            >
                                <AiOutlineShoppingCart className="text-2xl text-[#d1d9e8] group-hover:text-amber-300 transition-colors" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-amber-400 text-[#161d29] text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}

                        {token == null ? (
                            <div className="lg:block hidden">
                                <Link to="/login">
                                    <button className=" px-4 py-2 cursor-pointer rounded-lg bg-transparent text-[#d1d9e8] hover:text-amber-300 transition-colors duration-200">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="px-4 py-2 text-gray-300 font-medium cursor-pointer">
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <ProfileDropdown />
                        )}

                        <button className="md:hidden p-2 rounded-lg hover:bg-[#2a3344]/50 transition-colors duration-200">
                            <AiOutlineMenu className="text-2xl text-[#d1d9e8]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;