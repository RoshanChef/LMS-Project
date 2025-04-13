import { Link, matchPath } from "react-router-dom";
import monk from '../../assets/images/ChatGPT Image Apr 13, 2025, 01_57_26 AM.png';
import { NavbarLinks } from "../../data/navbar-links";

function Navbar() {
    return (
        <div className="flex h-11 items-center justify-center border-b-[1px] border-b-gray-600 text-white">
            <div className="flex w-11/12 items-center justify-between">

                <Link to={"/"}>
                    <div className="flex items-center gap-2 my-2">
                        <img src={monk} alt="" width={30} height={30} className="rounded-full block" />
                        <h1 className="text-white">study monk</h1>
                    </div>
                </Link>

                {/* Navigation links */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-gray-300">
                        {
                            NavbarLinks.map((link, inx) => (

                                ((link.title == "Home") ?
                                    <Link to={link.path} key={inx} >
                                        <li className="text-[#FFD60A]">{link.title}</li> </Link> :
                                    <Link to={link.path} key={inx} >
                                        <li key={inx}>
                                            {link.title}
                                        </li>
                                    </Link>)
                            ))
                        }

                    </ul>
                </nav>

                <div className="hidden items-center gap-x-4 md:flex">
                    <Link to={"/login"}>
                        <div className="bg-[#161D29]/60 px-4 py-1 backdrop-blur-md border border-white/10 rounded-lg text-white shadow-lg transition-all hover:bg-[#161D29]/80">
                            Log in
                        </div>
                    </Link>
                    <Link to={"/signup"}>
                        <div className="bg-[#161D29]/60 px-4 py-1 backdrop-blur-md border border-white/10 rounded-lg text-white shadow-lg transition-all hover:bg-[#161D29]/80">
                            Sign up
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Navbar; 