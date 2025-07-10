import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Addpackage = () => {
  const mar = {
    marginRight: "7px",
    height: "15px",
    width: "15px",
  };
  const Navigate = useNavigate();
  const [packageType, setpackageType] = useState();
  const [description, setdescription] = useState();
  const [image, setimage] = useState();
  const [package_categoryId, setpackage_categoryId] = useState();
  const [Getdata, setGetdata] = useState();
  const [title, settitle] = useState();
  const [discount_price, setdiscount_price] = useState();
  const [report_time, setreport_time] = useState();
  const [fasting_time, setfasting_time] = useState();
  const [gender, setgender] = useState("Male");
  const [ageGroup, setageGroup] = useState();
  const [introduction, setintroduction] = useState();

  const [selectedTests, setSelectedTests] = useState([]);
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setprice] = useState(0);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const formData = new FormData();
        formData.append("empId", "KLR099101");
        formData.append("secretKey", "KLR@74123");

        const response = await axios.post(
          "https://medicityguwahati.in/klar_diag/api/getTestList/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status) {
          setTests(response.data.labTest);
        } else {
          console.error("Failed to fetch tests:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  const toggleTestSelection = (test) => {
    setSelectedTests((prev) => {
      const isSelected = prev.some((t) => t.test_id === test.test_id);

      if (isSelected) {
        setprice((prevPrice) => prevPrice - parseFloat(test.test_rate));
        return prev.filter((t) => t.test_id !== test.test_id);
      } else {
        setprice((prevPrice) => prevPrice + parseFloat(test.test_rate));
        return [
          ...prev,
          {
            test_id: test.test_id,
            test_name: test.test_name,
            test_rate: test.test_rate,
          },
        ];
      }
    });
  };

  const [offers, setOffers] = useState([
    {
      disc_percantage: "10",
      offerPrice: "0",
      price: "0",
      no_patient: "0",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedOffers = [...offers];
    updatedOffers[index][field] = value;
    setOffers(updatedOffers);
  };

  const addOffer = () => {
    setOffers([
      ...offers,
      { disc_percantage: "", offerPrice: "", price: "", no_patient: "" },
    ]);
  };

  const removeOffer = (index) => {
    const updatedOffers = offers.filter((_, i) => i !== index);
    setOffers(updatedOffers);
  };
  const addPackage = async () => {
    const formData = new FormData();

    formData.append("packageType", packageType);
    formData.append("description", description || "");
    formData.append("title", title);
    formData.append("price", price);
    formData.append("discount_price", discount_price);
    formData.append("report_time", report_time);
    formData.append("fasting_time", fasting_time);
    formData.append("gender", gender);
    formData.append("ageGroup", ageGroup);
    formData.append("interoduction", introduction);
    formData.append("total_test", selectedTests?.length);
    formData.append("package_categoryId", package_categoryId || "");
    formData.append("test", JSON.stringify(selectedTests));
    formData.append("offer", JSON.stringify(offers));

    if (image) {
      formData.append("image", image || "");
    }
    console.log(gender);
    

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}addPackage`,
        formData
      );

      toast.success(response.data.message);
      setTimeout(() => {
        Navigate("/Packagelist");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add package");
    }
  };

  useEffect(() => {
    GetAllPackageCategories();
  }, [0]);
  const GetAllPackageCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}getAllPackageCategories`)
      .then((res) => {
        setGetdata(res.data.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="main-wrapper">
      <Toaster />

      {/* /Sidebar */}
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Add Health Checkup Package</h3>
                {/* <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li className="breadcrumb-item active">Basic Inputs</li>
              </ul> */}
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Package Details</h4>
                </div>
                <div className="card-body">
                  <div>
                    <div class="mb-3 row">
                      <label class="col-form-label col-md-3">
                        Package Type
                      </label>
                      <div class="col-md-9">
                        <select
                          required
                          onChange={(e) => setpackageType(e.target.value)}
                          className="form-select form-control"
                          value={packageType}
                        >
                          <option value="">-- Select --</option>

                          <option value="Doctors Curated Health">
                            Doctors Curated Health
                          </option>
                          {/* <option  value="Top Health Packages">
                            Top Health Packages
                            </option> */}
                          <option value="Featured Family Care">
                            Featured Family Care
                          </option>
                          <option value="Best Packages">Best Packages</option>
                        </select>
                      </div>
                    </div>
                    {packageType == "Doctors Curated Health" ? (
                      <div class="mb-3 row">
                        <label class="col-form-label col-md-3">
                          Doctors Curated
                        </label>
                        <div class="col-md-9">
                          <select
                            required
                            onChange={(e) =>
                              setpackage_categoryId(e.target.value)
                            }
                            className="form-select form-control"
                            value={package_categoryId}
                          >
                            <option value="">-- Select --</option>
                            {Getdata?.filter(
                              (data) => data?.type === "Doctors Curated"
                            )?.map((data) => (
                              <option key={data._id} value={data._id}>
                                {data?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : packageType == "Best Packages" ? (
                      <div class="mb-3 row">
                        <label class="col-form-label col-md-3">
                          Best Packages
                        </label>
                        <div class="col-md-9">
                          <select
                            required
                            onChange={(e) =>
                              setpackage_categoryId(e.target.value)
                            }
                            className="form-select form-control"
                            value={package_categoryId}
                          >
                            <option value="">-- Select --</option>
                            {Getdata?.filter(
                              (data) => data?.type === "Best Packages"
                            )?.map((data) => (
                              <option key={data._id} value={data._id}>
                                {data?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Package Name
                      </label>
                      <div className="col-md-9">
                        <input
                          required
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                          type="text"
                          placeholder="Fit India Full Body Checkup with Free HbA1c"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">Price</label>
                      <div className="col-md-9">
                        <input
                          min={0}
                          required
                          value={price}
                          onChange={(e) => setprice(e.target.value)}
                          type="number"
                          placeholder="₹1099"
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Dicount price
                      </label>
                      <div className="col-md-9">
                        <input
                          min={0}
                          required
                          value={discount_price}
                          onChange={(e) => setdiscount_price(e.target.value)}
                          type="number"
                          placeholder="₹5099"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Reports in hours
                      </label>
                      <div className="col-md-9">
                        <input
                          min={0}
                          required
                          value={report_time}
                          onChange={(e) => setreport_time(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="8"
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">Fasting</label>
                      <div className="col-md-9">
                        <input
                          min={0}
                          required
                          value={fasting_time}
                          onChange={(e) => setfasting_time(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="10-12 Hrs Required
"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-form-label col-md-3">
                        Recommended Gender
                      </label>
                      <div class="col-md-9">
                        <select
                          required
                          value={gender}
                          onChange={(e) => setgender(e.target.value)}
                          className="form-select form-control"
                        >
                          <option value="" disabled>
                            -- Select --
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Child">Child</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Age Group
                      </label>
                      <div className="col-md-9">
                        <input
                          min={0}
                          required
                          value={ageGroup}
                          onChange={(e) => setageGroup(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Above 15 Years

"
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Introduction
                      </label>
                      <div className="col-md-9">
                        <textarea
                          required
                          value={introduction}
                          onChange={(e) => setintroduction(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Add interoduction

"
                        />
                      </div>
                    </div>

                    {offers?.map((offer, index) => (
                      <div key={index} className="mb-3 row">
                        <label className="col-form-label col-md-3">
                          Offers ({offer.disc_percantage}% Off on{" "}
                          {offer.no_patient} Patient ₹{offer.offerPrice} ₹
                          <del>{offer.price}</del>)
                        </label>
                        <div className="col-md-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Discount %"
                            value={offer.disc_percantage}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "disc_percantage",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-1">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="No. of Patients"
                            value={offer.no_patient}
                            onChange={(e) =>
                              handleChange(index, "no_patient", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Offer Price"
                            value={offer.offerPrice}
                            onChange={(e) =>
                              handleChange(index, "offerPrice", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Original Price"
                            value={offer.price}
                            onChange={(e) =>
                              handleChange(index, "price", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-2 d-flex">
                          <div>
                            <div
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeOffer(index)}
                            >
                              X
                            </div>
                            &nbsp;{" "}
                            <div
                              type="button"
                              className="btn btn-primary"
                              onClick={addOffer}
                            >
                              Add
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">
                        Total Tests
                      </label>
                      <div className="col-md-9">
                        <input
                          value={selectedTests?.length}
                          type="text"
                          disabled
                          className="form-control"
                          placeholder="80"
                        />
                      </div>
                    </div>

                    {/* <div className="mb-3 row">
                      {Array(3)
                        .fill()
                        .map((_, colIndex) => (
                          <div
                            key={colIndex}
                            className="col-form-label col-md-4"
                          >
                            <label className="col-form-label">Tests</label>
                            <div>
                              {tests
                                .slice(colIndex * 2, colIndex * 2 + 2)
                                .map((test, index) => (
                                  <div className="checkbox" key={index}>
                                    <label>
                                      <input
                                        style={mar}
                                        type="checkbox"
                                        checked={selectedTests.includes(test)}
                                        onChange={() =>
                                          handleCheckboxChange(test)
                                        }
                                      />
                                      {test}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div> */}

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                          color: "#212529",
                        }}
                      >
                        Select Tests
                      </label>

                      {/* Search input */}
                      <input
                        type="text"
                        placeholder="Search tests..."
                        style={{
                          width: "100%",
                          padding: "0.5rem 0.75rem",
                          marginBottom: "0.5rem",
                          fontSize: "1rem",
                          border: "1px solid #ced4da",
                          borderRadius: "0.375rem",
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />

                      <div
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          fontSize: "1rem",
                          lineHeight: "1.5",
                          color: "#495057",
                          backgroundColor: "#fff",
                          border: "1px solid #ced4da",
                          borderRadius: "0.375rem",
                          height: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {tests
                          .filter((test) =>
                            test.test_name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((test) => (
                            <div
                              key={test.test_id}
                              style={{
                                padding: "0.5rem",
                                margin: "0.125rem 0",
                                borderRadius: "0.25rem",
                                backgroundColor: selectedTests.some(
                                  (t) => t.test_id === test.test_id
                                )
                                  ? "#e9ecef"
                                  : "transparent",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                              }}
                              onClick={() => toggleTestSelection(test)} // ✅ Pass full test object
                            >
                              <input
                                type="checkbox"
                                checked={selectedTests.some(
                                  (t) => t.test_id === test.test_id
                                )} // ✅ Compare by test_id
                                onChange={() => toggleTestSelection(test)} // ✅ Pass full test object
                                style={{
                                  marginRight: "0.75rem",
                                  cursor: "pointer",
                                }}
                              />
                              {test.test_name}
                            </div>
                          ))}
                      </div>
                      <div style={{ marginTop: "1rem", fontWeight: "500" }}>
                        Total Price: ₹{price}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-form-label col-md-3">Image</label>
                      <div className="col-md-9">
                        {image ? (
                          <img
                            height={80}
                            width={80}
                            style={{ borderRadius: "5px" }}
                            src={URL.createObjectURL(image)}
                          />
                        ) : null}
                        <input
                          onChange={(e) => setimage(e.target.files[0])}
                          type="file"
                          accept="image/*"
                          className="form-control"
                          placeholder="80"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addPackage}
                      type="button"
                      className="btn btn-primary float-end mt-2"
                    >
                      +Add Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </div>
  );
};

export default Addpackage;
