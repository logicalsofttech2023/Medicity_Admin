import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
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
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-primary border-primary">
                    <i className="fe fe-users" />
                  </span>
                  <div className="dash-count">
                    <h3>168</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Lab Data</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-primary w-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-success">
                    <i className="fe fe-credit-card" />
                  </span>
                  <div className="dash-count">
                    <h3>487</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Patients</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-success w-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-danger border-danger">
                    <i className="fe fe-money" />
                  </span>
                  <div className="dash-count">
                    <h3>485</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Appointment</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-danger w-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="dash-widget-header">
                  <span className="dash-widget-icon text-warning border-warning">
                    <i className="fe fe-folder" />
                  </span>
                  <div className="dash-count">
                    <h3>₹62523</h3>
                  </div>
                </div>
                <div className="dash-widget-info">
                  <h6 className="text-muted">Revenue</h6>
                  <div className="progress progress-sm">
                    <div className="progress-bar bg-warning w-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            {/* Sales Chart */}
            <div className="card card-chart">
              <div className="card-header">
                <h4 className="card-title">Revenue</h4>
              </div>
              <div className="card-body">
                <div id="morrisArea" />
              </div>
            </div>
            {/* /Sales Chart */}
          </div>
          <div className="col-md-12 col-lg-6">
            {/* Invoice Chart */}
            <div className="card card-chart">
              <div className="card-header">
                <h4 className="card-title">Status</h4>
              </div>
              <div className="card-body">
                <div id="morrisLine" />
              </div>
            </div>
            {/* /Invoice Chart */}
          </div>	
        </div>
        <div className="row">
          <div className="col-md-6 d-flex">
            {/* Recent Orders */}
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h4 className="card-title">Top Patient List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Reports</th>
                        <th>Earned</th>
                        <th>Visit Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Ruby Perrin</Link>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>₹3200.00</td>
                        <td>5</td>
                        {/* <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td> */}
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-02.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Darren Elder</Link>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>₹3100.00</td>
                        <td>4</td>
                        {/* <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td> */}
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-03.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Deborah Angel</Link>
                          </h2>
                        </td>
                        <td>Cardiology</td>
                        <td>₹4000.00</td>
                        <td>2</td>
                        {/* <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td> */}
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-04.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Sofia Brient</Link>
                          </h2>
                        </td>
                        <td>Urology</td>
                        <td>₹3200.00</td>
                        <td>1</td>
                        {/* <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td> */}
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-05.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Marvin Campbell</Link>
                          </h2>
                        </td>
                        <td>Orthopaedics</td>
                        <td>₹3500.00</td>
                        <td>1</td>
                        {/* <td>
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star text-warning" />
                          <i className="fe fe-star-o text-secondary" />
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /Recent Orders */}
          </div>
          <div className="col-md-6 d-flex">
            {/* Feed Activity */}
            <div className="card  card-table flex-fill">
              <div className="card-header">
                <h4 className="card-title">Patients List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>													
                        <th>Patient Name</th>
                        <th>Phone</th>
                        <th>Last Visit</th>
                        <th>Paid</th>													
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
                        <td>8286329170</td>
                        <td>20 Oct 2023</td>
                        <td>₹100.00</td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient2.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Travis Trimble </Link>
                          </h2>
                        </td>
                        <td>2077299974</td>
                        <td>22 Oct 2023</td>
                        <td>₹200.00</td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient3.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Carl Kelly</Link>
                          </h2>
                        </td>
                        <td>2607247769</td>
                        <td>21 Oct 2023</td>
                        <td>₹250.00</td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient4.jpg" alt="User Image" /></Link>
                            <Link to="/Profile"> Michelle Fairfax</Link>
                          </h2>
                        </td>
                        <td>5043686874</td>
                        <td>21 Sep 2023</td>
                        <td>₹150.00</td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient5.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Gina Moore</Link>
                          </h2>
                        </td>
                        <td>9548207887</td>
                        <td>18 Sep 2023</td>
                        <td>₹350.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /Feed Activity */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* Recent Orders */}
            <div className="card card-table">
              <div className="card-header">
                <h4 className="card-title">Appointment List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>My Lab</th>
                        <th>Reports</th>
                        <th>Patient Name</th>
                        <th>Apointment Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Ruby Perrin</Link>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient1.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Charlene Reed </Link>
                          </h2>
                        </td>
                        <td>9 Nov 2023 <span className="text-primary d-block">11.00 AM - 11.15 AM</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_1" className="check" defaultChecked />
                            <label htmlFor="status_1" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹200.00
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-02.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Darren Elder</Link>
                          </h2>
                        </td>
                        <td>Dental</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient2.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Travis Trimble </Link>
                          </h2>
                        </td>
                        <td>5 Nov 2023 <span className="text-primary d-block">11.00 AM - 11.35 AM</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_2" className="check" defaultChecked />
                            <label htmlFor="status_2" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹300.00
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-03.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Deborah Angel</Link>
                          </h2>
                        </td>
                        <td>Cardiology</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient3.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Carl Kelly</Link>
                          </h2>
                        </td>
                        <td>11 Nov 2023 <span className="text-primary d-block">12.00 PM - 12.15 PM</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_3" className="check" defaultChecked />
                            <label htmlFor="status_3" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹150.00
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-04.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Sofia Brient</Link>
                          </h2>
                        </td>
                        <td>Urology</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient4.jpg" alt="User Image" /></Link>
                            <Link to="/Profile"> Michelle Fairfax</Link>
                          </h2>
                        </td>
                        <td>7 Nov 2023<span className="text-primary d-block">1.00 PM - 1.20 PM</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_4" className="check" defaultChecked />
                            <label htmlFor="status_4" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹150.00
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-05.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Marvin Campbell</Link>
                          </h2>
                        </td>
                        <td>Orthopaedics</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient5.jpg" alt="User Image" /></Link>
                            <Link to="/Profile">Gina Moore</Link>
                          </h2>
                        </td>
                        <td>15 Nov 2023 <span className="text-primary d-block">1.00 PM - 1.15 PM</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_5" className="check" defaultChecked />
                            <label htmlFor="status_5" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹200.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /Recent Orders */}
          </div>
        </div>
      </div>			
    </div>
    {/* /Page Wrapper */}
  </div>
  )
}

export default Home
