import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "./logo.png";
const Login = () => {
  const [adminemail, setadminemail] = useState("");
  const [adminpassword, setadminpassword] = useState("");
  const Navigate = useNavigate();



  const handlesubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: adminemail,
      password: adminpassword,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}adminLogin`, formData)
      .then((response) => {
        console.log(response);

        toast.success(response.data.message);
        setTimeout(() => {
          Navigate("/home");
        }, 3000);

        localStorage.setItem("medicityadminid", response.data.data._id);

        localStorage.setItem("adminemail", response.data.data.email);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="main-wrapper login-body">
      <Toaster />
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src={logo} alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Login</h1>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Form */}
                <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => {
                        setadminemail(e.target.value);
                      }}
                      required
                      data-msg="Please enter a valid email address."
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      required
                      placeholder="Password"
                      onChange={(e) => {
                        setadminpassword(e.target.value);
                      }}
                      className="form-control"
                      type="password"
                    />
                  </div>
                  <div className="mb-3">
                    <button type="sumbit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
