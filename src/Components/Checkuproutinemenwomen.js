import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Checkuproutinemenwomen = () => {
const [Getdata, setGetdata] = useState();
const [Packageid, setPackageid] = useState();
const [type, settype] = useState();
  const [packageName, setPackageName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [updatepimage, setupdatepimage] = useState();
  const [updatepName, setupdatepName] = useState();
  const [UpdatePackageName,setUpdatePackageName] = useState();
  const [dummy, setdummy] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageName || !image) {
      setError("Name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", packageName);
    formData.append("image", image);
    formData.append("gender",type)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}addCheckupRoutine`,
        formData
        
      );
      toast.success(response.data.message);
      GetAllPackageCategories();
      setPackageName("");
      setImage("");
      setError("");
    } catch (err) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  useEffect(()=>{
    GetAllPackageCategories()
  },[0])
  const GetAllPackageCategories =()=>{
    axios.get(`${process.env.REACT_APP_API_KEY}getAllCheckupRoutines`).then((res)=>{
      setGetdata(res.data.data)
    }).catch((error)=>{
      
    })
  }

  const Delete =()=>{
    const data ={
        checkupRoutineId:Packageid
    }
    
      axios.post(`${process.env.REACT_APP_API_KEY}deleteCheckupRoutine`,data).then((res)=>{
        GetAllPackageCategories();
        toast.success(res.data.message);
      }).catch((error)=>{
        toast.error(error.response.data.message || "An error occurred");
      })
  }

  const Update =()=>{
    const formData = new FormData();
    formData.append("checkupRoutineId", Packageid);
    formData.append("name", updatepName);
    formData.append("image", updatepimage);
    formData.append("gender",UpdatePackageName);

    
      axios.post(`${process.env.REACT_APP_API_KEY}updateCheckupRoutine`,formData).then((res)=>{
        GetAllPackageCategories();
        toast.success(res.data.message);
      }).catch((error)=>{
        toast.error(error.response.data.message || "An error occurred");
      })
  }

  
  return (
    <div className="main-wrapper">
      <Toaster/>
    {/* Header */}
    
    {/* /Header */}
  
    {/* /Sidebar */}
    {/* Page Wrapper */}
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-7 col-auto">
              <h3 className="page-title">Routine checkups</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/home">Routine health checkups for men & women</Link></li>
               
              </ul>
            </div>
            <div className="col-sm-5 col">
              <a href="#Add_Specialities_details" data-bs-toggle="modal" className="btn btn-primary float-end mt-2">+Add New Routine</a>
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
                        <th>#</th>
                        <th>Routine For</th>
                        <th>Routine Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Getdata?.map((data,index)=>{
return(
  <tr>
  <td>{index+1}</td>
  <td>{data?.gender}</td>
  <td>
    <h2 className="table-avatar">
      <a href="#" className="avatar avatar-sm me-2">
        <img className="avatar-img" src={`${process.env.REACT_APP_IMG_URL}${data?.image	}`} alt="Speciality" />
      </a>
      <a href="#">{data?.name}</a>
    </h2>
  </td>
  <td>
    <div className="actions">
    <a onClick={() => {setPackageid(data._id)
      setupdatepName(data?.name)
      setdummy(data?.image)
      setUpdatePackageName(data?.gender)
    }} className="btn btn-sm bg-success-light" data-bs-toggle="modal" href="#edit_specialities_details">
  <i className="fe fe-pencil" /> Edit
</a>&nbsp;
      <a onClick={() => setPackageid(data._id)} data-bs-toggle="modal" href="#delete_modal" className="btn btn-sm bg-danger-light">
        <i className="fe fe-trash" /> Delete
      </a>
    </div>
  </td>
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
    {/* /Page Wrapper */}
    {/* Add Modal */}
    <div className="modal fade" id="Add_Specialities_details" aria-hidden="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Routine</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
              <div className="col-12 col-sm-12">
                  <div className="mb-3">
                    <label className="mb-2">Routine For</label>
                    <select required value={type}
                onChange={(e) => settype(e.target.value)} type="text" placeholder='Please enter package name' className="form-control" >
                  <option >--Select type--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 
                  </select>
                  </div>
                </div>

                <div className="col-12 col-sm-12">
                  <div className="mb-3">
                    <label className="mb-2">Routine Name</label>
                    <input required value={packageName}
                onChange={(e) => setPackageName(e.target.value)} type="text" placeholder='Please enter package name' className="form-control" />
                  </div>
                </div>
                <div className="col-12 col-sm-12">
                  <div className="mb-3">
                    <label className="mb-2">Image</label>
                    <input required onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" className="form-control" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* /ADD Modal */}
    {/* Edit Details Modal */}
    <div className="modal fade" id="edit_specialities_details" aria-hidden="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Routine</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
              
              <div className="col-12 col-sm-12">
                  <div className="mb-3">
                    <label className="mb-2">Routine For</label>
                    <select required value={UpdatePackageName}
                onChange={(e) => setUpdatePackageName(e.target.value)} type="text" placeholder='Please enter package name' className="form-control" >
                  <option >--Select type--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 
                  </select>
                  </div>
                </div>
                <div className="col-12 col-sm-12">
                  <div className="mb-3">
                    <label className="mb-2">Routine Name</label>
                    <input value={updatepName} onChange={((e)=>setupdatepName(e.target.value))} type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-12 col-sm-12">
                  {updatepimage ? <img className="avatar-img" height={40} width={80} src={URL?.createObjectURL(updatepimage)}/> : 
                <img className="avatar-img" height={40} width={80} src={`${process.env.REACT_APP_IMG_URL}${dummy}`} alt="Speciality" />
              }   <div className="mb-3">
                    <label className="mb-2">Image</label>
                    <input onChange={(e) => setupdatepimage(e.target.files[0])} type="file" accept="image/*" className="form-control" />
                  </div>
                </div>
              </div>
              <button onClick={Update} type="button" data-bs-dismiss="modal" className="btn btn-primary w-100">Save</button>
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
              <button onClick={Delete} type="button" className="btn btn-primary">Delete </button> &nbsp;
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


export default Checkuproutinemenwomen
