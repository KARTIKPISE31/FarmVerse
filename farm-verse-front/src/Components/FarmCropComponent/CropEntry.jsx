import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCrop, generateCropId } from "../../Services/CropService";
import { getAllFarmIdsByUser } from "../../Services/FarmService";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";



const CropEntry = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [flag, setFlag] = useState(false);

  const [newId, setNewId] = useState("");

  const [idList, setIdList] = useState([]);



  const [crop, setCrop] = useState({

    cropId: "",

    farmId: "",

    cropName: "",

    cropArea: "",

    sownMonthYear: "",

    harvestMonthYear: "",

    yield: "",

  });



  useEffect(() => {

    loadCropId();

    loadFarmIds();

  }, []);



  const loadCropId = () => {

    generateCropId()

      .then((response) => {

        setNewId(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  };



  const loadFarmIds = () => {

    getAllFarmIdsByUser()

      .then((response) => {

        setIdList(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  };



  const handleLogout = () => {

    logoutUser().then(() => {

      localStorage.clear();

      sessionStorage.clear();

      navigate("/");

    });

  };



  const onChangeHandler = (event) => {

    const { name, value } = event.target;

    setCrop((prev) => ({

      ...prev,

      [name]:

        name === "farmId" || name === "cropArea" || name === "yield"

          ? Number(value)

          : value,

    }));

    setFlag(false);

  };



  const clearAll = () => {

    setCrop({

      cropId: "",

      farmId: "",

      cropName: "",

      cropArea: "",

      sownMonthYear: "",

      harvestMonthYear: "",

      yield: "",

    });

    setErrors({});

  };



  const saveCrop = () => {

    const cropData = {

      ...crop,

      cropId: newId,

    };



    addCrop(cropData)

      .then(() => {

        clearAll();

        loadCropId();

        setFlag(true);

      })

      .catch((error) => {

        console.log(error);

        alert("Unable to save crop record.");

      });

  };



  const handleValidation = (event) => {

    event.preventDefault();

    let tempErrors = {};

    let valid = true;



    if (!crop.farmId) {

      tempErrors.farmId = "Please select a Farm ID";

      valid = false;

    }



    if (!crop.cropName.trim()) {

      tempErrors.cropName = "Crop Name is required";

      valid = false;

    }



    if (!crop.cropArea || crop.cropArea <= 0) {

      tempErrors.cropArea = "Enter a valid Crop Area";

      valid = false;

    }



    if (!crop.sownMonthYear) {

      tempErrors.sownMonthYear = "Select Sown Month & Year";

      valid = false;

    }



    if (!crop.harvestMonthYear) {

      tempErrors.harvestMonthYear = "Select Harvest Month & Year";

      valid = false;

    }



    if (!crop.yield || crop.yield <= 0) {

      tempErrors.yield = "Enter expected yield value";

      valid = false;

    }



    setErrors(tempErrors);



    if (valid) {

      saveCrop();

    }

  };



  return (
    <div className="nn-scene">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />

      <Navbar className="dashboard-nav" expand="lg">
        <Container>
          <Navbar.Brand className="ag-brand" onClick={() => navigate("/farmer-menu")}>
            <span>🌾 FarmVerse</span>
            <span className="ag-brand-badge">AGTECH</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ag-navbar-nav" className="navbar-dark" />

          <Navbar.Collapse id="ag-navbar-nav">
            <Nav className="ms-auto align-items-center gap-2">
              <NavDropdown
                title={
                  <span className="ag-nav-link text-white fw-bold">
                    <i className="bi bi-grid-3x3-gap-fill text-success me-1"></i> Navigation
                  </span>
                }
                id="farm-dropdown"
                className="ag-dropdown"
              >
                <div className="dropdown-header-custom">🚜 FARMS</div>
                <NavDropdown.Item onClick={() => navigate("/farm-add")} className="ag-dropdown-item">
                  <i className="bi bi-plus-circle-fill text-success"></i> Farm Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/farm-list")} className="ag-dropdown-item">
                  <i className="bi bi-card-list text-primary"></i> Farm Directory
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <div className="dropdown-header-custom">🌱 CROPS</div>
                <NavDropdown.Item onClick={() => navigate("/crop-add")} className="ag-dropdown-item">
                  <i className="bi bi-sprout-fill text-success"></i> Crop Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/crop-list")} className="ag-dropdown-item">
                  <i className="bi bi-pie-chart-fill text-warning"></i> Crop List & Reports
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={handleLogout} className="ag-nav-link text-danger">
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="form-panel-card shadow-lg overflow-hidden border-0" style={{ borderRadius: "28px" }}>
              <div className="ag-table-header text-center text-md-start" style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}>
                <div>
                  <h3 className="fw-bold text-white mb-1">
                    <i className="bi bi-sprout text-warning me-2"></i> New Crop Cycle Entry
                  </h3>
                  <small className="text-white-50">Log crop species, sowing dates, and harvest predictions</small>
                </div>
                <span className="badge-ag-amber">Harvest Cycle</span>
              </div>

              <div className="p-4 p-md-5" style={{ background: "rgba(255,255,255,0.78)" }}>
                <form noValidate>
                  <div className="row">
                    <div className="col-md-6 form-group mb-4">
                      <label>Auto-Generated Crop ID</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-hash text-warning"></i>
                        </span>
                        <input
                          className="form-control bg-light fw-bold text-warning"
                          value={newId ? `#CROP-${newId}` : "Generating..."}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-md-6 form-group mb-4">
                      <label>Select Associated Farm ID</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-geo-alt-fill text-success"></i>
                        </span>
                        <select
                          className={`form-select crop-input-highlight ${errors.farmId ? "input-error" : ""}`}
                          name="farmId"
                          value={crop.farmId}
                          onChange={onChangeHandler}
                        >
                          <option value="">-- Select Farm ID --</option>
                          {idList.map((id) => (
                            <option key={id} value={id}>
                              Farm Parcel #{id}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.farmId && <p className="field-error">{errors.farmId}</p>}
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label>Crop Name / Species</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-flower3 text-success"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control crop-input-highlight ${errors.cropName ? "input-error" : ""}`}
                        placeholder="e.g. Wheat / Paddy Rice / Corn"
                        name="cropName"
                        value={crop.cropName}
                        onChange={onChangeHandler}
                      />
                    </div>
                    {errors.cropName && <p className="field-error">{errors.cropName}</p>}
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-4">
                      <label>Cultivated Area (Acres)</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-aspect-ratio text-primary"></i>
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          className={`form-control crop-input-highlight ${errors.cropArea ? "input-error" : ""}`}
                          placeholder="e.g. 5.5"
                          name="cropArea"
                          value={crop.cropArea}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {errors.cropArea && <p className="field-error">{errors.cropArea}</p>}
                    </div>

                    <div className="col-md-6 form-group mb-4">
                      <label>Estimated Yield (Quintals/Tons)</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-speedometer2 text-warning"></i>
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          className={`form-control crop-input-highlight ${errors.yield ? "input-error" : ""}`}
                          placeholder="e.g. 120"
                          name="yield"
                          value={crop.yield}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {errors.yield && <p className="field-error">{errors.yield}</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-4">
                      <label>Sown Month & Year</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-calendar-event text-info"></i>
                        </span>
                        <input
                          type="month"
                          className={`form-control crop-input-highlight ${errors.sownMonthYear ? "input-error" : ""}`}
                          name="sownMonthYear"
                          value={crop.sownMonthYear}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {errors.sownMonthYear && <p className="field-error">{errors.sownMonthYear}</p>}
                    </div>

                    <div className="col-md-6 form-group mb-4">
                      <label>Expected Harvest Month & Year</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-calendar-check text-warning"></i>
                        </span>
                        <input
                          type="month"
                          className={`form-control crop-input-highlight ${errors.harvestMonthYear ? "input-error" : ""}`}
                          name="harvestMonthYear"
                          value={crop.harvestMonthYear}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {errors.harvestMonthYear && <p className="field-error">{errors.harvestMonthYear}</p>}
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-4 pt-2">
                    <button
                      type="button"
                      className="btn-harvest-ag flex-grow-1"
                      onClick={handleValidation}
                    >
                      <i className="bi bi-check-circle-fill me-1"></i> Save Crop Harvest Record
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 fw-bold"
                      style={{ borderRadius: "12px" }}
                      onClick={clearAll}
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i> Reset
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark px-4 fw-bold"
                      style={{ borderRadius: "12px" }}
                      onClick={() => navigate("/farmer-menu")}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </button>
                  </div>
                </form>

                {flag && (
                  <div className="alert alert-success mt-4 mb-0 rounded-3 text-center border-0 fw-bold shadow-sm">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i> Crop Record Added Successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CropEntry;