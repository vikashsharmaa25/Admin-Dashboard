/**
 * Main application component that sets up the router and layout.
 * It manages theme toggling and the state of sidebars.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * );
 */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import OrdersListPage from "./pages/OrderListPage";
import RightSidebar from "./components/RightSidebar";

const App = () => {
  /**
   * State to manage the current theme (light/dark).
   * @type {string}
   */
  const [isToggle, setIsToggle] = useState(
    localStorage.getItem("theme") || "light"
  );
  
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

  /**
   * Effect that updates local storage whenever the theme changes.
   */
  useEffect(() => {
    localStorage.setItem("theme", isToggle);
  }, [isToggle]);

  /**
   * Toggles the visibility of the right sidebar.
   */
  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  /**
   * Toggles the visibility of the left sidebar.
   */
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  // Determines the CSS class based on the current theme.
  const themeClass = isToggle === "light" ? "bg-white text-black" : "bg-[#1C1C1C] text-white";

  return (
    <Router>
      <div className={`App flex min-h-screen ${themeClass}`}>
        {/* Sidebar */}
        <Sidebar
          theme={isToggle}
          toggleRightSidebar={toggleRightSidebar}
          rightSidebarOpen={rightSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex flex-col flex-grow relative">
          <Header
            toggle={isToggle}
            toggled={setIsToggle}
            toggleRightSidebar={toggleRightSidebar}
            rightSidebarOpen={rightSidebarOpen}
            toggleLeftSidebar={toggleLeftSidebar}
            leftSidebarOpen={leftSidebarOpen}
          />
          <div className="">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex-grow">
                    <Dashboard themeClass={isToggle} />
                  </div>
                }
              />

              <Route
                path="/orders"
                element={
                  <div className="content flex-grow">
                    <OrdersListPage
                      theme={isToggle}
                      setLeftSidebarOpen={setLeftSidebarOpen}
                    />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>

        <RightSidebar
          theme={isToggle}
          toggleLeftSidebar={toggleLeftSidebar}
          leftSidebarOpen={leftSidebarOpen}
          setLeftSidebarOpen={setLeftSidebarOpen}
        />
      </div>
    </Router >
  );
};

export default App;