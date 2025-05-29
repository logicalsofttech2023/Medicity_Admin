import React from 'react'

const Settings = () => {
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
            <h3 className="page-title">General Settings</h3>
            {/* <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
              <li className="breadcrumb-item"><a href="javascript:(0)">Settings</a></li>
              <li className="breadcrumb-item active">General Settings</li>
            </ul> */}
          </div>
        </div>
      </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-12">
          {/* General */}
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">General</h4>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="mb-3">
                  <label className="mb-2">Website Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="mb-2">Website Logo</label>
                  <input type="file" className="form-control" />
                  <small className="text-secondary">Recommended image size is <b>150px x 150px</b></small>
                </div>
                <div className="mb-0">
                  <label className="mb-2">Favicon</label>
                  <input type="file" className="form-control" />
                  <small className="text-secondary">Recommended image size is <b>16px x 16px</b> or <b>32px x 32px</b></small><br />
                  <small className="text-secondary">Accepted formats : only png and ico</small>
                </div>
              </form>
            </div>
          </div>
          {/* /General */}
        </div>
      </div>
    </div>			
  </div>
  {/* /Page Wrapper */}
</div>
  )
}

export default Settings
