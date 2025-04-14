import { Link, matchPath, useLocation } from "react-router-dom";
import monk from '../../assets/images/ChatGPT Image Apr 13, 2025, 01_57_26 AM.png';
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import apiconnector from "../../services/apiconnector";
import { categories } from '../..//services/api';
import { useEffect, useState } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";

function Navbar() {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await apiconnector('GET', categories.CATEGORIES_API);
                setSubLinks(res.data.data);
                console.log(res.data.data);

            } catch (error) {
                console.log(error);
            }
        })();
        setLoading(false);
    }, []);

    return (
        <div className="flex h-11 items-center justify-center border-b-[1px] border-b-gray-600 text-white">
            <div className="flex w-11/12 items-center justify-between">

                <Link to={"/"}>
                    <div className="flex items-center gap-2 my-2">
                        <img src={monk} alt="" width={30} height={30} className="rounded-full block" loading="lazy" />
                        <h1 className="text-white">study monk</h1>
                    </div>
                </Link>

                {/* Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-gray-300">
                        {
                            NavbarLinks.map((link, inx) => (
                                <li key={inx}>
                                    {link.title === "Catalog" ? (
                                        <div className="group relative flex items-center justify-center gap-2">
                                            {link.title}
                                            <RiArrowDownWideLine />

                                            <div className="absolute left-1/2 top-full mt-2 
                                       invisible opacity-0 
                                       group-hover:visible group-hover:opacity-100
                                       transition-all duration-200 lg:w-[250px] h-10
                                       flex flex-col rounded-md bg-white shadow-md text-gray-700
                                       transform -translate-x-1/2 z-10
                                     ">
                                                <div className="absolute z-10 left-[58%] -top-1 bg-white h-6 w-6 rotate-45 "> </div>
                                                {
                                                    loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) :
                                                        (subLinks.length > 0) ? (
                                                            subLinks.map((ele, inx) => (
                                                                <Link
                                                                    to={`/catalog/${ele.name.replace(/[^\w\s-]/g, '').split(" ").join("-").toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-400"
                                                                    key={inx}
                                                                >
                                                                    {ele.name}
                                                                </Link>

                                                            ))
                                                        ) : (
                                                            <div>No sublinks</div>
                                                        )

                                                }


                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path} className={`${matchRoute(link?.path) ? "text-amber-300" : "text-gray-400"}`}>
                                            <p>{link.title}</p>
                                        </Link>
                                    )}
                                </li>
                            ))
                        }

                    </ul>
                </nav>

                <div className="hidden items-center gap-x-4 md:flex">
                    {
                        user && user?.accountType !== "Instructor" &&
                        (<Link to="/dashboard/cart">
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 &&
                                (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>)
                    }
                    {
                        token == null &&
                        (
                            <Link to="/login">
                                <div className="bg-[#161D29]/60 px-4 py-1 backdrop-blur-md border border-white/10 rounded-lg text-white shadow-lg transition-all hover:bg-[#161D29]/80">
                                    Log in
                                </div>
                            </Link>
                        )
                    }
                    {
                        token == null &&
                        (<Link to="/signup">
                            <div className="bg-[#161D29]/60 px-4 py-1 backdrop-blur-md border border-white/10 rounded-lg text-white shadow-lg transition-all hover:bg-[#161D29]/80">
                                Sign up
                            </div>
                        </Link>
                        )
                    }
                    {
                        token != null &&
                        <ProfileDropdown />
                    }
                </div>

            </div>
        </div >
    )
}

export default Navbar; 