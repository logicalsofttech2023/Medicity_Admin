import axios from "axios";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRef } from "react";

const BlogList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    description: "",
    categoryName: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}blogCategoryList`)
      .then((res) => {
        setCategories(res.data.data || []); // Adjust based on API response structure
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    GetAllBlog();
  }, []);
  const GetAllBlog = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}getAllBlog`)
      .then((response) => {
        console.log(response);

        setBlogData(response.data.data);
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

    const fd = new FormData();

    fd.append("title", title);
    fd.append("description", description);
    fd.append("categoryName", categoryName);

    // if `image` is a File object (e.g., from an <input type="file" />)
    if (image) {
      fd.append("image", image); // no need to JSON stringify
    }

    axios
      .post(`${process.env.REACT_APP_API_KEY}createBlogPost`, fd)
      .then((response) => {
        toast.success(response.data.message);
        GetAllBlog();
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
        GetAllBlog();
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

  const openEditModal = (blog) => {
    setEditData({
      id: blog._id,
      title: blog.title,
      description: blog.description,
      categoryName: blog.categoryName,
      image: blog.image,
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
    const formData = new FormData();

    formData.append("blogId", editData.id);
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    formData.append("categoryName", editData.categoryName);

    // Check and append image only if it's a File (not a URL or empty)
    if (editData.image instanceof File) {
      formData.append("image", editData.image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}updateBlog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      GetAllBlog();
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
                <h3 className="page-title">Blog List</h3>
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
                    <table
                      className="datatable table table-hover table-center mb-0"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th style={{ width: "5%" }}>#</th>
                          <th style={{ width: "15%" }}>Image</th>
                          <th style={{ width: "15%" }}>Title</th>
                          <th style={{ width: "15%" }}>Category</th>
                          <th style={{ width: "30%" }}>Description</th>

                          <th style={{ width: "20%" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                              <p className="mt-2 mb-0">Loading data...</p>
                            </td>
                          </tr>
                        ) : blogData.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              <i
                                className="fe fe-database"
                                style={{ fontSize: "2rem", color: "#6c757d" }}
                              />
                              <p className="mt-2 mb-0 text-muted">
                                No data found
                              </p>
                            </td>
                          </tr>
                        ) : (
                          blogData.map((category, index) => (
                            <tr key={index} style={{ verticalAlign: "middle" }}>
                              <td className="text-muted">{index + 1}</td>
                              <td>
                                <div
                                  className="d-flex justify-content-center"
                                  style={{ width: "80px", height: "80px" }}
                                >
                                  <img
                                    src={`${process.env.REACT_APP_IMG_URL}${category.image}`}
                                    alt={category.title}
                                    className="img-thumbnail rounded"
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://dummyimage.com/300`;
                                    }}
                                  />
                                </div>
                              </td>
                              <td>{category.title}</td>
                              <td>
                                <span className="badge bg-info-light text-info">
                                  {category.categoryName}
                                </span>
                              </td>
                              <td>
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "300px",
                                  }}
                                >
                                  {category.description}
                                </div>
                              </td>

                              <td>
                                <div className="d-flex">
                                  <button
                                    onClick={() => openEditModal(category)}
                                  className="btn btn-sm bg-success-light me-2"
                                    style={{ minWidth: "70px" }}
                                  >
                                    <i className="fe fe-pencil me-1" /> Edit
                                  </button>
                                  {/* <button
                                    onClick={() =>
                                      openDeleteModal(category._id)
                                    }
                                    className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                    style={{ minWidth: "80px" }}
                                  >
                                    <i className="fe fe-trash me-1" /> Delete
                                  </button> */}
                                </div>
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
    <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}></div>
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content" style={{ 
          borderRadius: '10px',
          border: 'none',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
        }}>
          {/* Modal Header */}
          <div className="modal-header" style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            padding: '1.2rem'
          }}>
            <h5 className="modal-title" style={{
              fontSize: '1.4rem',
              fontWeight: '600',
              color: '#2c3e50',
              margin: 0
            }}>Create New Blog Post</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
              style={{
                fontSize: '1rem',
                padding: '0.5rem',
                margin: '-0.5rem -0.5rem -0.5rem auto'
              }}
            />
          </div>

          {/* Modal Body */}
          <div className="modal-body" style={{ padding: '1.5rem' }}>
            <form onSubmit={handleSubmit}>
              <div className="row" style={{ marginBottom: '1rem' }}>
                {/* Title */}
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label className="form-label" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#495057'
                    }}>Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                      style={{
                        borderRadius: '6px',
                        padding: '0.75rem 1rem',
                        border: '1px solid #ced4da',
                        transition: 'border-color 0.15s ease-in-out',
                        fontSize: '0.95rem'
                      }}
                      required
                      placeholder="Enter blog title"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label className="form-label" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#495057'
                    }}>Category *</label>
                    <select
                      className="form-select"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      style={{
                        borderRadius: '6px',
                        padding: '0.75rem 1rem',
                        border: '1px solid #ced4da',
                        fontSize: '0.95rem',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%23343a40\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M2 5l6 6 6-6\'/%3e%3c/svg%3e")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '16px 12px'
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                  <div className="form-group">
                    <label className="form-label" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#495057'
                    }}>Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      rows="5"
                      style={{
                        borderRadius: '6px',
                        padding: '0.75rem 1rem',
                        border: '1px solid #ced4da',
                        fontSize: '0.95rem',
                        minHeight: '120px'
                      }}
                      required
                      placeholder="Write your blog content here..."
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="col-12 mb-4">
                  <div className="form-group">
                    <label className="form-label" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#495057'
                    }}>Featured Image *</label>
                    <div style={{
                      border: '2px dashed #dee2e6',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <i className="bi bi-cloud-arrow-up" style={{
                          fontSize: '2.5rem',
                          color: '#6c757d',
                          marginBottom: '0.5rem'
                        }}></i>
                        <p style={{
                          marginBottom: '0.5rem',
                          color: '#212529',
                          fontWeight: '500'
                        }}>Upload your blog image</p>
                        <p style={{
                          fontSize: '0.8rem',
                          color: '#6c757d',
                          marginBottom: '1rem'
                        }}>PNG, JPG or JPEG (Max. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control"
                        style={{
                          width: 'auto',
                          margin: '0 auto',
                          border: 'none',
                          padding: '0.5rem'
                        }}
                        required
                      />
                      {image && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '0.5rem',
                          backgroundColor: '#e8f4fd',
                          borderRadius: '4px',
                          display: 'inline-block'
                        }}>
                          <i className="bi bi-check-circle-fill" style={{
                            color: '#28a745',
                            marginRight: '0.5rem'
                          }}></i>
                          <span style={{ fontSize: '0.9rem' }}>{image.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #e9ecef'
              }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#f8f9fa',
                    color: '#495057',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#0d6efd',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                >
                  <i className="bi bi-save" style={{ marginRight: '0.5rem' }}></i>
                  Publish Blog
                </button>
              </div>
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
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1040,
            }}
          ></div>

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1050,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              overflow: "auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                width: "100%",
                maxWidth: "700px",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f8f9fa",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <h5
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Edit Blog Post
                </h5>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#6c757d",
                    padding: "0",
                    lineHeight: 1,
                  }}
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: "20px" }}>
                <form onSubmit={handleEditSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Title Field */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 500,
                          color: "#495057",
                        }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editData.title || ""}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid #ced4da",
                          fontSize: "14px",
                          transition: "border-color 0.15s ease-in-out",
                        }}
                        required
                      />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 500,
                          color: "#495057",
                        }}
                      >
                        Category
                      </label>
                      <select
                        name="categoryName"
                        value={editData.categoryName || ""}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid #ced4da",
                          fontSize: "14px",
                          backgroundColor: "#fff",
                          appearance: "none",
                          backgroundImage:
                            "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 10px center",
                          backgroundSize: "1em",
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description Field */}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 500,
                          color: "#495057",
                        }}
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={editData.description || ""}
                        onChange={handleInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid #ced4da",
                          fontSize: "14px",
                          minHeight: "100px",
                          resize: "vertical",
                        }}
                        required
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div style={{ gridColumn: "1/-1" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: 500,
                          color: "#495057",
                        }}
                      >
                        Featured Image
                      </label>

                      <div
                        style={{
                          border: "2px dashed #dee2e6",
                          borderRadius: "8px",
                          padding: "20px",
                          textAlign: "center",
                          backgroundColor: "#f8f9fa",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {/* Current Image Preview */}
                        {editData.image && !editData.imagePreview && (
                          <div
                            style={{
                              marginBottom: "20px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                marginBottom: "10px",
                                color: "#6c757d",
                                fontSize: "14px",
                              }}
                            >
                              Current Image
                            </p>
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={`${process.env.REACT_APP_IMG_URL}${editData.image}`}
                                alt="Current"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #dee2e6",
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/150";
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    image: null,
                                  }))
                                }
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  background: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "25px",
                                  height: "25px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                }}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}

                        {/* New Image Preview */}
                        {editData.imagePreview && (
                          <div
                            style={{
                              marginBottom: "20px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                marginBottom: "10px",
                                color: "#28a745",
                                fontSize: "14px",
                              }}
                            >
                              New Image Selected
                            </p>
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={editData.imagePreview}
                                alt="Preview"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #dee2e6",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  URL.revokeObjectURL(editData.imagePreview);
                                  setEditData((prev) => ({
                                    ...prev,
                                    imagePreview: null,
                                  }));
                                }}
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  background: "#6c757d",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "25px",
                                  height: "25px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                }}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}

                        {/* File Upload Area */}
                        <div
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            padding: "10px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                if (editData.imagePreview) {
                                  URL.revokeObjectURL(editData.imagePreview);
                                }
                                setEditData((prev) => ({
                                  ...prev,
                                  image: e.target.files[0],
                                  imagePreview: URL.createObjectURL(
                                    e.target.files[0]
                                  ),
                                }));
                              }
                            }}
                            style={{
                              width: "100%",
                              fontSize: "14px",
                            }}
                          />
                          <p
                            style={{
                              marginTop: "10px",
                              fontSize: "13px",
                              color: "#6c757d",
                            }}
                          >
                            {!editData.image && !editData.imagePreview
                              ? "No image selected"
                              : "Select a new image to replace current"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                      paddingTop: "20px",
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                    >
                      Update Post
                    </button>
                  </div>
                </form>
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

export default BlogList;
