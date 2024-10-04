/**
 * ProjectionsChart component displays revenue by location in a visually appealing way.
 *
 * This component uses Framer Motion for animations and accepts a `theme` prop to
 * adjust its appearance based on light or dark mode.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.theme - The theme for the chart; can be either "light" or "dark".
 * 
 * @returns {JSX.Element} A rendered ProjectionsChart component containing a bar chart
 *                        representation of revenue by location.
 *
 */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const locations = [
  { name: "New York", revenue: 72000 },
  { name: "San Francisco", revenue: 39000 },
  { name: "Sydney", revenue: 25000 },
  { name: "Singapore", revenue: 61000 },
];

const maxRevenue = Math.max(...locations.map((location) => location.revenue));

const ProjectionsChart = ({ theme }) => {

  const chartBg = theme === "light" ? "bg-[#F7F9FB]" : "bg-[#282828]";
  const textColor = theme === "light" ? "text-black" : "text-white";
  const barColor = theme === "light" ? "bg-[#A8C5DA]" : "bg-[#4B5563]";

  // Variants for the container animation in the ProjectionsChart component.
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Variants for individual item animations in the ProjectionsChart component.
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Variants for the bar animations in the ProjectionsChart component.
  const barVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${(custom / maxRevenue) * 100}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className={`w-full xl:max-w-sm mx-auto rounded-2xl border dark:border-none p-4 h-fit font-inter ${chartBg}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-2 sm:p-4 md:p-6">
        <motion.h2
          className={`text-sm sm:text-base font-semibold font-inter mb-4 text-center ${textColor}`}
          variants={itemVariants}
        >
          Revenue by Location
        </motion.h2>
        <motion.div className="mb-3 relative" variants={itemVariants}>
          <img
            src="/Images/WorldMap.png"
            alt="World Map"
            className="w-full h-auto"
          />
        </motion.div>
        <div className="space-y-2 sm:space-y-3">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              className="flex-col justify-between items-center"
              variants={itemVariants}
            >
              <div className="w-full flex items-center justify-between">
                <span
                  className={`text-xs sm:text-sm font-inter font-normal leading-[18px] ${textColor}`}
                >
                  {location.name}
                </span>
                <span
                  className={`ml-2 text-xs sm:text-sm font-inter font-normal leading-[18px] ${textColor}`}
                >
                  {`${(location.revenue / 1000).toFixed(0)}K`}
                </span>
              </div>
              <div className="flex-grow my-1 sm:my-2">
                <motion.div
                  className={`${barColor} h-[2px] sm:h-[3px]`}
                  variants={barVariants}
                  custom={location.revenue}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectionsChart;
