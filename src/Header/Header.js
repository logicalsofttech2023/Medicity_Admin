import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import logo1 from "./logo - Copy.png";

const Header = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/home" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/home" className="logo logo-small">
          <img src={logo1} alt="Logo" width={30} height={30} />
        </Link>
      </div>
      
      {/* Sidebar Toggle Button */}
      {/* <a 
        href="#!" 
        className="toggle-btn" 
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        <i className={`fe ${isMobileSidebarOpen ? 'fe-x' : 'fe-text-align-left'}`} />
      </a> */}
      
      {/* Search Bar */}
      <div className="top-nav-search">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          />
          <button className="btn" type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
      
      {/* Mobile Menu Toggle - Visible only on mobile */}
      <a 
        className="mobile_btn" 
        id="mobile_btn"
        onClick={toggleMobileSidebar}
        aria-label="Mobile menu toggle"
      >
        <i className="fa fa-bars" />
      </a>
      
      {/* Header Right Menu */}
      <ul className="nav user-menu">
        {/* Notifications */}
        <li className="nav-item dropdown noti-dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fe fe-bell" />
            <span className="badge rounded-pill">3</span>
          </a>
          <div className="dropdown-menu notifications dropdown-menu-end">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="#!" className="clear-noti">Clear All</a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="#!">
                    <div className="notify-block d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="assets/img/doctors/doctor-thumb-01.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Dr. Ruby Perrin</span> Schedule{" "}
                          <span className="noti-title">her appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#!">
                    <div className="notify-block d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="assets/img/patients/patient1.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Charlene Reed</span> has
                          booked her appointment to{" "}
                          <span className="noti-title">Dr. Ruby Perrin</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="#!">
                    <div className="notify-block d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="assets/img/patients/patient2.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Travis Trimble</span>{" "}
                          sent a amount of $210 for his{" "}
                          <span className="noti-title">appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#!">View all Notifications</a>
            </div>
          </div>
        </li>
        
        {/* User Menu */}
        <li className="nav-item dropdown has-arrow">
          <a
            href="#!"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src="assets/img/profiles/avatar-01.jpg"
                width={31}
                alt="Ryan Taylor"
              />
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src="assets/img/profiles/avatar-01.jpg"
                  alt="User Image"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>Ryan Taylor</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <Link className="dropdown-item" to="/Profile" onClick={() => window.innerWidth <= 992 && toggleMobileSidebar()}>
              My Profile
            </Link>
            <Link className="dropdown-item" to="/Settings" onClick={() => window.innerWidth <= 992 && toggleMobileSidebar()}>
              Settings
            </Link>
            <button className="dropdown-item" onClick={Logout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;