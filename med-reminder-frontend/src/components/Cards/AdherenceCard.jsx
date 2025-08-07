import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

const data = [
  { week: "Week 1", rate: 100 },
  { week: "Week 2", rate: 50 },
  { week: "Week 3", rate: 85 },
  { week: "Week 4", rate: 70 },
];

const AdherenceCard = () => {
  return (
    <div className="bg-blue-300  p-4 rounded-xl w-full mt-7">
      {/* Header */}
      <div className="flex items-center gap-2 bg-blue-400 text-black p-2 rounded-t-xl">
        <BarChart3 className="w-5 h-5" />
        <h2 className="text-lg font-bold">Adherence Rate</h2>
      </div>

      {/* Rate Text */}
      <div className="p-4 pt-2">
        <p className="text-3xl font-extrabold">85%</p>
        <p className="text-sm text-gray-600 mb-4">Last 30 days</p>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week">
              <Label value="Weeks" offset={-20} position="insideBottom" />
            </XAxis>
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />

            <Bar dataKey="rate" fill="#1d4ed8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Button */}
      <div className="flex justify-end px-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          View Adherence Rate
        </button>
      </div>
    </div>
  );
};

export default AdherenceCard;
