import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Prescription = () => {
  const [uderid, setuderid] = useState();

  const [Ordersdata, setOrdersdata] = useState();

  useEffect(() => {
    GetAllorders();
  }, [0]);
  const GetAllorders = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}allPrescriptionFiles`)
      .then((res) => {
        setOrdersdata(res.data.data);
      })
      .catch((err) => {});
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
      .catch((err) => {});
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
                <h3 className="page-title">Prescription</h3>
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
                            <th>Member Name</th>
                            <th>Relation</th>
                            <th>Age</th>
                            <th>Dob</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Patient Mobile No.</th>
                           
                            
                            
                            <th>View Files</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Ordersdata?.map((data) => {
                            return (
                              <tr>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to="#"
                                      state={{ bookid: data?._id }}
                                    >
                                      {data?.memberId?.fullName}
                                    </Link>
                                  </h2>
                                </td>
                                <td>{data?.memberId?.relationName}</td>
                                <td>{data?.memberId?.age}</td>

 <td>{data?.memberId?.dob}</td>
 <td>{data?.memberId?.gender}</td>
                                <td>{data?.memberId?.email}</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to="#"
                                      state={{ bookid: data?._id }}
                                    >
                                      {data?.memberId?.phone}
                                    </Link>
                                  </h2>
                                </td>
                                
                               
                               
                                <td
                                  className="text-primary"
                                  onClick={() => setuderid(data?.files)}
                                  data-bs-toggle="modal"
                                  href="#edit_invoice_report"
                                >
                                  View
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
              <h5 class="modal-title">Prescription Files</h5>
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
                <div className="col-12 col-sm-12">
  {uderid?.map((filename, index) => (
    <img
      key={index}
      src={`${process.env.REACT_APP_IMG_URL}${filename}`}
      alt={`file-${index}`}
      style={{ width: "200px", margin: "5px" }} // optional styling
    />
  ))}
</div>
                 
                </div>
                <button data-bs-dismiss="modal"
                 
                  class="btn btn-primary w-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription
