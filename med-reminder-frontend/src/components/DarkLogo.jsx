import logo from "../assets/Logo.png";

const DarkLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img className="w-8 h-8" src={logo} alt="Logo" />
      <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-black text-transparent bg-clip-text">
        MedReminder
      </span>
    </div>
  );
};

export default DarkLogo;
