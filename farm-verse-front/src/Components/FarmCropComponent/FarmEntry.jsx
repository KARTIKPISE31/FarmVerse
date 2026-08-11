import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFarm, generateFarmId } from "../../Services/FarmService";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const FarmEntry = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [newId, setNewId] = useState(0);

  const [farm, setFarm] = useState({
    farmId: 0,
    farmName: "",
    area: "",
    username: "abcd",
    soil: "",
  });

  useEffect(() => {
    generateFarmId().then((response) => {
      setNewId(response.data);
    });
    setFlag(false);
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFarm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFlag(false);
  };

  const saveFarm = (event) => {
    event.preventDefault();
    const farmData = {
      ...farm,
      farmId: newId,
    };

    addFarm(farmData).then(() => {
      setFlag(true);
      setFarm({
        farmId: 0,
        farmName: "",
        area: "",
        username: "abcd",
        soil: "",
      });

      generateFarmId().then((response) => {
        setNewId(response.data);
      });
      setErrors({});
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!farm.farmName.trim()) {
      tempErrors.farmName = "Farm Name is required";
      isValid = false;
    }

    if (farm.area === "" || Number(farm.area) <= 0) {
      tempErrors.area = "Enter a valid farm area (greater than 0)";
      isValid = false;
    }

    if (!farm.soil.trim()) {
      tempErrors.soil = "Select a soil type";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      saveFarm(event);
    }
  };

  const clearAll = (event) => {
    event.preventDefault();
    setFarm({
      farmId: 0,
      farmName: "",
      area: "",
      username: "abcd",
      soil: "",
    });
    setErrors({});
    setFlag(false);
  };

  return (
    <div className="nn-scene">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />

      <Navbar className="dashboard-nav" expand="lg">
        <Container fluid>
          <Navbar.Brand className="nav-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/farmer-menu")}>
            <i className="bi bi-sprout-fill"></i>
            <span>FarmVerse Workspace</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ag-navbar-nav" className="border-0 text-white" />

          <Navbar.Collapse id="ag-navbar-nav">
            <Nav className="ms-auto align-items-center gap-2">
              <NavDropdown
                title={
                  <span className="text-white fw-semibold">
                    <i className="bi bi-grid-1x2-fill me-1"></i> Operations
                  </span>
                }
                id="farm-dropdown"
                align="end"
                className="btn-nav-action"
              >
                <NavDropdown.Item onClick={() => navigate("/farm-add")} className="text-dark">
                  <i className="bi bi-plus-circle-fill me-2 text-success"></i> Farm Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/farm-list")} className="text-dark">
                  <i className="bi bi-card-list me-2 text-primary"></i> Farm Directory
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/crop-add")} className="text-dark">
                  <i className="bi bi-sprout-fill me-2 text-success"></i> Crop Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/crop-list")} className="text-dark">
                  <i className="bi bi-pie-chart-fill me-2 text-warning"></i> Crop List & Reports
                </NavDropdown.Item>
              </NavDropdown>

              <button className="btn-nav-action logout-btn ms-lg-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="dashboard-container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="form-panel-card p-0 overflow-hidden shadow-lg" style={{ borderRadius: "28px" }}>
              <div
                className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3"
                style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}
              >
                <div>
                  <h3 className="fw-bold mb-1">
                    <i className="bi bi-geo-alt-fill text-success me-2"></i>Farm Registration
                  </h3>
                  <p className="text-white-50 small mb-0">Register a new land parcel into your workspace</p>
                </div>
                <span className="badge bg-success px-3 py-2 fw-bold" style={{ borderRadius: "10px" }}>
                  Field Parcel
                </span>
              </div>

              <div className="p-4 p-md-5" style={{ background: "rgba(255,255,255,0.78)" }}>
                <form noValidate>
                  <div className="form-group mb-4">
                    <label className="form-label fw-bold text-secondary mb-2">Auto-Generated Farm ID</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-hash text-muted"></i>
                      </span>
                      <input
                        className="form-control bg-light fw-bold text-success border-start-0"
                        value={newId ? `#FARM-${newId}` : "Generating..."}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label fw-bold text-secondary mb-2">Farm Name / Field Title</label>
                    <div className="input-group">
                      <span className={`input-group-text bg-white ${errors.farmName ? "border-danger" : ""}`}>
                        <i className="bi bi-card-text text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${errors.farmName ? "is-invalid" : ""}`}
                        placeholder="e.g. Green Valley Plot A"
                        name="farmName"
                        value={farm.farmName}
                        onChange={onChangeHandler}
                      />
                    </div>
                    {errors.farmName && <div className="text-danger small fw-bold mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.farmName}</div>}
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label fw-bold text-secondary mb-2">Farm Area (in Acres)</label>
                    <div className="input-group">
                      <span className={`input-group-text bg-white ${errors.area ? "border-danger" : ""}`}>
                        <i className="bi bi-aspect-ratio text-muted"></i>
                      </span>
                      <input
                        type="number"
                        step="0.1"
                        className={`form-control ${errors.area ? "is-invalid" : ""}`}
                        placeholder="e.g. 12.5"
                        name="area"
                        value={farm.area}
                        onChange={onChangeHandler}
                      />
                    </div>
                    {errors.area && <div className="text-danger small fw-bold mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.area}</div>}
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label fw-bold text-secondary mb-2">Primary Soil Category</label>
                    <div className="input-group">
                      <span className={`input-group-text bg-white ${errors.soil ? "border-danger" : ""}`}>
                        <i className="bi bi-layers-fill text-muted"></i>
                      </span>
                      <select
                        className={`form-select ${errors.soil ? "is-invalid" : ""}`}
                        name="soil"
                        value={farm.soil}
                        onChange={onChangeHandler}
                      >
                        <option value="">-- Select Soil Type --</option>
                        <option value="Alluvial">Alluvial Soil (High Yield)</option>
                        <option value="Black">Black Soil (Cotton/Grain)</option>
                        <option value="Red">Red Soil (Loamy)</option>
                        <option value="Laterite">Laterite Soil</option>
                        <option value="Mountain">Mountain Soil</option>
                        <option value="Desert">Desert Soil</option>
                        <option value="Saline">Saline Soil</option>
                        <option value="Peaty">Peaty Organic Soil</option>
                      </select>
                    </div>
                    {errors.soil && <div className="text-danger small fw-bold mt-1"><i className="bi bi-exclamation-circle me-1"></i>{errors.soil}</div>}
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-success fw-bold flex-grow-1 py-2"
                      style={{ borderRadius: "14px" }}
                      onClick={handleValidation}
                    >
                      <i className="bi bi-check-circle-fill me-1"></i> Save Farm Entry
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary px-3 fw-bold py-2"
                      style={{ borderRadius: "14px" }}
                      onClick={clearAll}
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i> Reset
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark px-3 fw-bold py-2"
                      style={{ borderRadius: "14px" }}
                      onClick={() => navigate("/farmer-menu")}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </button>
                  </div>
                </form>

                {flag && (
                  <div className="alert alert-success mt-4 mb-0 rounded-3 text-center border-0 fw-bold shadow-sm py-3 animate-fade-in">
                    <i className="bi bi-check-circle-fill me-2 fs-5 align-middle"></i> Farm Parcel Added Successfully!
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

export default FarmEntry;