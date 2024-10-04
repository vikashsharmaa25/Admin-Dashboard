/**
 * A React component that displays a sidebar navigation menu.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.theme - The theme of the sidebar, either "light" or "dark".
 * @param {boolean} props.rightSidebarOpen - Indicates if the right sidebar is open.
 * @param {function} props.toggleRightSidebar - Function to toggle the sidebar's visibility.
 * @returns {JSX.Element|null} The sidebar navigation component or null if not visible.
 */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  PiChartPieSliceDuotone,
  PiShoppingBagOpenDuotone,
  PiFolderDuotone,
  PiBookOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiIdentificationCardDuotone,
  PiUsersThreeDuotone,
  PiNotebookDuotone,
  PiChatsTeardropDuotone,
  PiDotOutlineFill,
  PiSidebarDuotone,
  PiListBulletsDuotone,
} from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ theme, rightSidebarOpen, toggleRightSidebar }) => {
  const [openSections, setOpenSections] = useState({
    favorites: true,
    dashboards: true,
    pages: false,
    userProfile: true,
  });
  const [selectedItem, setSelectedItem] = useState("default");
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  /**
 * Effect to handle window resize events and update the mobile state.
 * 
 * This effect sets the `isMobile` state based on the window's inner width. 
 * It adds an event listener to update this state whenever the window is resized.
 * 
 * @function useEffect
 * @returns {void}
 */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
 * Toggles the open/closed state of a specified section in the sidebar.
 * 
 * @function toggleSection
 * @param {string} section - The key of the section to toggle.
 * @returns {void}
 */
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  /**
 * Handles the click event on a sidebar item and updates the selected item state.
 * 
 * @function handleItemClick
 * @param {string} itemKey - The key of the item that was clicked.
 * @returns {void}
 */
  const handleItemClick = (itemKey) => {
    setSelectedItem(itemKey);
  };

  /**
 * Toggles the visibility of the right sidebar.
 * 
 * This function calls the `toggleRightSidebar` prop with the new visibility state.
 * 
 * @function toggleSidebar
 * @returns {void}
 */
  const toggleSidebar = () => {
    toggleRightSidebar(!rightSidebarOpen);
    console.log(!rightSidebarOpen);
  };

  const menuItems = [
    {
      label: (
        <div className="flex justify-evenly items-center float-right w-full gap-2">
          <h1 className={`font-normal text-sm font-inter ${theme === "light" ? "text-[#1C1C1C66]" : "text-[#FFFFFF66]"}`}>Favorites</h1>
          <h1 className={`font-normal text-sm font-inter ${theme === "light" ? "text-[#1C1C1C33]" : "text-[#FFFFFF33]"}`}>Recently</h1>
        </div>
      ),
      key: "favorites",
      items: [
        {
          label: "Overview",
          key: "overview",
          icon: <PiDotOutlineFill size={16} className={`${theme === "light" ? "text-[#1C1C1C33]" : "text-[#FFFFFF33]"}`} />,
        },
        {
          label: "Projects",
          key: "projects",
          icon: <PiDotOutlineFill size={16} className={`${theme === "light" ? "text-[#1C1C1C33]" : "text-[#FFFFFF33]"}`} />,
        },
      ],
    },
    {
      label: "Dashboards",
      key: "dashboards",
      items: [
        {
          label: "Default",
          key: "default",
          icon: <PiChartPieSliceDuotone size={20} />,
          link: "/",
        },
        {
          label: "Order List",
          key: "orderlist",
          icon: <PiListBulletsDuotone size={20} />,
          link: "/orders",
        },
        {
          label: "eCommerce",
          key: "ecommerce",
          icon: <PiShoppingBagOpenDuotone size={20} />,
          subItems: [
            "Overview",
            "Projects",
            "Campaigns",
            "Documents",
            "Followers",
          ],
        },
        {
          label: "Projects",
          key: "dashboard-projects",
          icon: <PiFolderDuotone size={20} />,
          subItems: [
            "demo 1",
            "demo 2",
            "demo 3",
            "demo 4",
            "demo 5"
          ],
        },
        {
          label: "Online Courses",
          key: "online-courses",
          icon: <PiBookOpenDuotone size={20} />,
          subItems: [
            "Overview",
            "Projects",
            "Campaigns",
            "Documents",
            "Followers",
          ],
        },
      ],
    },
    {
      label: "Pages",
      key: "pages",
      items: [
        {
          label: "User Profile",
          key: "user-profile",
          icon: <PiIdentificationBadgeDuotone size={20} />,
          subItems: [
            "Overview",
            "Projects",
            "Campaigns",
            "Documents",
            "Followers",
          ],
        },
        {
          label: "Account",
          key: "account",
          icon: <PiIdentificationCardDuotone size={20} />,
          subItems: [
            "demo 1",
            "demo 2",
            "demo 3",
            "demo 4",
            "demo 5"
          ],
        },
        {
          label: "Corporate",
          key: "corporate",
          icon: <PiUsersThreeDuotone size={20} />,
          subItems: [
            "demo 1",
            "demo 2",
            "demo 3",
            "demo 4",
            "demo 5"
          ],
        },
        {
          label: "Blog",
          key: "blog",
          icon: <PiNotebookDuotone size={20} />,
          subItems: [
            "demo 1",
            "demo 2",
            "demo 3",
            "demo 4",
            "demo 5"
          ],
        },
        {
          label: "Social",
          key: "social",
          icon: <PiChatsTeardropDuotone size={20} />,
          subItems: [
            "demo 1",
            "demo 2",
            "demo 3",
            "demo 4",
            "demo 5"
          ],
        },
      ],
    },
  ];

  /**
* Renders a list of menu items with potential sub-items.
* 
* @function renderItems
* @param {Array} items - The array of menu items to render.
* @param {number} [level=0] - The current nesting level of the items.
* @returns {JSX.Element[]} An array of rendered menu items.
*/
  const renderItems = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.key} className={`ml-${level * 4}`}>
        <div className={`flex items-center py-[6px] px-4 cursor-pointer w-[95%] mx-auto rounded-lg relative 
        ${item.link && location.pathname === item.link
            ? theme === "light"
              ? "bg-gray-200 "
              : "bg-[#282828]  "
            : ""
          } ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-[#383838]"}`}
          onClick={() => {
            handleItemClick(item.key);
            if (item.items || item.subItems) toggleSection(item.key);
          }}>

          {item.link && location.pathname === item.link ? (
            theme === "light" ? (
              <div className="w-1 h-4 rounded-md absolute left-2 bg-black"></div>
            ) : (
              <div className="w-1 h-4 rounded-md absolute left-2 bg-gray-100"></div>
            )
          ) : (
            ""
          )}

          {(item.items || item.subItems) &&
            (openSections[item.key] ? (
              <FiChevronDown className="" />
            ) : (
              <FiChevronRight className="" />
            ))}

          {item.icon && <span className="mr-3">{item.icon}</span>}

          {item.link ? (
            <Link
              to={item.link}
              className={`flex-grow ${theme === "light" ? "text-gray-800" : "text-gray-300"
                } text-sm font-inter font-medium`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`flex-grow ${theme === "light" ? "text-gray-800" : "text-gray-300"
                } text-sm font-inter font-medium`}
            >
              {item.label}
            </span>
          )}

        </div>

        {openSections[item.key] && item.items && (
          <div className="ml-4">
            {renderItems(item.items, level + 1)}
          </div>
        )}

        {openSections[item.key] && item.subItems && (
          <div className="ml-10">
            {item.subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="py-1 flex items-center">
                <span className={
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }>
                  {subItem}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {rightSidebarOpen && (
        <div className={`min-w-56 border-r ${theme === "light"
          ? "bg-white text-gray-700"
          : "bg-[#1C1C1C] text-gray-300 border-[#282828]"
          } border-[#1C1C1C1A] text-sm ${isMobile ? "absolute top-0 left-0 z-50" : "relative"
          }`}>
          <div className="flex justify-between items-center">
            <div className="p-4 flex items-center space-x-2 ">
              <div
                className={`w-6 h-6 rounded-full ${theme === "light" ? "bg-gray-300" : "bg-gray-700 border-l"
                  }`}>
                <img src="/Images/ByeWind.png" alt="" />
              </div>

              <span className={`font-medium ${theme === "light" ? "text-gray-800" : "text-gray-300"
                  } text-sm font-inter`}>
                ByeWind
              </span>
            </div>
            {isMobile && (
              <PiSidebarDuotone
                className="cursor-pointer mr-4"
                size={20}
                onClick={toggleSidebar}
              />
            )}
          </div>

          <div className="py-2">
            {menuItems.map((section) => (
              <div key={section.key} className="mb-4">
                <div className={`px-4 py-2 text-sm font-medium capitalize flex justify-between items-center ${theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}>
                  {section.label}
                </div>
                {renderItems(section.items)}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;