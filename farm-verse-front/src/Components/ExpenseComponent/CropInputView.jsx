import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { getExpectedExpenses } from "../../Services/AIService";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

import {
  FaSeedling,
  FaWater,
  FaFlask,
  FaTractor,
  FaCalendarAlt,
  FaVectorSquare,
  FaSave,
  FaArrowLeft,
  FaLeaf,
  FaShieldAlt,
  FaChartLine,
  FaGlobeAmericas
} from "react-icons/fa";

const CropInputView = () => {
  const { cid } = useParams();
  const navigate = useNavigate();

  const [cropInputs, setCropInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Predicting crop inputs for:", cid);

    setLoading(true);
    setError("");

    getExpectedExpenses(cid)
      .then((response) => {
        console.log("AI Response:", response.data);
        setCropInputs(response.data);
      })
      .catch((error) => {
        console.error("Prediction Error:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        }

        setError("Unable to predict crop inputs.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cid]);

  const handleBack = () => {
    navigate("/crop-list");
  };

  const handleSave = () => {
    console.log("Saving details:", cropInputs);
  };

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="nn-scene">
        <span className="nn-cloud c1" />
        <span className="nn-cloud c2" />
        <span className="nn-grass" />

        <Navbar className="dashboard-nav" expand="lg">
          <Container fluid className="px-lg-5">
            <Navbar.Brand className="nav-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/farmer-menu")}>
              <i className="bi bi-flower3 nn-grow"></i>
              <span>FarmVerse Workspace</span>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <Container className="dashboard-container py-5 text-center">
          <div className="form-card-wrapper">
            <div className="form-panel-card p-5 shadow-lg border-0" style={{ borderRadius: "28px" }}>
              <div className="nn-tile green mx-auto mb-3" style={{ width: "80px", height: "80px", fontSize: "2.5rem" }}>
                <i className="bi bi-flower3 nn-grow"></i>
              </div>
              <h3 className="fw-bold text-dark mb-2">Analyzing Crop Requirements...</h3>
              <p className="text-muted small mb-4">
                AI is calculating optimal water, fertilizer, and resource inputs for Crop #{cid}.
              </p>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="nn-scene">
        <span className="nn-cloud c1" />
        <span className="nn-cloud c2" />
        <span className="nn-grass" />

        <Navbar className="dashboard-nav" expand="lg">
          <Container fluid className="px-lg-5">
            <Navbar.Brand className="nav-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/farmer-menu")}>
              <i className="bi bi-flower3 nn-grow"></i>
              <span>FarmVerse Workspace</span>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <Container className="dashboard-container py-5 text-center">
          <div className="form-card-wrapper">
            <div className="form-panel-card p-5 shadow-lg border-0" style={{ borderRadius: "28px" }}>
              <div className="nn-tile amber mx-auto mb-3" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                ❌
              </div>
              <h3 className="fw-bold text-dark mb-2">Prediction Failed</h3>
              <p className="text-danger fw-bold mb-4">{error}</p>
              <button
                className="btn-primary-ag px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2"
                style={{ borderRadius: "12px" }}
                onClick={handleBack}
              >
                <FaArrowLeft /> Return to Crop List
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // No Data State
  if (!cropInputs) {
    return (
      <div className="nn-scene">
        <span className="nn-cloud c1" />
        <span className="nn-cloud c2" />
        <span className="nn-grass" />

        <Navbar className="dashboard-nav" expand="lg">
          <Container fluid className="px-lg-5">
            <Navbar.Brand className="nav-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/farmer-menu")}>
              <i className="bi bi-flower3 nn-grow"></i>
              <span>FarmVerse Workspace</span>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <Container className="dashboard-container py-5 text-center">
          <div className="form-card-wrapper">
            <div className="form-panel-card p-5 shadow-lg border-0" style={{ borderRadius: "28px" }}>
              <div className="nn-tile green mx-auto mb-3" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                🌿
              </div>
              <h3 className="fw-bold text-dark mb-2">No Crop Input Data</h3>
              <p className="text-muted small mb-4">No prediction data was returned for Crop #{cid}.</p>
              <button
                className="btn-primary-ag px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2"
                style={{ borderRadius: "12px" }}
                onClick={handleBack}
              >
                <FaArrowLeft /> Return to Crop List
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="nn-scene">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />

      {/* Navigation Header */}
      <Navbar className="dashboard-nav" expand="lg">
        <Container fluid className="px-lg-5">
          <Navbar.Brand className="nav-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/farmer-menu")}>
            <i className="bi bi-flower3 nn-grow"></i>
            <span>FarmVerse Workspace</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="ag-navbar-nav" className="border-0" />
          <Navbar.Collapse id="ag-navbar-nav">
            <div className="ms-3 d-none d-md-flex align-items-center">
              <span className="ag-status-pill">
                <span className="ag-status-dot"></span> System Operational
              </span>
            </div>
            <Nav className="ms-auto align-items-center gap-2">
              <NavDropdown
                title={<span className="fw-bold"><i className="bi bi-grid-1x2-fill me-1"></i> Operations</span>}
                id="farm-dropdown"
                align="end"
                className="btn-nav-action"
              >
                <NavDropdown.Item onClick={() => navigate("/farm-add")}>
                  <i className="bi bi-plus-circle-fill" style={{ color: "#2E7D32" }}></i> Farm Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/farm-list")}>
                  <i className="bi bi-card-list" style={{ color: "#0369A1" }}></i> Farm Directory
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/crop-add")}>
                  <i className="bi bi-flower2" style={{ color: "#7CB342" }}></i> Crop Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/crop-list")}>
                  <i className="bi bi-pie-chart-fill" style={{ color: "#B45309" }}></i> Crop List &amp; Reports
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={<span className="fw-bold"><i className="bi bi-bar-chart-line-fill me-1"></i> Expense &amp; Analysis</span>}
                id="expense-dropdown"
                align="end"
                className="btn-nav-action"
              >
                <NavDropdown.Item onClick={() => navigate("/expense-add")}>
                  <i className="bi bi-plus-circle-fill" style={{ color: "#0d6efd" }}></i> Expense Entry
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/expense-list")}>
                  <i className="bi bi-list-ul" style={{ color: "#0d6efd" }}></i> Expense List
                </NavDropdown.Item>
              </NavDropdown>
              <button className="btn-nav-action logout-btn ms-lg-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="dashboard-container py-4">
        {/* Navigation Breadcrumb */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <button
            className="btn btn-outline-secondary btn-sm fw-bold px-3 py-2 d-inline-flex align-items-center gap-2"
            style={{ borderRadius: "12px", background: "rgba(255,255,255,0.85)" }}
            onClick={handleBack}
          >
            <FaArrowLeft /> Back to Crops
          </button>

          <span className="badge-ag-amber">
            🌱 Precision Crop Intelligence
          </span>
        </div>

        {/* Top Header Card / Banner */}
        <div className="form-panel-card p-4 p-md-5 overflow-hidden shadow-lg border-0 mb-4" style={{ borderRadius: "28px" }}>
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <div className="nn-tile green nn-float" style={{ width: "76px", height: "76px", fontSize: "2.4rem" }}>
              <FaSeedling />
            </div>
            <div>
              <span className="badge bg-success bg-opacity-20 text-success px-3 py-1 fw-bold mb-2" style={{ borderRadius: "8px" }}>
                Crop ID: #{cropInputs.cropId || cid}
              </span>
              <h1 className="display-6 fw-bold mb-1 text-dark">
                {cropInputs.cropName || "Crop Profile"} Details
              </h1>
              <p className="text-muted mb-0">
                Detailed agricultural parameters and AI-predicted resource input requirements
              </p>
            </div>
          </div>
        </div>

        <Row className="g-4">
          {/* Section 1: CROP DETAILS */}
          <Col lg={6}>
            <div className="form-panel-card p-4 h-100 shadow-lg border-0" style={{ borderRadius: "28px" }}>
              <div className="form-section-header">
                <div className="nn-tile lime">
                  <FaLeaf />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.3rem" }}>
                    Crop Details
                  </h3>
                  <small className="text-muted">Specifications and cycle timeline</small>
                </div>
              </div>

              <div className="info-grid">
                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaSeedling className="text-success" /> Crop Name
                  </span>
                  <span className="detail-info-value">{cropInputs.cropName || "-"}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaLeaf className="text-success" /> Crop ID
                  </span>
                  <span className="detail-info-value">#{cropInputs.cropId || "-"}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaGlobeAmericas className="text-success" /> Soil Type
                  </span>
                  <span className="detail-info-value badge bg-success bg-opacity-10 text-success px-3 py-1">
                    {cropInputs.soil || "-"}
                  </span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaVectorSquare className="text-success" /> Crop Area
                  </span>
                  <span className="detail-info-value">
                    {cropInputs.cropArea ?? "-"} {cropInputs.cropArea ? "Acres" : ""}
                  </span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaCalendarAlt className="text-success" /> Sown Month / Year
                  </span>
                  <span className="detail-info-value">{cropInputs.sownMonthYear || "-"}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaCalendarAlt className="text-success" /> Harvest Month / Year
                  </span>
                  <span className="detail-info-value">{cropInputs.harvestMonthYear || "-"}</span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaChartLine className="text-success" /> Expected Yield
                  </span>
                  <span className="detail-info-value text-success fw-bold">
                    {cropInputs.yield ?? "-"} {cropInputs.yield ? "Quintals" : ""}
                  </span>
                </div>
              </div>
            </div>
          </Col>

          {/* Section 2: FARM & RESOURCE REQUIREMENTS */}
          <Col lg={6}>
            <div className="form-panel-card p-4 h-100 shadow-lg border-0" style={{ borderRadius: "28px" }}>
              <div className="form-section-header">
                <div className="nn-tile green">
                  <FaTractor />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.3rem" }}>
                    Resource Requirements
                  </h3>
                  <small className="text-muted">AI predicted field inputs</small>
                </div>
              </div>

              <div className="info-grid">
                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaWater className="text-primary" /> Water Required
                  </span>
                  <span className="detail-info-value text-primary">
                    {cropInputs.waterGallon ?? "-"} Gallons
                  </span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaFlask className="text-success" /> Fertilizer Required
                  </span>
                  <span className="detail-info-value text-success">
                    {cropInputs.fertilizer ?? "-"} kg
                  </span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaShieldAlt className="text-warning" /> Pesticides Required
                  </span>
                  <span className="detail-info-value text-warning">
                    {cropInputs.pesticides ?? "-"} kg
                  </span>
                </div>

                <div className="detail-info-row">
                  <span className="detail-info-label">
                    <FaTractor className="text-dark" /> Tractor Usage
                  </span>
                  <span className="detail-info-value text-dark">
                    {cropInputs.tractorHour ?? "-"} hours
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top d-flex gap-3 flex-wrap">
                <button
                  className="btn-primary-ag flex-grow-1 py-3 fw-bold d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: "14px" }}
                  onClick={handleSave}
                >
                  <FaSave /> Save Details
                </button>

                <button
                  className="btn-nav-action flex-grow-1 py-3 fw-bold d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ borderRadius: "14px" }}
                  onClick={handleBack}
                >
                  <FaArrowLeft /> Return
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CropInputView;