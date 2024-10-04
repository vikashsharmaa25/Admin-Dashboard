/**
 * Header component renders the top navigation bar for the dashboard.
 * It includes buttons for toggling sidebars, changing themes, and a search input.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.toggle - A string representing the current theme ("light" or "dark").
 * @param {Function} props.toggled - A function to change the theme.
 * @param {Function} props.toggleRightSidebar - A function to toggle the right sidebar visibility.
 * @param {boolean} props.rightSidebarOpen - A boolean indicating if the right sidebar is open.
 * @param {Function} props.toggleLeftSidebar - A function to toggle the left sidebar visibility.
 * @param {boolean} props.leftSidebarOpen - A boolean indicating if the left sidebar is open.
 *
 * @returns {JSX.Element} A rendered Header component containing navigation elements.
 *
 */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  PiStarDuotone,
  PiSidebarDuotone,
  PiSunDuotone,
  PiClockCounterClockwiseDuotone,
  PiBellDuotone,
  PiCommand
} from "react-icons/pi";
import { RxSlash } from "react-icons/rx";

const Header = ({
  toggle,
  toggled,
  toggleRightSidebar,
  rightSidebarOpen,
  toggleLeftSidebar,
  leftSidebarOpen,
}) => {

  const [isStarActive, setIsStarActive] = useState(false);
  const [isStarAnimating, setIsStarAnimating] = useState(false);
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const [isBellAnimating, setIsBellAnimating] = useState(true);

  /**
 * useEffect to handle the bell animation on component mount.
 * It sets the bell animation state to true for 1 second.
 * 
 * @effect
 */
  useEffect(() => {
    setIsBellAnimating(true);
    const timer = setTimeout(() => setIsBellAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  /**
 * Toggles the star icon state and triggers animation.
 * The star state is updated and the animation is reset after a delay.
 *
 * @function
 * @returns {void}
 */
  const toggleStar = () => {
    setIsStarActive(!isStarActive);
    setIsStarAnimating(true);
    setIsStarActive(!isStarActive);
    setTimeout(() => setIsStarAnimating(false), 300);
  };

  /**
 * Toggles the visibility of the right sidebar and logs its state.
 *
 * @function
 * @returns {void}
 */
  const toggleSidebar = () => {
    toggleRightSidebar(!rightSidebarOpen);
    console.log(!rightSidebarOpen);
  };

  /**
 * Toggles the visibility of the left sidebar and logs its state.
 *
 * @function
 * @returns {void}
 */
  const toggleRSideBar = () => {
    toggleLeftSidebar(!leftSidebarOpen);
    console.log(!leftSidebarOpen);
  };

  /**
 * Toggles the theme between light and dark modes,
 * updates the theme state, and triggers an animation.
 *
 * @function
 * @returns {void}
 */
  const handleToggle = () => {
    setIsThemeAnimating(true);
    const newTheme = toggle === "light" ? "dark" : "light";
    toggled(newTheme);
    setTimeout(() => setIsThemeAnimating(false), 300);
    console.log("Theme toggled to:", newTheme);
  };

  /**
 * Handles the click event on the notification bell,
 * triggers animation, and logs the click action.
 *
 * @function
 * @returns {void}
 */
  const handleBellClick = () => {
    setIsBellAnimating(true);
    setTimeout(() => setIsBellAnimating(false), 1000);
    console.log("Notification bell clicked");
  };

  return (
    <header className={`flex justify-between items-center px-6 py-2 border-b ${toggle === "light" ? "bg-white" : "bg-[#1C1C1C] border-[#282828]"}`}>
      <div className="flex items-center">
        <PiSidebarDuotone
          className="cursor-pointer mr-4"
          size={20}
          onClick={toggleSidebar}
        />
        <div className={`cursor-pointer transition-all duration-300 ${isStarAnimating ? 'scale-125' : 'scale-100'}`}>
          <PiStarDuotone
            className={`transition-colors duration-300 ${isStarActive ? "text-yellow-500" : ""}`}
            size={20}
            onClick={toggleStar}
          />
        </div>
        <h1 className={`text-sm font-normal font-inter mr-4 ml-4 ${toggle === "light" ? "text-[#1C1C1C66]" : "text-gray-400"}`}>
          Dashboards
        </h1>
        <span className={`${toggle === "light" ? "text-[#1C1C1C33]" : "text-gray-600"} text-sm font-normal font-inter`}>
          /
        </span>
        <span className={`ml-4 text-sm font-normal font-inter ${toggle === "light" ? "text-[#1C1C1C]" : "text-white"}`}>
          Default
        </span>
      </div>

      <div className="flex-grow mx-4 hidden sm:block">
        <div className="relative float-right w-fit">
          <input
            type="text"
            placeholder="Search"
            className={`float-right pl-10 pr-4 py-2 ${toggle === "light"
              ? "bg-[#1C1C1C0D] text-[#1C1C1C33]"
              : "bg-gray-950 text-gray-200"
              } text-sm font-normal font-inter rounded-lg focus:outline-none focus:ring-1 ${toggle === "light" ? "focus:ring-gray-400" : "focus:ring-gray-500"
              }`}
          />
          <FiSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${toggle === "light" ? "text-gray-400" : "text-gray-300"}`}
            size={16}
          />

          <PiCommand
            size={20}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${toggle === "light" ? "text-gray-400" : "text-gray-300"}`} />

          <RxSlash
            size={18}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${toggle === "light" ? "text-gray-400" : "text-gray-300"}`} />
        </div>
      </div>

      <div className="flex items-center space-x-4">

        <div className={`cursor-pointer transition-all duration-300 ${isThemeAnimating ? 'rotate-180' : 'rotate-0'}`}>
          <PiSunDuotone
            className="cursor-pointer"
            size={20}
            onClick={handleToggle}
          />
        </div>

        <PiClockCounterClockwiseDuotone
          className="cursor-pointer"
          size={20} />

        <div className={`cursor - pointer ${isBellAnimating ? 'animate-jiggle' : ''}`}>
          <PiBellDuotone
            size={20}
            onClick={handleBellClick} />
        </div>

        <PiSidebarDuotone
          className="cursor-pointer"
          size={20}
          onClick={toggleRSideBar}
        />
      </div>
    </header>
  );
};

export default Header;
