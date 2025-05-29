import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Patientlist = () => {
   
  const [UsersData, setUsersData] = useState();
  useEffect(()=>{
      GetUserList()
  },[])
  const GetUserList = ()=>{
      axios.post(
          `${process.env.REACT_APP_API_KEY}userList`
      ).then((res)=>{
          setUsersData(res.data.data)
          
      }).catch((error)=>{

      })
  }

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
              <h3 className="page-title">List of Patient</h3>
              {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item"><a href="javascript:(0);">Users</a></li>
                <li className="breadcrumb-item active">Patient</li>
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
                        </tr>
                      </thead>
                      <tbody>
                        {UsersData?.map((data)=>{
                          return(


                        <tr>
                          <td>#PT001</td>
                          <td>
                            <h2 className="table-avatar">
                              <Link to="/Profile" className="avatar avatar-sm me-2"><img className="avatar-img rounded-circle" src={data?.userProfile ? `${process.env.REACT_APP_IMG_URL}${data?.userProfile}` : "assets/img/patients/patient1.jpg" } alt="User Image" /></Link>
                              <Link to="/Profile">{data?.name ? data?.name : "Medicity User"}</Link>
                            </h2>
                          </td>
                          <td>{data?.dob ? data?.dob : "Not Found"}</td>
                          <td>{data?.address
  ? data?.address.length > 15
    ? `${data?.address?.substring(0, 15)}...`
    : data?.address
  : "Not Found"}</td>
                          <td>{data?.phone ? data?.phone : "Not Found"}</td>
                          <td>{data?.country ? data?.country : "Not Found"}</td>
                          <td>{data?.gender ? data?.gender : "Not Found"}</td>
                        </tr>
                          )
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
    </div>
    {/* /Page Wrapper */}
  </div>
  )
}

export default Patientlist
