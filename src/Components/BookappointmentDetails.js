import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


const BookappointmentDetails = () => {
  const location = useLocation();
  const { bookid } = location.state || {};
  const [Ordersdata, setOrdersdata] = useState();
const Navigate = useNavigate();
  useEffect(() => {
    GetOrders(bookid);
  }, [0]);
  const GetOrders = (bookid) => {
    const data = {
        appointmentId: bookid,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getByIdApointments`, data)
      .then((res) => {
        setOrdersdata(res.data.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="main-wrapper">
      {/* Header */}

      {/* /Header */}
      {/* Sidebar */}

      {/* /Sidebar */}
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Book Appointment Details</h3>
                {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/home">Dashboard</Link></li>
                <li className="breadcrumb-item active">Appointments</li>
              </ul> */}
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="profile-header">
                <div className="row align-items-center">
                
                      <div class="create-details-card-head">
                        <div class="card-title-text">
                          <h5> Patient Information</h5>
                        </div>

                        <div class="patient-info-box">
                          <div class="row">
                          <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Booking Id</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.bookingId}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                          <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Appointment Date & Time</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.appointmentDate} - {Ordersdata?.appointmentTime}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Reference</li>
                                <li>
                                  <h6>{Ordersdata?.clinicName_hpName_drName}</h6>
                                </li>
                              </ul>
                            </div>
                           
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Price</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.price}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Duration</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.duration}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Name</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.customerName}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Phone</li>
                                <li>
                                  <h6>{Ordersdata?.customerPhone}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Email</li>
                                <li>
                                  <h6>{Ordersdata?.customerEmail}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Address</li>
                                <li>
                                  <h6>{Ordersdata?.customerAddress}</h6>
                                </li>
                              </ul>
                            </div>
                            
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Tests</li>
                                <li>
                                  <h6>{Ordersdata?.testName}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Service Name</li>
                                <li>
                                  <h6>
                                    {Ordersdata?.serviceName}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                   
                </div>
              </div>
              <div className="profile-menu">
                <div className="create-details-card-body">
                  <form action="doctor-appointment-start.html">
                    <div className="start-appointment-set">
                      <div className="form-bg-title">
                        <h5>Image</h5>
                      </div>
                    </div>

                    <div className="start-appointment-set">
                    
                          <div  className="row">
                            <div className="col-md-12">
                              <div className="input-block input-block-new">
                                <div className="bootstrap-tagsinput">
                                  <span
                                    
                                    className="mb-3"
                                  ><img height={400} style={{width:'100%',objectFit:'cover'}} src={`${process.env.REACT_APP_IMG_URL}`+Ordersdata?.image}/>
                                    
                                    
                                  </span>
                                </div>
                              
                              </div>
                            </div>
                          </div>
                      
                    </div>
                  </form>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </div>
  );
};



export default BookappointmentDetails
