import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}dashboardCount`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        if (data.success) {
          setDashboardData(data.data);
        } else {
          throw new Error(data.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
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
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
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
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
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
                      <h3>{dashboardData?.totalUser || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Total Users</h6>
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
                      <h3>{dashboardData?.totalBooking || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Total Bookings</h6>
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
                      <i className="fe fe-calendar" />
                    </span>
                    <div className="dash-count">
                      <h3>{dashboardData?.totalAppointment || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Appointments</h6>
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
                      <i className="fe fe-file-text" />
                    </span>
                    <div className="dash-count">
                      <h3>{dashboardData?.totalPrescription || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Prescriptions</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-warning w-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="dash-widget-header">
                    <span className="dash-widget-icon text-info border-info">
                      <i className="fe fe-file" />
                    </span>
                    <div className="dash-count">
                      <h3>{dashboardData?.totalReport || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Lab Reports</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-info w-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="dash-widget-header">
                    <span className="dash-widget-icon text-secondary border-secondary">
                      <i className="fe fe-file-text" />
                    </span>
                    <div className="dash-count">
                      <h3>{dashboardData?.totalBlogs || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Total Blogs</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-secondary w-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="dash-widget-header">
                    <span className="dash-widget-icon text-dark border-dark">
                      <i className="fe fe-eye" />
                    </span>
                    <div className="dash-count">
                      <h3>{dashboardData?.totalBlogView || 0}</h3>
                    </div>
                  </div>
                  <div className="dash-widget-info">
                    <h6 className="text-muted">Blog Views</h6>
                    <div className="progress progress-sm">
                      <div className="progress-bar bg-dark w-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>			
      </div>
      {/* /Page Wrapper */}
    </div>
  );
};

export default Home;