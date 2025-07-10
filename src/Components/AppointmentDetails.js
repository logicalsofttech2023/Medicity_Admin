import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const AppointmentDetails = () => {
  const location = useLocation();
  const { bookid } = location.state || {};
  const [Ordersdata, setOrdersdata] = useState();
const Navigate = useNavigate();
  useEffect(() => {
    GetOrders(bookid);
  }, [0]);
  const GetOrders = (bookid) => {
    const data = {
      bookingId: bookid,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getByIdOrders`, data)
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
                <h3 className="page-title">Appointment Details</h3>
                {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/home">Dashboard</Link></li>
                <li className="breadcrumb-item active">Appointments</li>
              </ul> */}
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="profile-header">
                <div className="row align-items-center">
                  {Ordersdata?.members?.map((data, index) => {
                    return (
                      <div key={index} class="create-details-card-head">
                        <div class="card-title-text">
                          <h5>{index + 1}. Patient Information</h5>
                        </div>

                        <div class="patient-info-box">
                          <div class="row">
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Age / Gender</li>
                                <li>
                                  <h6>
                                    {data?.age} Years / {data?.gender}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Full Name</li>
                                <li>
                                  <h6>{data?.fullName}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Relation</li>
                                <li>
                                  <h6>{data?.relationName}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Date of Birth</li>
                                <li>
                                  <h6>{data?.dob}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Phone No.</li>
                                <li>
                                  <h6>{data?.phone}</h6>
                                </li>
                              </ul>
                            </div>
                            <div class="col-xl-4 col-md-6">
                              <ul class="info-list">
                                <li>Email</li>
                                <li>
                                  <h6>{data?.email}</h6>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="profile-menu">
                <div className="create-details-card-body">
                  <form action="doctor-appointment-start.html">
                    <div className="start-appointment-set">
                      <div className="form-bg-title">
                        <h5>Test Package</h5>
                      </div>
                    </div>

                    <div className="start-appointment-set">
                      {Ordersdata?.packageIds?.map((data) => {
                        return (
                          <div onClick={(()=>{localStorage.setItem("packageid",data._id)
                            Navigate("/PackageDetails")
                          })} className="row">
                            <div className="col-md-12">
                              <div className="input-block input-block-new">
                                <div className="bootstrap-tagsinput">
                                  <span
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "500",
                                    }}
                                    className="mb-3 tag badge badge-info"
                                  >
                                    {data?.title}
                                    <span data-role="remove" />
                                  </span>
                                </div>
                                <input
                                  className="input-tags form-control"
                                  id="inputBox"
                                  type="text"
                                  data-role="tagsinput"
                                  placeholder="Type New"
                                  name="Label"
                                  defaultValue="Skin Allergy"
                                  style={{ display: "none" }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </form>
                </div>
              </div>
              <div className="profile-menu">
                <div className="create-details-card-body">
                  <form action="doctor-appointment-start.html">
                    <div className="start-appointment-set">
                      <div className="form-bg-title">
                        <h5>Payment & Sample Collection Details</h5>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">
                              Collection Date & Time
                            </label>
                            <div className="input-text-field">
                              <input
                                disabled
                                value={`${Ordersdata?.sampleCollectDate} -  ${Ordersdata?.sampleCollectTime}`}
                                type="text"
                                className="form-control"
                                placeholder="Eg : 97.8"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Booking Date</label>
                            <div className="input-text-field">
                              <input
                                disabled
                                value={Ordersdata?.bookingDate}
                                type="text"
                                className="form-control"
                                placeholder={454}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">
                              Hard Copy Required
                            </label>
                            <div className="input-text-field">
                              <input
                                disabled
                                value={Ordersdata?.report}
                                type="text"
                                className="form-control"
                                placeholder="Eg : 97.8"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Payment Mode</label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.paymentMode}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 98"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Gift Amount</label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.giftAmount}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 97.8"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Offer Amount</label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.offerAmount}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 97.8"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">
                              Discount Amount
                            </label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.discountAmount}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 97.8"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Total Amount</label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.totalAmount}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 54"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                          <div className="input-block input-block-new">
                            <label className="form-label">Payable Amount</label>
                            <div className="input-text-field">
                              <input
                                value={Ordersdata?.payableAmount}
                                disabled
                                type="text"
                                className="form-control"
                                placeholder="Eg : 454"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="tab-content profile-tab-cont">
                {/* Personal Details Tab */}
                <div className="tab-pane fade show active" id="per_details_tab">
                  {/* Personal Details */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title d-flex justify-content-between">
                            <span>Address Details</span>
                          </h5>
                          <div className="row">
                            <p className="col-sm-2 text-muted">Place Type</p>
                            <p className="col-sm-10">
                              {Ordersdata?.address[0]?.placeType}
                            </p>
                          </div>
                          <div className="row">
                            <p className="col-sm-2 text-muted">House No.</p>
                            <p className="col-sm-10">
                              {Ordersdata?.address[0]?.houseNo}
                            </p>
                          </div>
                          <div className="row">
                            <p className="col-sm-2 text-muted">Land Mark</p>
                            <p className="col-sm-10">
                              {Ordersdata?.address[0]?.landMark}
                            </p>
                          </div>
                          <div className="row">
                            <p className="col-sm-2 text-muted">Address</p>
                            <p className="col-sm-10">
                              {Ordersdata?.address[0]?.address}
                            </p>
                          </div>
                          <div className="row">
                            <p className="col-sm-2 text-muted">Pin Code</p>
                            <p className="col-sm-10 mb-0">
                              {Ordersdata?.address[0]?.pincode}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Edit Details Modal */}

                      {/* /Edit Details Modal */}
                    </div>
                  </div>
                  {/* /Personal Details */}
                </div>
                {/* /Personal Details Tab */}
                {/* Change Password Tab */}

                {/* /Change Password Tab */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </div>
  );
};

export default AppointmentDetails;
