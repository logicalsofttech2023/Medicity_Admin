import React from 'react'

const Error = () => {
  return (
    <div className="main-wrapper">
  <div className="error-box">
    <h1>404</h1>
    <h3 className="h2 mb-3"><i className="fa fa-warning" /> Oops! Page not found!</h3>
    <p className="h4 fw-medium">The page you requested was not found.</p>
    <a href="/home" className="btn btn-primary">Back to Home</a>
  </div>
</div>
  )
}

export default Error
