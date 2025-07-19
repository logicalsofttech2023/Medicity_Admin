import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
  
    <div className="sidebar" id="sidebar" style={{ height: "100vh", overflowY: "auto", marginBottom: "20px" }}>
    <div className="sidebar-inner slimscroll">
      <div id="sidebar-menu" className="sidebar-menu">
        <ul>
          <li className="menu-title"> 
            <span>Main</span>
          </li>
          <li  className={isActive("/home") ? "active" : ""}> 
            <Link to="/home"><i className="fe fe-home" /> <span>Dashboard</span></Link>
          </li>
          <li className={isActive("/Appointmentlist") ? "active" : ""}> 
            <Link to="/Appointmentlist"><i className="fe fe-layout" /> <span>Appointments</span></Link>
          </li>
          
          <li className={isActive("/Bookappointment") ? "active" : ""}> 
            <Link to="/Bookappointment"><i className="fe fe-layout" /> <span>Book Appointments</span></Link>
          </li>
          <li className={isActive("/Prescription") ? "active" : ""}> 
            <Link to="/Prescription"><i className="fe fe-layout" /> <span>Prescription</span></Link>
          </li>
          <li className={isActive("/Checkuproutinemenwomen") ? "active" : ""}> 
            <Link to="/Checkuproutinemenwomen"><i className="fe fe-user-plus" /> <span>Checkup Routine</span></Link>
          </li>
          <li className={isActive("/Doctorscuratedhealthcheckuppackages") ? "active" : ""}> 
            <Link to="/Doctorscuratedhealthcheckuppackages"><i className="fe fe-user-plus" /> <span>Doctors Curated</span></Link>
          </li>
          <li className={isActive("/Addpackage") ? "active" : ""}> 
            <Link to="/Addpackage"><i className="fe fe-user-plus" /> <span>Add Package</span></Link>
          </li>
          <li className={isActive("/Packagelist") ? "active" : ""}> 
            <Link to="/Packagelist"><i className="fe fe-user-plus" /> <span>All Package</span></Link>
          </li>
          
          
          <li className={isActive("/Patientlist") ? "active" : ""}> 
            <Link to="/Patientlist"><i className="fe fe-user" /> <span>Patients</span></Link>
          </li>
          {/* <li className={isActive("/Specialities") ? "active" : ""}> 
            <Link to="/Specialities"><i className="fe fe-users" /> <span>Specialities</span></Link>
          </li> */}

          <li className={isActive("/blogCategory") ? "active" : ""}> 
            <Link to="/blogCategory"><i className="fe fe-users" /> <span>Add Blog Category</span></Link>
          </li>

          <li className={isActive("/blogList") ? "active" : ""}> 
            <Link to="/blogList"><i className="fe fe-users" /> <span>Blog List</span></Link>
          </li>

          <li className={isActive("/Reviews") ? "active" : ""}> 
            <Link to="/Reviews"><i className="fe fe-star-o" /> <span>Reviews</span></Link>
          </li>
          <li className={isActive("/Transactionslist") ? "active" : ""}> 
            <Link to="/Transactionslist"><i className="fe fe-activity" /> <span>Transactions</span></Link>
          </li>
          <li className={isActive("/Settings") ? "active" : ""}> 
            <Link to="/Settings"><i className="fe fe-vector" /> <span>Settings</span></Link>
          </li>
          <li className={isActive("/Invoicereport") ? "active" : ""}> 
            <Link to="/Invoicereport"><i className="fe fe-document" /> <span>Reports/Invoice</span></Link>
          </li>
          
         
          <li className={isActive("/Profile") ? "active" : ""}> 
            <Link to="/Profile"><i className="fe fe-user-plus" /> <span>Profile</span></Link>
          </li>
        
        </ul>
      </div>
    </div>
  </div>
  
 
  )
}

export default Sidebar
