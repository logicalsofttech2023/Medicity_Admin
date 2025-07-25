import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Appointmentlist = () => {
  const [uderid, setuderid] = useState();
  const [status, setStatus] = useState();
  const [Ordersdata, setOrdersdata] = useState();

  useEffect(() => {
    GetAllorders();
  }, []);

  const GetAllorders = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}getAllOrders`)
      .then((res) => {
        setOrdersdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [testName, settestName] = useState();
  const [recordFor, setrecordFor] = useState();
  const [comment, setcomment] = useState();
  const [file, setfile] = useState();
  
  const Addreport = () => {
    const formData = new FormData();
    formData.append("userId", uderid);
    formData.append("testName", testName);
    formData.append("recordFor", recordFor);
    formData.append("comment", comment);
    formData.append("file", file);

    axios
      .post(`${process.env.REACT_APP_API_KEY}addReports`, formData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggle = async (orderId, currentStatus) => {
    // If current status is canceled (2), don't allow toggling
    if (currentStatus === 2) {
      toast.error("Canceled appointments cannot be modified");
      return;
    }

    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}bookingOrderStatusChange`,
        {
          orderId,
          status: newStatus.toString(),
        }
      );

      console.log("Status updated:", response.data);
      toast.success(response.data.message);
      
      setOrdersdata((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, bookingStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update status");
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Upcoming";
      case 1:
        return "Completed";
      case 2:
        return "Canceled";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "badge bg-warning-light";
      case 1:
        return "badge bg-success-light";
      case 2:
        return "badge bg-danger-light";
      default:
        return "badge bg-secondary-light";
    }
  };

  return (
    <div className="main-wrapper">
      <Toaster />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Appointments</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  {Ordersdata?.length > 0 ? (
                    <div className="table-responsive">
                      <table className="datatable table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>My Lab</th>
                            <th>Speciality</th>
                            <th>Patient Mobile No.</th>
                            <th>Appointment Time</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Ordersdata?.map((data) => {
                            return (
                              <tr key={data._id}>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to="/AppointmentDetails"
                                      state={{ bookid: data?._id }}
                                    >
                                      Medicity
                                    </Link>
                                  </h2>
                                </td>
                                <td>Tests</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to="/AppointmentDetails"
                                      state={{ bookid: data?._id }}
                                    >
                                      {data?.userId?.phone}
                                    </Link>
                                  </h2>
                                </td>
                                <td>
                                  {data?.sampleCollectDate}{" "}
                                  <span className="text-primary d-block">
                                    {data?.sampleCollectTime}
                                  </span>
                                </td>
                                <td>
                                  <span className={getStatusClass(data.bookingStatus)}>
                                    {getStatusText(data.bookingStatus)}
                                  </span>
                                  {data.bookingStatus === 2 && data.cancelReason && (
                                    <div className="text-danger small mt-1">
                                      Reason: {data.cancelReason}
                                    </div>
                                  )}
                                </td>
                                <td>₹{data?.payableAmount}</td>
                                <td>
                                  {data.bookingStatus !== 2 && (
                                    <div className="status-toggle">
                                      <input
                                        type="checkbox"
                                        id={`status_${data?._id}`}
                                        className="check"
                                        checked={data.bookingStatus === 1}
                                        onChange={() =>
                                          handleToggle(
                                            data._id,
                                            data.bookingStatus
                                          )
                                        }
                                        disabled={data.bookingStatus === 2}
                                      />
                                      <label
                                        htmlFor={`status_${data._id}`}
                                        className="checktoggle"
                                      >
                                        checkbox
                                      </label>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="align-center">No Data Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="edit_invoice_report"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Invoice Report</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <div className="mb-3">
                      <label className="mb-2">Test Name</label>
                      <input
                        onChange={(e) => settestName(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12">
                    <div className="mb-3">
                      <label className="mb-2">Record For</label>
                      <input
                        onChange={(e) => setrecordFor(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12">
                    <div className="mb-3">
                      <label className="mb-2">Comment</label>
                      <input
                        onChange={(e) => setcomment(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12">
                    <div className="mb-3">
                      <label className="mb-2">Report File</label>
                      <input
                        onChange={(e) => setfile(e.target.files[0])}
                        type="file"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <button
                  data-bs-dismiss="modal"
                  onClick={Addreport}
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointmentlist;