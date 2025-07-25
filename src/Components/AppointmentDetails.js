import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AppointmentDetails = () => {
  const location = useLocation();
  const { bookid } = location.state || {};
  const [ordersData, setOrdersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookid) {
      getOrders(bookid);
    }
  }, [bookid]);

  const getOrders = (bookid) => {
    setLoading(true);
    const data = {
      bookingId: bookid,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}getByIdOrders`, data)
      .then((res) => {
        setOrdersData(res.data.data);
        setStatus(res.data.data.bookingStatus);
        if (res.data.data.cancelReason) {
          setCancelReason(res.data.data.cancelReason);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order details:", err);
        setLoading(false);
      });
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}bookingOrderStatusChange`,
        {
          orderId: bookid,
          status: newStatus.toString(),
          ...(newStatus === 2 && { cancelReason }), // Include cancel reason if status is 2 (canceled)
        }
      );

      toast.success(response.data.message);
      setStatus(newStatus);
      setShowCancelModal(false);
      // Refresh data
      getOrders(bookid);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <span className="badge bg-warning">Upcoming</span>;
      case 1:
        return <span className="badge bg-success">Completed</span>;
      case 2:
        return <span className="badge bg-danger">Canceled</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Loading Appointment Details...</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ordersData) {
    return (
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Appointment not found</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="page-title">Appointment Details</h3>
                  <div>
                    {getStatusBadge(status)}
                    {status === 2 && cancelReason && (
                      <div className="text-danger small mt-1">
                        Reason: {cancelReason}
                      </div>
                    )}
                  </div>
                </div>
                <div className="booking-id">
                  <span className="badge bg-primary">
                    Booking ID: {ordersData.bookingId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Appointment Status</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-3">
                {status !== 1 && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatusChange(1)}
                    disabled={status === 2}
                  >
                    Mark as Completed
                  </button>
                )}
                {status !== 2 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowCancelModal(true)}
                    disabled={status === 1}
                  >
                    Cancel Appointment
                  </button>
                )}
                {status === 2 && (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleStatusChange(0)}
                  >
                    Reopen Appointment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Patient Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {ordersData.members?.map((patient, index) => (
                  <div key={index} className="col-md-12 mb-4">
                    <div className="patient-card">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Full Name</label>
                            <p>{patient.fullName}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Age / Gender</label>
                            <p>
                              {patient.age} Years / {patient.gender}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Relation</label>
                            <p>{patient.relationName}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Date of Birth</label>
                            <p>{patient.dob}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Phone Number</label>
                            <p>{patient.phone}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="info-item">
                            <label>Email</label>
                            <p>{patient.email || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Test Packages Section */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                {ordersData.packageIds?.length > 0 ? "Test Packages" : "Tests"}
              </h5>
            </div>
            <div className="card-body">
              {ordersData.packageIds?.length > 0 ? (
                <div className="packages-list">
                  {ordersData.packageIds.map((pkg, index) => (
                    <div
                      key={index}
                      className="package-card clickable"
                      onClick={() => {
                        localStorage.setItem("packageid", pkg._id);
                        navigate("/PackageDetails");
                      }}
                    >
                      <div className="package-header">
                        <h6>{pkg.title}</h6>
                        <span className="badge bg-info">
                          ₹{pkg.discount_price || pkg.price}
                        </span>
                      </div>
                      <div className="package-details">
                        <p>
                          <strong>Includes:</strong> {pkg.total_test} tests
                        </p>
                        <p>
                          <strong>Report Time:</strong> {pkg.report_time} hours
                        </p>
                        {pkg.fasting_time && (
                          <p>
                            <strong>Fasting Required:</strong>{" "}
                            {pkg.fasting_time} hours
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Individual Tests Section */}
              {ordersData.testDetails?.length > 0 && (
                <div className="tests-section mt-4">
                  <h6 className="section-title">Individual Tests</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Test Name</th>
                          <th>Type</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersData.testDetails.map((test, index) => (
                          <tr key={index}>
                            <td>{test.test_name}</td>
                            <td>
                              {test.test_type === 1 ? "Lab Test" : "Other"}
                            </td>
                            <td>₹{test.test_rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Sample Collection Section */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                Payment & Sample Collection Details
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Collection Date & Time</label>
                    <p>
                      {ordersData.sampleCollectDate} -{" "}
                      {ordersData.sampleCollectTime}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Booking Date</label>
                    <p>{new Date(ordersData.bookingDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Hard Copy Required</label>
                    <p>{ordersData.report === "Yes" ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Payment Mode</label>
                    <p>{ordersData.paymentMode}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Gift Amount</label>
                    <p>₹{ordersData.giftAmount || "0"}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Offer Amount</label>
                    <p>₹{ordersData.offerAmount || "0"}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Discount Amount</label>
                    <p>₹{ordersData.discountAmount || "0"}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Total Amount</label>
                    <p>₹{ordersData.totalAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Payable Amount</label>
                    <p className="text-success fw-bold">
                      ₹{ordersData.payableAmount}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Payment Status</label>
                    <p>
                      <span
                        className={`badge ${
                          ordersData.paymentStatus ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {ordersData.paymentStatus ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-item">
                    <label>Report</label>
                    {ordersData.report ? (
                      <p>
                        <a
                          href={ordersData.report}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      </p>
                    ) : (
                      <p>
                        <span className="badge bg-danger">No</span>
                      </p>
                    )}
                  </div>
                </div>
                {ordersData.cancelReason && (
                  <div className="col-md-4">
                    <div className="info-item">
                      <label>Cancel Reason</label>
                      <p>{ordersData.cancelReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Details Section */}
          {ordersData.address?.length > 0 && (
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Address Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="info-item">
                      <label>Place Type</label>
                      <p>{ordersData.address[0].placeType}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item">
                      <label>House No.</label>
                      <p>{ordersData.address[0].houseNo}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item">
                      <label>Land Mark</label>
                      <p>{ordersData.address[0].landMark}</p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="info-item">
                      <label>Full Address</label>
                      <p>{ordersData.address[0].address}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item">
                      <label>Pin Code</label>
                      <p>{ordersData.address[0].pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCancelModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Reason for Cancellation</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please specify the reason for cancellation"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleStatusChange(2)}
                  disabled={!cancelReason}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Report Modal */}
      <div
        className="modal fade"
        id="addReportModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Test Report</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Test Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Record For</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comments</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Report</label>
                  <input type="file" className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .patient-card,
        .package-card {
          padding: 15px;
          border-radius: 8px;
          background-color: #f8f9fa;
          margin-bottom: 15px;
        }

        .package-card {
          border-left: 4px solid #0d6efd;
          transition: all 0.3s ease;
        }

        .package-card:hover {
          background-color: #e9f0ff;
          cursor: pointer;
        }

        .info-item {
          margin-bottom: 15px;
        }

        .info-item label {
          font-weight: 600;
          color: #6c757d;
          margin-bottom: 5px;
          display: block;
        }

        .info-item p {
          margin: 0;
          font-size: 16px;
        }

        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .section-title {
          color: #0d6efd;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #dee2e6;
        }

        .booking-id {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default AppointmentDetails;
