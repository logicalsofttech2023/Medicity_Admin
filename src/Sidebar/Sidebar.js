import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiPlusCircle,
  FiFileText,
  FiClipboard,
  FiList,
  FiUserCheck,
  FiPackage,
  FiUsers,
  FiStar,
  FiActivity,
  FiSettings,
  FiFile,
  FiUser,
} from "react-icons/fi";

const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Close sidebar when clicking on a link in mobile view
  const handleLinkClick = () => {
    if (window.innerWidth <= 992) {
      toggleMobileSidebar();
    }
  };

  return (
    <div
      className={`sidebar ${isMobileSidebarOpen ? "active" : ""}`}
      id="sidebar"
      style={{ height: "100vh", overflowY: "auto", marginBottom: "20px" }}
    >
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>

            <li className={isActive("/home") ? "active" : ""}>
              <Link to="/home" onClick={handleLinkClick}>
                <FiHome /> <span>Dashboard</span>
              </Link>
            </li>

            <li className={isActive("/Patientlist") ? "active" : ""}>
              <Link to="/Patientlist" onClick={handleLinkClick}>
                <FiUserCheck /> <span>Patients</span>
              </Link>
            </li>

            <li className={isActive("/Appointmentlist") ? "active" : ""}>
              <Link to="/Appointmentlist" onClick={handleLinkClick}>
                <FiCalendar /> <span>Appointments</span>
              </Link>
            </li>

            <li className={isActive("/Bookappointment") ? "active" : ""}>
              <Link to="/Bookappointment" onClick={handleLinkClick}>
                <FiPlusCircle /> <span>Book Appointments</span>
              </Link>
            </li>

            <li className={isActive("/Prescription") ? "active" : ""}>
              <Link to="/Prescription" onClick={handleLinkClick}>
                <FiFileText /> <span>Prescription</span>
              </Link>
            </li>

            <li className={isActive("/Checkuproutinemenwomen") ? "active" : ""}>
              <Link to="/Checkuproutinemenwomen" onClick={handleLinkClick}>
                <FiClipboard /> <span>Checkup Routine</span>
              </Link>
            </li>

            <li
              className={
                isActive("/Doctorscuratedhealthcheckuppackages") ? "active" : ""
              }
            >
              <Link
                to="/Doctorscuratedhealthcheckuppackages"
                onClick={handleLinkClick}
              >
                <FiList /> <span>Doctors Curated</span>
              </Link>
            </li>

            <li className={isActive("/Addpackage") ? "active" : ""}>
              <Link to="/Addpackage" onClick={handleLinkClick}>
                <FiPlusCircle /> <span>Add Package</span>
              </Link>
            </li>

            <li className={isActive("/Packagelist") ? "active" : ""}>
              <Link to="/Packagelist" onClick={handleLinkClick}>
                <FiPackage /> <span>All Package</span>
              </Link>
            </li>

            

            <li className={isActive("/blogCategory") ? "active" : ""}>
              <Link to="/blogCategory" onClick={handleLinkClick}>
                <FiList /> <span>Add Blog Category</span>
              </Link>
            </li>

            <li className={isActive("/blogList") ? "active" : ""}>
              <Link to="/blogList" onClick={handleLinkClick}>
                <FiFileText /> <span>Blog List</span>
              </Link>
            </li>

            {/* <li className={isActive("/Reviews") ? "active" : ""}>
              <Link to="/Reviews" onClick={handleLinkClick}>
                <FiStar /> <span>Reviews</span>
              </Link>
            </li>

            <li className={isActive("/Transactionslist") ? "active" : ""}>
              <Link to="/Transactionslist" onClick={handleLinkClick}>
                <FiActivity /> <span>Transactions</span>
              </Link>
            </li> */}

            <li className={isActive("/Settings") ? "active" : ""}>
              <Link to="/Settings" onClick={handleLinkClick}>
                <FiSettings /> <span>Settings</span>
              </Link>
            </li>

            {/* <li className={isActive("/Invoicereport") ? "active" : ""}>
              <Link to="/Invoicereport" onClick={handleLinkClick}>
                <FiFile /> <span>Reports/Invoice</span>
              </Link>
            </li> */}

            <li className={isActive("/Profile") ? "active" : ""}>
              <Link to="/Profile" onClick={handleLinkClick}>
                <FiUser /> <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
