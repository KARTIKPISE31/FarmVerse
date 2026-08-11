import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import { getFarmsByUsername } from "../../Services/FarmService";
import { getCropsByUsername } from "../../Services/CropService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../DisplayView.css";

const FarmerMenu = () => {
  const navigate = useNavigate();
  const [farmCount, setFarmCount] = useState(null);
  const [cropCount, setCropCount] = useState(null);

  useEffect(() => {
    getFarmsByUsername()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFarmCount(res.data.length);
        }
      })
      .catch((error) => console.log(error));

    getCropsByUsername()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCropCount(res.data.length);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  
   return (
    <div className="nn-scene">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />

      <Navbar className="dashboard-nav" expand="lg">
        <Container fluid className="px-lg-5">
          <Navbar.Brand className="nav-brand" onClick={() => navigate("/farmer-menu")}>
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
              </NavDropdown>              <NavDropdown
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
              </NavDropdown>              <button className="btn-nav-action logout-btn ms-lg-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="nn-hero">
        <Container fluid className="px-lg-5">
          <Row className="align-items-center">
            <Col md={8}>
              <span className="nn-badge mb-3">🌿 FarmVerse Operations Portal</span>
              <h1 className="display-5 fw-bold mb-2 mt-3">Precision Agriculture Dashboard</h1>
              <p className="lead mb-4" style={{ color: "rgba(255,255,255,.78)", maxWidth: 620 }}>
                Real-time tracking of soil health, crop cycles, and farm performance analytics in one unified platform.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <div className="nn-chip">
                  <i className="bi bi-sun-fill fs-5" style={{ color: "#C6FF00" }}></i>
                  <div>
                    <small className="d-block" style={{ fontSize: 11, opacity: .7 }}>FIELD TEMP</small>
                    <span className="fw-bold">26°C Optimal</span>
                  </div>
                </div>
                <div className="nn-chip">
                  <i className="bi bi-droplet-half fs-5" style={{ color: "#8ED8FF" }}></i>
                  <div>
                    <small className="d-block" style={{ fontSize: 11, opacity: .7 }}>SOIL MOISTURE</small>
                    <span className="fw-bold">68% Good</span>
                  </div>
                </div>
                <div className="nn-chip">
                  <i className="bi bi-cloud-sun-fill fs-5" style={{ color: "#DFF3D8" }}></i>
                  <div>
                    <small className="d-block" style={{ fontSize: 11, opacity: .7 }}>WEATHER</small>
                    <span className="fw-bold">Partly Cloudy</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4} className="mt-4 mt-md-0 text-center">
              <div className="nn-chip nn-float flex-column p-4" style={{ borderRadius: 24 }}>
                <i className="bi bi-shield-check display-4 mb-2" style={{ color: "#C6FF00" }}></i>
                <h5 className="fw-bold mb-1">Active Harvest Season</h5>
                <p className="small mb-0" style={{ opacity: .75 }}>All sensor systems and database sync active.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="px-lg-5 nn-content pb-5">
        <div className="soft-panel p-4 mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <div className="section-label mb-2"><i className="bi bi-capslock-fill"></i> Fresh overview</div>
              <h3 className="fw-bold mb-1" style={{ color: "#163020" }}>Your agri intelligence workspace remains clear and actionable.</h3>
            </div>
            <div className="metric-pill"><i className="bi bi-broadcast-pin"></i> Connected • Live Sync</div>
          </div>
        </div>
        <Row className="g-4">
          <Col md={3} sm={6}>
            <div className="form-panel-card nn-float p-4 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: "24px" }}>
              <div>
                <div className="nn-tile green mb-3"><i className="bi bi-pin-map-fill"></i></div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: ".5px" }}>Registered Farms</span>
                <h2 className="display-6 fw-bold mb-1 mt-1">{farmCount !== null ? farmCount : "--"}</h2>
              </div>
              <small className="fw-bold mt-2" style={{ color: "#2E7D32" }}><i className="bi bi-arrow-up-short"></i> Verified Fields</small>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="form-panel-card nn-float d1 p-4 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: "24px" }}>
              <div>
                <div className="nn-tile lime mb-3"><i className="bi bi-flower3 nn-grow"></i></div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: ".5px" }}>Active Crops</span>
                <h2 className="display-6 fw-bold mb-1 mt-1">{cropCount !== null ? cropCount : "--"}</h2>
              </div>
              <small className="fw-bold mt-2" style={{ color: "#558B2F" }}><i className="bi bi-check-circle me-1"></i> Season 2026</small>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="form-panel-card nn-float d2 p-4 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: "24px" }}>
              <div>
                <div className="nn-tile amber mb-3"><i className="bi bi-graph-up-arrow"></i></div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: ".5px" }}>Yield Efficiency</span>
                <h2 className="display-6 fw-bold mb-1 mt-1">96.4%</h2>
              </div>
              <small className="fw-bold mt-2" style={{ color: "#B45309" }}><i className="bi bi-lightning-charge-fill me-1"></i> High Productivity</small>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="form-panel-card nn-float d3 p-4 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: "24px" }}>
              <div>
                <div className="nn-tile sky mb-3"><i className="bi bi-shield-shaded"></i></div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: ".5px" }}>Soil Quality Index</span>
                <h2 className="display-6 fw-bold mb-1 mt-1">A+ Grade</h2>
              </div>
              <small className="fw-bold mt-2" style={{ color: "#0369A1" }}><i className="bi bi-award-fill me-1"></i> Optimal Nitrogen</small>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mt-2">
          <Col lg={4} md={6}>
            <div className="form-panel-card p-4 p-md-5 h-100 d-flex flex-column" style={{ borderRadius: "24px" }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="nn-tile dark"><i className="bi bi-geo-alt-fill"></i></div>
                <div>
                  <h3 className="fw-bold mb-0">Farm Management</h3>
                  <small className="text-muted">Register, edit, and review land parcels</small>
                </div>
              </div>
              <p className="text-secondary mb-4 flex-grow-1">
                Maintain accurate records of your farm locations, soil types (Alluvial, Black, Red, etc.), total acreage, and land ownership data.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn-primary-ag flex-grow-1" onClick={() => navigate("/farm-add")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-plus-circle-fill"></i> Add New Farm
                </button>
                <button className="btn-nav-action flex-grow-1 p-3" onClick={() => navigate("/farm-list")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-list-ul me-1"></i> View Farm Directory
                </button>
              </div>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="form-panel-card p-4 p-md-5 h-100 d-flex flex-column" style={{ borderRadius: "24px" }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="nn-tile dark"><i className="bi bi-flower3 nn-grow"></i></div>
                <div>
                  <h3 className="fw-bold mb-0">Crop &amp; Harvest Management</h3>
                  <small className="text-muted">Monitor sowing schedules &amp; yield analytics</small>
                </div>
              </div>
              <p className="text-secondary mb-4 flex-grow-1">
                Log sowing dates, anticipated harvest timelines, crop varieties, and generate automated AI yield predictions for maximum profit.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn-primary-ag flex-grow-1" onClick={() => navigate("/crop-add")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-flower2"></i> Register Crop Cycle
                </button>
                <button className="btn-nav-action flex-grow-1 p-3" onClick={() => navigate("/crop-list")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-bar-chart-fill me-1"></i> Crop Reports &amp; Yield
                </button>
              </div>
            </div>
          </Col>

          <Col lg={4} md={12}>
            <div className="form-panel-card p-4 p-md-5 h-100 d-flex flex-column" style={{ borderRadius: "24px" }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="nn-tile dark"><i className="bi bi-bar-chart-line-fill"></i></div>
                <div>
                  <h3 className="fw-bold mb-0">Expense &amp; Analysis</h3>
                  <small className="text-muted">Track farm expense entry and review expense lists</small>
                </div>
              </div>
              <p className="text-secondary mb-4 flex-grow-1">
                Add new agro expense records, review past costs, and keep expense analytics aligned with your farm operations.
              </p>
              <div className="d-flex flex-column gap-3">
                <button className="btn-primary-ag" onClick={() => navigate("/expense-add")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-plus-circle-fill"></i> Expense Entry
                </button>
                <button className="btn-nav-action p-3" onClick={() => navigate("/expense-list")} style={{ borderRadius: "16px" }}>
                  <i className="bi bi-list-ul me-1"></i> Expense List
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <footer className="text-center mt-5 pt-4 nn-footer">
          <p className="fw-bold mb-1"><strong>🌾 FarmVerse AgTech Systems</strong></p>
          <small>© 2026 FarmVerse. Empowering Farmers with Modern Precision Tech.</small>
        </footer>
      </Container>
    </div>
  );

};

export default FarmerMenu;