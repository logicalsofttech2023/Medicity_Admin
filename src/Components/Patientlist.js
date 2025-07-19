import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Patientlist = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    GetUserList();
  }, []);

  // useEffect(() => {
  //   const filtered = usersData.filter(user => 
  //     user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  //   setCurrentPage(1);
  // }, [searchTerm, usersData]);

  const GetUserList = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_KEY}userList`)
      .then((res) => {
        setUsersData(res.data.data);
        setFilteredData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching user list:", error);
      });
  };

  const handleActivateUser = (userId) => {
    if (window.confirm("Are you sure you want to activate this user?")) {
      axios
        .post(`${process.env.REACT_APP_API_KEY}activateUser`, { userId })
        .then((res) => {
          setSuccessMessage(res.data.message);
          GetUserList();
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch((error) => {
          console.error("Error activating user:", error);
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Patients</h3>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="search-box">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by name, phone or city..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="datatable table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Dob</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems?.map((data) => (
                            <tr key={data._id}>
                              <td>#PT{data._id?.substring(0, 4).toUpperCase()}</td>
                              <td>
                                <h2 className="table-avatar">
                                  <Link
                                    to="/Profile"
                                    className="avatar avatar-sm me-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={
                                        data?.userProfile
                                          ? `${process.env.REACT_APP_IMG_URL}${data?.userProfile}`
                                          : "assets/img/patients/patient1.jpg"
                                      }
                                      alt="User"
                                    />
                                  </Link>
                                  <Link to="/Profile">
                                    {data?.name || "User"}
                                  </Link>
                                </h2>
                              </td>
                              <td>{data?.dob || "Not Found"}</td>
                              <td>
                                {data?.address
                                  ? data.address.length > 15
                                    ? `${data.address.substring(0, 15)}...`
                                    : data.address
                                  : "Not Found"}
                              </td>
                              <td>{data?.phone || "Not Found"}</td>
                              <td>{data?.country || "Not Found"}</td>
                              <td>{data?.gender || "Not Found"}</td>
                              <td>
                                <span className={`badge ${data.userStatus === true ? 'bg-success' : 'bg-danger'}`}>
                                  {data.userStatus === true ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                {data.userStatus !== true && (
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleActivateUser(data._id)}
                                  >
                                    Activate
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Pagination with inline styles */}
                      {filteredData.length > itemsPerPage && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '20px',
                          width: '100%'
                        }}>
                          <ul style={{
                            display: 'flex',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            gap: '5px'
                          }}>
                            <li>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  border: '1px solid #ddd',
                                  backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                                  color: currentPage === 1 ? '#999' : '#333',
                                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '3px'
                                }}
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            
                            {Array.from({ length: totalPages }, (_, i) => (
                              <li key={i}>
                                <button
                                  style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ddd',
                                    backgroundColor: currentPage === i + 1 ? '#007bff' : '#fff',
                                    color: currentPage === i + 1 ? '#fff' : '#333',
                                    cursor: 'pointer',
                                    borderRadius: '3px'
                                  }}
                                  onClick={() => paginate(i + 1)}
                                >
                                  {i + 1}
                                </button>
                              </li>
                            ))}
                            
                            <li>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  border: '1px solid #ddd',
                                  backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                                  color: currentPage === totalPages ? '#999' : '#333',
                                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                  borderRadius: '3px'
                                }}
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientlist;