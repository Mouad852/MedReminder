import logo from "../assets/Logo.png";

const LightLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img className="w-8 h-8" src={logo} alt="Logo" />
      <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text">
        MedReminder
      </span>
    </div>
  );
};

export default LightLogo;
