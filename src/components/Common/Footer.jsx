import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/TimeLineLogo/Logo4.svg";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaChevronRight
} from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Company Info - Made more compact */}
          <div className="min-w-[180px]">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={Logo}
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-white font-semibold text-lg">Studymonk</span>
            </div>
            <div className="flex gap-3 mb-4">
              {[
                { icon: <FaFacebook className="w-4 h-4" />, color: "hover:text-blue-500" },
                { icon: <FaGoogle className="w-4 h-4" />, color: "hover:text-red-500" },
                { icon: <FaTwitter className="w-4 h-4" />, color: "hover:text-sky-400" },
                { icon: <FaYoutube className="w-4 h-4" />, color: "hover:text-red-600" }
              ].map((social, index) => (
                <Link
                  key={index}
                  to={"/"}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={`${social.icon.type.displayName} social link`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              Empowering learners worldwide
            </div>
          </div>

          {/* Compact Link Sections */}
          <div className="min-w-[120px]">
            <h3 className="text-white text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              {Resources.slice(0, 4)?.map((item, index) => (
                <li key={index}>
                  <Link
                    // to={item.split(" ").join("-").toLowerCase()}
                    to={"/"}
                    className="text-gray-400 hover:text-white text-xs transition-colors duration-200 flex items-center"
                  >
                    <FaChevronRight className="w-2 h-2 mr-1 text-blue-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[120px]">
            <h3 className="text-white text-sm font-semibold mb-3">Plans</h3>
            <ul className="space-y-2">
              {Plans?.map((item, index) => (
                <li key={index}>
                  <Link
                    // to={item.split(" ").join("-").toLowerCase()}
                    to={"/"}
                    className="text-gray-400 hover:text-white text-xs transition-colors duration-200 flex items-center"
                  >
                    <FaChevronRight className="w-2 h-2 mr-1 text-blue-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[120px]">
            <h3 className="text-white text-sm font-semibold mb-3">Community</h3>
            <ul className="space-y-2">
              {Community?.map((item, index) => (
                <li key={index}>
                  <Link
                    // to={item.split(" ").join("-").toLowerCase()}
                    to={"/"}
                    className="text-gray-400 hover:text-white text-xs transition-colors duration-200 flex items-center"
                  >
                    <FaChevronRight className="w-2 h-2 mr-1 text-blue-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FooterLink2 Data - made more compact */}
          {FooterLink2?.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="text-white text-sm font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.slice(0, 4)?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      // to={link.link}
                      to={"/"}
                      className="text-gray-400 hover:text-white text-xs transition-colors duration-200 flex items-center"
                    >
                      <FaChevronRight className="w-2 h-2 mr-1 text-blue-400" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compact Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            {BottomFooter?.map((item, index) => (
              <Link
                key={index}
                to={"/"}
                className="text-gray-500 hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            Made with <FaHeart className="mx-1 text-red-500" /> by Studymonk
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;