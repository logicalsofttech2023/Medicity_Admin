import React from 'react'
import { Link } from 'react-router-dom'

const Reviews = () => {
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
              <h3 className="page-title">Reviews</h3>
              {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Reviews</li>
              </ul> */}
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
                        <th>Patient Name</th>
                        <th>My Lab</th>
                        <th>Ratings</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient1.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Charlene Reed </Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Ruby Perrin</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>3 Nov 2023 <br /><small>09.59 AM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient2.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Travis Trimble </Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-02.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Darren Elder</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>2 Nov 2023<br /> <small>08.50 AM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient3.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Carl Kelly</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-03.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Deborah Angel</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>1 Nov 2023<br /> <small>02.59 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient4.jpg" alt="User Image" /></Link>
                            <Link to="/Profile"> Michelle Fairfax</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-04.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Sofia Brient</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>27 Sep 2023 <br /><small>03.40 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient5.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Gina Moore</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-05.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Marvin Campbell</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>24 Sep 2023 <br /><small>04.38 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient6.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Elsie Gilley</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-06.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Katharine Berthold</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>22 Aug 2023 <br /><small>01.50 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient7.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Joan Gardner</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-07.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Linda Tobin</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>21 Jul 2023 <br /><small>05.50 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient8.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Daniel Griffing</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-08.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Paul Richard</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>16 Jun 2023 <br /><small>04.50 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient9.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Walter Roberson</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-09.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">John Gibbs</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>11 Mar 2023 <br /><small>05.55 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient10.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Harry Williams</Link>
                          </h2>
                        </td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-10.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Olga Barlow</Link>
                          </h2>
                        </td>
                        <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </td>
                        <td>15 Feb 2023 <br /><small>07.30 PM</small></td>
                        <td>
                          <div className="actions">
                            <a className="btn btn-sm bg-danger-light" data-bs-toggle="modal" href="#delete_modal">
                              <i className="fe fe-trash" /> Delete
                            </a>
                          </div>
                        </td>
                      </tr>
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

export default Reviews
