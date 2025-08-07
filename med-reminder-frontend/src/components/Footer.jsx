import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Pill,
  CalendarClock,
  AlarmClock,
} from "lucide-react";
import Logo from "./DarkLogo"; // Make sure path is correct
import LightLogo from "./LightLogo";

const Footer = () => {
  return (
    <footer className="bg-[#132144] text-white py-10">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex justify-center mb-10">
          <LightLogo />
        </div>
        <div className="grid gap-10 md:grid-cols-3 text-sm text-blue-100">
          {/* Contact Section */}
          <div className="bg-[#172b52] p-6 rounded-xl space-y-4">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <Phone className="text-blue-400 w-5 h-5" />
              Get in Touch with us
            </h3>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-sky-400" />
              <span>+212 123-456789</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>MedReminder@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Number, Street, City, Country</span>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-[#172b52] p-6 rounded-xl space-y-4">
            <h3 className="font-semibold text-white text-lg">🩺 Services</h3>
            <div className="flex items-center space-x-3">
              <Pill className="w-4 h-4 text-sky-400" />
              <span>Medications</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlarmClock className="w-4 h-4 text-sky-400" />
              <span>Reminders</span>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarClock className="w-4 h-4 text-sky-400" />
              <span>Appointments</span>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-[#172b52] p-6 rounded-xl space-y-4">
            <h3 className="font-semibold text-white text-lg">🌐 Follow Us</h3>
            <div className="flex items-center space-x-3">
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>MedReminder Facebook</span>
            </div>
            <div className="flex items-center space-x-3">
              <Instagram className="w-4 h-4 text-blue-400" />
              <span>MedReminder Instagram</span>
            </div>
            <div className="flex items-center space-x-3">
              <Twitter className="w-4 h-4 text-sky-400" />
              <span>MedReminder X</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
