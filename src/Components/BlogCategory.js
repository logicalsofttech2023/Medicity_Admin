import axios from "axios";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRef } from "react";

const BlogCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [blogCategories, setBlogCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    GetAllBlogCategories();
  }, []);
  const GetAllBlogCategories = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}blogCategoryList`)
      .then((response) => {
        console.log(response);

        setBlogCategories(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "An error occurred");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}createBlogCategory`, formData)
      .then((response) => {
        toast.success(response.data.message);
        GetAllBlogCategories();
        setName("");
        setError("");
        setShowAddModal(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "An error occurred");
      });
  };

  const handleDelete = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}deleteBlogCategory/`, { id })
      .then((response) => {
        toast.success(response.data.message);
        GetAllBlogCategories();
      })
      .catch((error) => {
        toast.error("Failed to delete category");
        console.error("Error deleting category:", error);
      });
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDeleteClick = () => {
    handleDelete(deleteId);
    closeDeleteModal();
  };

  const openEditModal = (speciality) => {
    setEditData({
      id: speciality._id,
      name: speciality.name,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: editData.id,
      name: editData.name,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}updateBlogCategory`,
        formData
      );
      toast.success(response.data.message);
      GetAllBlogCategories();
      setEditData({
        id: null,
        name: "",
      });
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <div className="main-wrapper">
      <Toaster />
      {/* Header */}

      {/* /Sidebar */}
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-7 col-auto">
                <h3 className="page-title">Blog Category</h3>
                {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Specialities</li>
              </ul> */}
              </div>
              <div className="col-sm-5 col">
                <a
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-primary float-end mt-2"
                >
                  Add
                </a>
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
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="3" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : blogCategories.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No data found
                            </td>
                          </tr>
                        ) : (
                          blogCategories.map((category, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{category.name}</td>
                              <td>
                                <a
                                  onClick={() => openEditModal(category)}
                                  className="btn btn-sm bg-success-light me-2"
                                >
                                  <i className="fe fe-pencil" /> Edit
                                </a>
                                <a
                                  onClick={() => openDeleteModal(category._id)}
                                  href="#delete_modal"
                                  className="btn btn-sm bg-danger-light"
                                >
                                  <i className="fe fe-trash" /> Delete
                                </a>
                              </td>
                            </tr>
                          ))
                        )}
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
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="mb-3">
                          <label className="mb-2">Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* /ADD Modal */}
      {/* Edit Details Modal */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleEditSubmit}>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="mb-3">
                          <label className="mb-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* /Edit Details Modal */}
      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold text-danger">
                    Confirm Deletion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDeleteModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body pt-0">
                  <p className="mb-4">
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={closeDeleteModal}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="btn btn-danger"
                    >
                      <i className="fe fe-trash me-2"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* /Delete Modal */}
    </div>
  );
};

export default BlogCategory;
