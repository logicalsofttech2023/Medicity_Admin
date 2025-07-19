import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Protect from "./Components/Protect";
import Login from "./Auth/Login";
import Appointmentlist from "./Components/Appointmentlist";
import Specialities from "./Components/Specialities";
import Patientlist from "./Components/Patientlist";
import Reviews from "./Components/Reviews";
import Transactionslist from "./Components/Transactionslist";
import Settings from "./Components/Settings";
import Invoicereport from "./Components/Invoicereport";
import Profile from "./Components/Profile";
import Error from "./Components/Error";
import Doctorscuratedhealthcheckuppackages from "./Components/Doctorscuratedhealthcheckuppackages";
import Addpackage from "./Components/Addpackage";
import Packagelist from "./Components/Packagelist";
import PackageDetails from "./Components/PackageDetails";
import Checkuproutinemenwomen from "./Components/Checkuproutinemenwomen";
import AppointmentDetails from "./Components/AppointmentDetails";
import Bookappointment from "./Components/Bookappointment";
import BookappointmentDetails from "./Components/BookappointmentDetails";
import Prescription from "./Components/Prescription";
import BlogCategory from "./Components/BlogCategory";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BlogList from "./Components/BlogList";
import { useEffect, useState } from "react";


function App() {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div>
       {location.pathname !== "/" && location.pathname !== "/Login" && (
        <>
          <Header 
            isMobileSidebarOpen={isMobileSidebarOpen}
            toggleMobileSidebar={toggleMobileSidebar} 
          />
          <Sidebar 
            isMobileSidebarOpen={isMobileSidebarOpen}
            toggleMobileSidebar={toggleMobileSidebar} 
          />
          {isMobileSidebarOpen && (
            <div 
              className="sidebar-overlay" 
              onClick={toggleMobileSidebar}
            />
          )}
        </>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protect ComponentName={Home} />}></Route>
        <Route
          path="/Appointmentlist"
          element={<Protect ComponentName={Appointmentlist} />}
        ></Route>
        <Route
          path="/Specialities"
          element={<Protect ComponentName={Specialities} />}
        ></Route>
        <Route
          path="/Patientlist"
          element={<Protect ComponentName={Patientlist} />}
        ></Route>
        <Route
          path="/Reviews"
          element={<Protect ComponentName={Reviews} />}
        ></Route>
        <Route
          path="/Transactionslist"
          element={<Protect ComponentName={Transactionslist} />}
        ></Route>
        <Route
          path="/Settings"
          element={<Protect ComponentName={Settings} />}
        ></Route>
        <Route
          path="/Invoicereport"
          element={<Protect ComponentName={Invoicereport} />}
        ></Route>
        <Route
          path="/Profile"
          element={<Protect ComponentName={Profile} />}
        ></Route>
         <Route
          path="/Doctorscuratedhealthcheckuppackages"
          element={<Protect ComponentName={Doctorscuratedhealthcheckuppackages} />}
        ></Route>
 <Route
          path="/Addpackage"
          element={<Protect ComponentName={Addpackage} />}
        ></Route>
        <Route
          path="/Packagelist"
          element={<Protect ComponentName={Packagelist} />}
        ></Route>
        <Route
          path="/PackageDetails"
          element={<Protect ComponentName={PackageDetails} />}
        ></Route>
         <Route
          path="/Checkuproutinemenwomen"
          element={<Protect ComponentName={Checkuproutinemenwomen} />}
        ></Route>
         <Route
          path="/AppointmentDetails"
          element={<Protect ComponentName={AppointmentDetails} />}
        ></Route>
        <Route
          path="/Bookappointment"
          element={<Protect ComponentName={Bookappointment} />}
        ></Route>
         <Route
          path="/BookappointmentDetails"
          element={<Protect ComponentName={BookappointmentDetails} />}
        ></Route>
         <Route
          path="/Prescription"
          element={<Protect ComponentName={Prescription} />}
        ></Route>

        <Route
          path="/blogCategory"
          element={<Protect ComponentName={BlogCategory} />}
        ></Route>

        <Route
          path="/blogList"
          element={<Protect ComponentName={BlogList} />}
        ></Route>


        
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
