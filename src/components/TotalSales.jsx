/* eslint-disable react/prop-types */
/**
 * A React component that displays a pie chart of total sales by category.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.theme - The theme of the component, either "light" or "dark".
 * @returns {JSX.Element} A pie chart visualization of sales data along with a legend.
 */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TotalSales = ({ theme }) => {
  
  const data = [
    {
      name: "Direct",
      value: 300.56,
      color: theme === "dark" ? "#C6C7F8" : "#1C1C1C",
    },
    {
      name: "Affiliate",
      value: 135.18,
      color: "#BAEDBD"
    },
    {
      name: "Sponsored",
      value: 154.02,
      color: "#95A4FC"
    },
    {
      name: "E-mail",
      value: 48.96,
      color: "#B1E3FF"
    },
  ];

  const containerClass =
    theme === "light" ? "bg-[#F7F9FB] text-black" : "bg-[#282828] text-white";
  
  const labelColor =
    theme === "light" ? "#282828" : "white";

  return (
    <div className={`w-full lg:max-w-md mx-auto rounded-2xl p-6 h-fit font-inter ${containerClass} border dark:border-none`}>
      <h2 className="text-sm font-semibold mb-4">Total Sales</h2>
      <ResponsiveContainer width="100%" height={210}>
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            outerRadius="80%"
            dataKey="value"
            innerRadius="55%"
            paddingAngle={2}
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2 text-xs font-normal font-inter">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span style={{ color: labelColor }}>{item.name}</span>
            </div>
            <span style={{ color: labelColor }}>${item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSales;
