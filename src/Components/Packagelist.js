import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Packagelist = () => {
  const [count, setcount] = useState();
  const [Packageid, setPackageid] = useState();
  const [GetAllPackagesData, setGetAllPackagesData] = useState();
  useEffect(() => {
    GetAllPackages();
  }, []);
  const GetAllPackages = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}getAllPackages`)
      .then((res) => {
        setGetAllPackagesData(res.data.data);
        setcount(res?.data?.data?.length);
      })
      .catch((error) => {});
  };

  const Delete = () => {
    const data = {
      packageId: Packageid,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}deletePackage`, data)
      .then((res) => {
        GetAllPackages();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "An error occurred");
      });
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

          <div class="page-header">
            <div class="row">
              <div class="col-sm-7 col-auto">
                <h3 class="page-title">Package List({count})</h3>
              </div>
              <div class="col-sm-5 col">
                <Link to="/Addpackage" class="btn btn-primary float-end mt-2">
                  Add Package
                </Link>
              </div>
            </div>
          </div>

          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="datatable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Package Title</th>
                          <th>Price</th>
                          <th>Age Group</th>
                          <th>Total Tests</th>

                          <th>Tests</th>
                          <th>Package Curated</th>

                          <th>Created Date</th>
                          {/* <th>Status</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                     <tbody>
  {GetAllPackagesData?.map((data, index) => {
    return (
      <tr key={data._id} style={{ verticalAlign: 'middle' }}>
        <td style={{ width: '50px' }}>
          <a href="#" style={{ color: '#2E37A4', textDecoration: 'none', fontWeight: '500' }}>
            {index + 1}
          </a>
        </td>
        <td style={{ minWidth: '150px' }}>
          <Link
            to="/PackageDetails"
            onClick={() => localStorage.setItem("packageid", data._id)}
            style={{
              color: '#2E37A4',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.3s',
              ':hover': { color: '#1a237e' }
            }}
          >
            {data?.title?.length > 15
              ? `${data.title.slice(0, 15)}...`
              : data.title}
          </Link>
        </td>
        <td style={{ minWidth: '120px' }}>
          <span style={{ color: '#28a745', fontWeight: '600' }}>₹{data?.price}</span>{' '}
          <del style={{ color: '#6c757d', fontSize: '0.875em' }}>₹{data?.discount_price}</del>
        </td>
        <td style={{ textAlign: 'center' }}>{data?.ageGroup} Years</td>
        <td style={{ textAlign: 'center' }}>{data?.total_test}</td>
        <td style={{ minWidth: '200px' }}>
  {Array.isArray(data?.test) && data.test.length > 0
    ? data.test
        .map(t => t.test_name || t) // show test_name
        .join(', ')
        .slice(0, 30) + 
      (data.test.map(t => t.test_name || t).join(', ').length > 30 ? '...' : '')
    : 'No tests'}
</td>

        <td style={{ minWidth: '150px' }}>
          <span style={{
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.875em'
          }}>
            {data?.package_categoryId?.name}
          </span>
        </td>
        <td style={{ minWidth: '120px' }}>
          {new Date(data?.createdAt).toLocaleDateString()}
        </td>
        <td style={{ minWidth: '200px' }}>
          <div className="actions" style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/PackageDetails"
              onClick={() => localStorage.setItem("packageid", data._id)}
              style={{
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '0.875em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <i className="fe fe-pencil" style={{ fontSize: '0.875em' }} /> Edit
            </Link>
            <a
              onClick={() => setPackageid(data._id)}
              style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '0.875em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
              data-bs-toggle="modal"
              href="#delete_modal"
            >
              <i className="fe fe-trash" style={{ fontSize: '0.875em' }} /> Delete
            </a>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      {/* Edit Details Modal */}
      <div
        className="modal fade"
        id="edit_invoice_report"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Invoice Report</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Invoice Number</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="#INV-0001"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Patient ID</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="	#PT002"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="R Amer"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Patient Image</label>
                      <input type="file" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Total Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$200.00"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <label className="mb-2">Created Date</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="29th Oct 2023"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Details Modal */}
      {/* Delete Modal */}
      <div
        className="modal fade"
        id="delete_modal"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-content p-2">
                <h4 className="modal-title">Delete</h4>
                <p className="mb-4">Are you sure want to delete?</p>
                <button
                  onClick={Delete}
                  type="button"
                  className="btn btn-primary"
                >
                  Delete
                </button>
                &nbsp;{" "}
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Modal */}
    </div>
  );
};

export default Packagelist;
