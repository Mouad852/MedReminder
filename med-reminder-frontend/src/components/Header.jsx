import { Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import Logo from "./DarkLogo";
import { Link } from "react-router-dom";

const navList = [
  { href: "/", label: "Home" },
  { href: "/medications", label: "Medications" },
  { href: "/appointments", label: "Appointments" },
  { href: "/profile", label: "Profile" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <header className="scroll-mt-20 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Logo />

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium ml-70">
          {navList.map((link) => (
            <Link
              to={link.href}
              key={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`transition ${
                activeLink === link.href
                  ? "text-sky-600 font-semibold"
                  : "text-gray-700 hover:text-sky-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          <PhoneCall className="text-sky-600" />
          <Link
            to="/book"
            className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition text-sm"
          >
            Book Appointement
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-gray-700 hover:cursor-pointer" />
            ) : (
              <Menu className="text-gray-700 hover:cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3 text-gray-700 font-medium">
          {navList.map((link) => (
            <Link
              to={link.href}
              key={link.href}
              className="block hover:text-sky-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
