import { Link, matchPath, useLocation } from "react-router-dom";
import monk from '../../assets/images/ChatGPT Image Apr 13, 2025, 01_57_26 AM.png';
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import apiconnector from "../../services/apiconnector";
import { categories } from '../../services/api';
import { useEffect, useRef, useState } from "react";
import { RiArrowDownWideLine, RiCloseLine } from "react-icons/ri";
import ProfileDropdown from "./ProfileDropdown";
import { FaGripLines } from "react-icons/fa6";
import gsap from "gsap";

function Navbar() {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null); // moved this line above closeMenu

    const location = useLocation();
    const menuRef = useRef(null);
    const closeRef = useRef(null);
    const mobileMenuRef = useRef(null);

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
                setSubLinks(res.data?.data || []);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
            gsap.from(closeRef.current, {
                opacity: 0,
                duration: 0.3,
                rotate: 90
            });
            gsap.from(mobileMenuRef.current, {
                x: 300,
                duration: 0.4,
                ease: "power3.out"
            });
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showMenu]);

    const closeMenu = () => {
        setActiveSubmenu(null);
        gsap.to(mobileMenuRef.current, {
            x: 300,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShowMenu(false)
        });
    };

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

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

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-x-8 items-center">
                            {NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className="group relative">
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg text-[#d1d9e8] hover:text-amber-300 transition duration-200"
                                                onClick={() => toggleSubmenu(index)}
                                            >
                                                {link.title}
                                                <RiArrowDownWideLine className={`transition-transform duration-200 ${activeSubmenu === index ? 'rotate-180' : ''}`} />
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
                                            className={`px-3 py-2 rounded-lg transition-all duration-200 ${matchRoute(link?.path) ? "text-amber-300 font-medium" : "text-[#d1d9e8] hover:text-amber-200"}`}
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
                            <div className="hidden lg:flex items-center gap-2">
                                <Link to="/login">
                                    <button className="px-4 py-2 cursor-pointer rounded-lg bg-transparent text-[#d1d9e8] hover:text-amber-300 transition-colors duration-200">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="px-4 py-2 rounded-lg  text-white font-medium hover:text-amber-300 cursor-pointer transition-colors duration-200">
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <ProfileDropdown />
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            ref={menuRef}
                            onClick={() => setShowMenu(true)}
                            className="md:hidden p-2 rounded-lg text-[#d1d9e8] hover:text-amber-300 transition-colors"
                        >
                            <FaGripLines size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMenu && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMenu} />

                    <div
                        ref={mobileMenuRef}
                        className="fixed top-0 right-0 w-full h-[100vh] z-50 md:hidden bg-[#161d29] backdrop-blur-md border-l border-[#2a3344] shadow-xl"
                    >
                        <button
                            ref={closeRef}
                            onClick={closeMenu}
                            className="absolute top-4 left-4 p-2 text-[#d1d9e8] cursor-pointer hover:text-amber-300 transition-colors"
                        >
                            <RiCloseLine className="w-6 h-6" />
                        </button>

                        <nav className="py-16 px-6 overflow-y-auto h-full">
                            <ul className="flex flex-col gap-y-6">
                                {NavbarLinks.map((link, index) => (
                                    <li key={index} className="group relative">
                                        {link.title === "Catalog" ? (
                                            <div className="relative">
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => toggleSubmenu(index)}
                                                    className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg text-[#d1d9e8] hover:text-amber-300 transition duration-200"
                                                >
                                                    {link.title}
                                                    <RiArrowDownWideLine
                                                        className={`transition-transform duration-200 ${activeSubmenu === index ? 'rotate-180' : ''}`}
                                                    />
                                                </div>

                                                {activeSubmenu === index && (
                                                    <div className="mt-2 w-full rounded-xl bg-[#1e2535]/95 backdrop-blur-lg p-2 shadow-2xl border border-[#2a3344]">
                                                        {loading ? (
                                                            <div className="flex justify-center py-4">
                                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
                                                            </div>
                                                        ) : subLinks.length > 0 ? (
                                                            subLinks.map((ele, idx) => (
                                                                <Link
                                                                    to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`}
                                                                    key={idx}
                                                                    className="block rounded-lg px-4 py-3 text-[#d1d9e8] hover:bg-[#2a3344] hover:text-amber-300 transition-colors duration-200"
                                                                    onClick={closeMenu}
                                                                >
                                                                    {ele.name}
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-3 text-[#8a9bb9]">No categories found</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                to={link?.path}
                                                className={`block px-3 py-2 rounded-lg transition-all duration-200 ${matchRoute(link?.path) ? "text-amber-300 font-medium" : "text-[#d1d9e8] hover:text-amber-200"}`}
                                                onClick={closeMenu}
                                            >
                                                {link.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}

                                {token == null && (
                                    <>
                                        <li className="mt-8 pt-4 border-t border-[#2a3344]">
                                            <Link
                                                to="/login"
                                                className="block w-full text-center px-4 py-2 rounded-lg bg-transparent text-[#d1d9e8] hover:text-amber-300 transition-colors duration-200"
                                                onClick={closeMenu}
                                            >
                                                Log in
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/signup"
                                                className="block w-full text-center px-4 py-2 rounded-lg bg-amber-400 text-[#161d29] font-medium hover:bg-amber-300 transition-colors duration-200"
                                                onClick={closeMenu}
                                            >
                                                Sign up
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}

export default Navbar;
