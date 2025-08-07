import bgImage from "../assets/bg-image.jpg";
import AdherenceCard from "./Cards/AdherenceCard";
import AppointmentsCard from "./Cards/AppointmentsCard";
import MedicationsCard from "./Cards/MedicationsCard";

const Dashboard = () => {
  const userName = "Mouad";

  return (
    <div className="relative min-h-screen">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      {/* Content layer */}
      <div className="relative z-10 p-8">
        <h1 className="text-2xl sm:text-4xl lg:text-3xl font-bold text-sky-900 leading-tight mb-20">
          Welcome back,{" "}
          <span className="font-bold bg-gradient-to-r from-blue-500 to-sky-900 text-transparent bg-clip-text">
            {userName}
          </span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MedicationsCard />
          <AppointmentsCard />
        </div>
        <div>
          <AdherenceCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
