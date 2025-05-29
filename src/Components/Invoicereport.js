import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Invoicereport = () => {
  
  const [Reportdata, setReportdata] = useState();

  useEffect(() => {
    GetReportorders();
  }, [0]);
  const GetReportorders = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}reportsList`)
      .then((res) => {
        setReportdata(res.data.data);
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
              <h3 className="page-title">Invoice Report</h3>
              {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/home">Dashboard</Link></li>
                <li className="breadcrumb-item active">Invoice Report</li>
              </ul> */}
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                {Reportdata?.length > 0 ? 
                <div className="table-responsive">
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Invoice No.</th>
                        
                        <th>Patient Name</th>
                        <th>Phone No.</th>
                        <th>Test Name</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Reportdata?.map((data)=>{
                      return(
<tr>
                        <td><a href="invoice.html">#IN0001</a></td>
                      
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient1.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">{data?.userId?.name} </Link>
                          </h2>
                        </td>
                        <td>{data?.userId?.phone}</td>
                        <td>{data?.testName}</td>
                        <td>{data?.comment?.slice(0,15)}</td>
                        
                        <td>
                          <span className="badge rounded-pill bg-success inv-badge">Paid</span>
                        </td>
                        <td>
                          <div className="actions">
                            <a data-bs-toggle="modal" href="#edit_invoice_report" className="btn btn-sm bg-success-light me-2">
                              {/* <i className="fe fe-pencil" />  */}
                              View & Edit 
                            </a>
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      )
                    })}
                      
                     
                     
                    </tbody>
                  </table>
                </div> :
                 <div className='align-center'>No Data Found</div>}
              </div>
            </div>
          </div>			
        </div>
      </div>			
    </div>
    {/* /Page Wrapper */}
    {/* Edit Details Modal */}
    <div className="modal fade" id="edit_invoice_report" aria-hidden="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Invoice Report</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="mb-2">Invoice Number</label>
                    <input type="text" className="form-control" defaultValue="#INV-0001" />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="mb-2">Patient ID</label>
                    <input type="text" className="form-control" defaultValue="	#PT002" />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="mb-2">Patient Name</label>
                    <input type="text" className="form-control" defaultValue="R Amer" />
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
                    <input type="text" className="form-control" defaultValue="$200.00" />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="mb-2">Created Date</label>
                    <input type="text" className="form-control" defaultValue="29th Oct 2023" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* /Edit Details Modal */}
    {/* Delete Modal */}
    <div className="modal fade" id="delete_modal" aria-hidden="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-content p-2">
              <h4 className="modal-title">Delete</h4>
              <p className="mb-4">Are you sure want to delete?</p>
              <button type="button" className="btn btn-primary">Save </button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Delete Modal */}
  </div>
  )
}

export default Invoicereport
