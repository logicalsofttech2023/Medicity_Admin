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
  }, [0]);
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
    }
  };

  return (
    <div className="main-wrapper">
      <Toaster />
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
                <h3 className="page-title">Appointments</h3>
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
              {/* Recent Orders */}
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
                            <th>Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Ordersdata?.map((data) => {
                            return (
                              <tr>
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
                                    />
                                    <label
                                      htmlFor={`status_${data._id}`}
                                      className="checktoggle"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <td>₹{data?.payableAmount}</td>
                                <td
                                  className="text-primary"
                                  onClick={() => setuderid(data.userId?._id)}
                                  data-bs-toggle="modal"
                                  href="#edit_invoice_report"
                                >
                                  Add
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
              {/* /Recent Orders */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

      <div
        class="modal fade"
        id="edit_invoice_report"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Invoice Report</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <div class="mb-3">
                      <label class="mb-2">Test Name</label>
                      <input
                        onChange={(e) => settestName(e.target.value)}
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="mb-3">
                      <label class="mb-2">Record For</label>
                      <input
                        onChange={(e) => setrecordFor(e.target.value)}
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="mb-3">
                      <label class="mb-2">Comment</label>
                      <input
                        onChange={(e) => setcomment(e.target.value)}
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="mb-3">
                      <label class="mb-2">Report File</label>
                      <input
                        onChange={(e) => setfile(e.target.files[0])}
                        type="file"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <button
                  data-bs-dismiss="modal"
                  onClick={Addreport}
                  type="submit"
                  class="btn btn-primary w-100"
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
