import { Menu, PhoneCall, X, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./DarkLogo";
import { NavLink } from "react-router-dom";
import NotificationsDropdown from "../components/NotificationsDropdown"; // adjust path
import { getNotifications } from "../services/notificationService";

const navList = [
  { href: "/home", label: "Home" },
  { href: "/medications", label: "Medications" },
  { href: "/appointments", label: "Appointments" },
  { href: "/profile", label: "Profile" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Fetch notifications when component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(); // add userId param if needed
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <header className="scroll-mt-20 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium ml-70">
          {navList.map((link) => (
            <NavLink
              to={link.href}
              key={link.href}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-sky-600 font-semibold"
                    : "text-gray-700 hover:text-sky-600"
                }`
              }
              end
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: Phone Call, Book Button, Notifications */}
        <div className="hidden md:flex items-center space-x-4">
          <PhoneCall className="text-sky-600" />
          <NavLink
            to="/book"
            className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition text-sm"
          >
            Book Appointment
          </NavLink>
        </div>

        {/* Notifications Bell (desktop only) */}
        <div className="relative ml-4 hidden md:block">
          <Bell
            className="text-gray-700 hover:text-sky-600 cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          {showNotifications && (
            <NotificationsDropdown
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </div>

        {/* Mobile Right Side: Bell + Menu */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Bell (mobile only) */}
          <div className="relative">
            <Bell
              className="text-gray-700 hover:text-sky-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            {showNotifications && (
              <NotificationsDropdown
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}
          </div>

          {/* Menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-gray-700 hover:cursor-pointer" />
            ) : (
              <Menu className="text-gray-700 hover:cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3 text-gray-700 font-medium">
          {navList.map((link) => (
            <NavLink
              to={link.href}
              key={link.href}
              className={({ isActive }) =>
                `block transition ${
                  isActive
                    ? "text-sky-600 font-semibold"
                    : "text-gray-700 hover:text-sky-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
