import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Bookappointment = () => {
 const [Ordersdata, setOrdersdata] = useState();

   useEffect(() => {
     GetAllorders();
   }, [0]);
   const GetAllorders = () => {
     axios
       .get(`${process.env.REACT_APP_API_KEY}getAllApointments`)
       .then((res) => {
         setOrdersdata(res.data.data);
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
              <h3 className="page-title">Book Appointments</h3>
              {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/home">Dashboard</Link></li>
                <li className="breadcrumb-item active">Appointments</li>
              </ul> */}
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            {/* Recent Orders */}
            <div className="card">
              <div className="card-body">
                {Ordersdata?.length > 0 ? 
                <div className="table-responsive">
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>My Lab</th>
                        <th>Speciality</th>
                        <th>Patient Name</th>
                        <th>Appointment Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
{Ordersdata?.map((data)=>{
  return(

 
                      <tr>
                        <td>
                          <h2 className="table-avatar">
                             <Link to="/BookappointmentDetails" state={{bookid: data._id}}>Medicity</Link>
                          </h2>
                        </td>
                        <td>Tests</td>
                        <td>
                          <h2 className="table-avatar">
                             <Link to="/BookappointmentDetails" state={{bookid: data._id}}>{data?.customerName}</Link>
                          </h2>
                        </td>
                        <td>{data?.appointmentDate} <span className="text-primary d-block">{data?.appointmentTime}</span></td>
                        <td>
                          <div className="status-toggle">
                            <input type="checkbox" id="status_1" className="check" defaultChecked />
                            <label htmlFor="status_1" className="checktoggle">checkbox</label>
                          </div>
                        </td>
                        <td>
                          ₹{data?.price}
                        </td>
                      </tr>
                       )
                      })}
                    </tbody>
                  </table>
                </div>
              : <div className='align-center'>No Data Found</div> 
              }
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


export default Bookappointment
