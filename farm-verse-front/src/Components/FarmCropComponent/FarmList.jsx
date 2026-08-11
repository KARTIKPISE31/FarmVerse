import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername, deleteFarmById } from "../../Services/FarmService";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const FarmList = () => {
  const navigate = useNavigate();
  const [farms, setFarms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const setFarmData = () => {
    getFarmsByUsername()
      .then((response) => {
        setFarms(response.data);
      })
      .catch((error) => {
        alert("Error while loading farms: " + error);
      });
  };

  useEffect(() => {
    setFarmData();
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  const removeFarm = (id) => {
    if (window.confirm("Are you sure you want to delete this farm parcel?")) {
      deleteFarmById(id).then(() => {
        setFarms(farms.filter((farm) => farm.farmId !== id));
      });
    }
  };

  const filteredFarms = farms.filter((farm) =>
    farm.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farm.soil && farm.soil.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <div className="form-panel-card p-0 overflow-hidden shadow-lg border-0 bg-white" style={{ borderRadius: "28px" }}>
          <div
            className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3"
            style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}
          >
            <div>
              <h3 className="fw-bold mb-1">
                <i className="bi bi-card-list text-success me-2"></i>Registered Farm Parcels
              </h3>
              <p className="text-white-50 small mb-0">Overview of all active farm plots under your account</p>
            </div>

            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm bg-white border-0 shadow-sm ps-4 py-2"
                  placeholder="Search farm or soil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "220px", borderRadius: "10px" }}
                />
                <i className="bi bi-search position-absolute text-muted top-50 start-0 translate-middle-y ms-2 small"></i>
              </div>

              <button
                className="btn btn-success btn-sm fw-bold px-3 py-2"
                style={{ borderRadius: "10px" }}
                onClick={() => navigate("/farm-add")}
              >
                <i className="bi bi-plus-lg me-1"></i> Add Farm
              </button>
            </div>
          </div>

          <div className="table-responsive p-3" style={{ background: "rgba(248,255,245,0.8)" }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-secondary">
                <tr>
                  <th className="ps-4 py-3">Farm ID</th>
                  <th className="py-3">Farm Name</th>
                  <th className="py-3">Total Area</th>
                  <th className="py-3">Soil Category</th>
                  <th className="text-end pe-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarms.length > 0 ? (
                  filteredFarms.map((farm) => (
                    <tr key={farm.farmId}>
                      <td className="fw-bold text-dark ps-4">#FARM-{farm.farmId}</td>
                      <td>
                        <div className="fw-bold text-dark">{farm.farmName}</div>
                        <small className="text-muted d-block mt-0.5">
                          <i className="bi bi-geo-alt me-1"></i>Zone Parcel
                        </small>
                      </td>
                      <td>
                        <span className="fw-bold text-dark">{farm.area}</span>{" "}
                        <span className="text-muted small">Acres</span>
                      </td>
                      <td>
                        <span className="badge bg-success bg-opacity-10 text-success p-2 fw-bold" style={{ borderRadius: "8px" }}>
                          🌱 {farm.soil || "Standard"}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-outline-danger btn-sm px-3 fw-bold"
                          style={{ borderRadius: "8px" }}
                          onClick={() => removeFarm(farm.farmId)}
                        >
                          <i className="bi bi-trash3 me-1"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i className="bi bi-inbox text-muted display-4 d-block mb-3"></i>
                      <h5 className="text-secondary fw-bold">No Farm Parcels Found</h5>
                      <p className="small text-muted mb-3">You haven't registered any farm parcels matching your criteria.</p>
                      <button
                        className="btn btn-success fw-bold px-4 py-2"
                        style={{ borderRadius: "10px" }}
                        onClick={() => navigate("/farm-add")}
                      >
                        Register New Farm
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-light text-center border-top">
            <button
              className="btn btn-outline-dark px-4 fw-bold"
              style={{ borderRadius: "10px" }}
              onClick={() => navigate("/farmer-menu")}
            >
              <i className="bi bi-arrow-left me-1"></i> Return to Dashboard
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FarmList;