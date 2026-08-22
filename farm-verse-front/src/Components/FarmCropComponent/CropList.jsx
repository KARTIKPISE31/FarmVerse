import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCropsByUsername, deleteCropById } from "../../Services/CropService";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const CropList = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const setCropData = () => {
    getCropsByUsername()
      .then((response) => {
        setCrops(response.data);
      })
      .catch((error) => {
        alert("Error occurred while loading crop data: " + error);
      });
  };

  useEffect(() => {
    setCropData();
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  const removeCrop = (id) => {
    if (window.confirm("Are you sure you want to delete this crop record?")) {
      deleteCropById(id).then(() => {
        let remainCrops = crops.filter((crop) => crop.cropId !== id);
        setCrops(remainCrops);
      });
    }
  };

  const filteredCrops = crops.filter((crop) =>
    crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(crop.cropId).includes(searchTerm)
  );

  // Return to dashboard
  const returnBack = () => {
      navigate("/farmer-menu");
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

      <Container className="dashboard-container py-4">
        <div className="form-panel-card p-0 overflow-hidden shadow-lg" style={{ borderRadius: "28px" }}>
          <div className="p-4 text-white d-flex flex-wrap justify-content-between align-items-center gap-3" style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}>
            <div>
              <h3 className="fw-bold mb-1">
                <i className="bi bi-sprout text-success me-2"></i>Crop Cycles & Harvest Directory
              </h3>
              <p className="text-white-50 small mb-0">Manage tracked cultivation space parameters and projected field outcomes</p>
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              <input
                type="text"
                className="form-control form-control-sm bg-white border-0 shadow-sm"
                placeholder="🔍 Search crop name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "220px", borderRadius: "10px", padding: "0.5rem 0.75rem" }}
              />

              <button
                className="btn-primary-ag py-2 px-3 m-0"
                style={{ width: "auto", fontSize: "0.85rem", borderRadius: "10px" }}
                onClick={() => navigate("/crop-add")}
              >
                <i className="bi bi-plus-lg me-1"></i> Add Crop
              </button>
            </div>
          </div>

          <div className="table-responsive p-3" style={{ background: "rgba(248,255,245,0.8)" }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-3">Crop ID</th>
                  <th scope="col">Farm ID</th>
                  <th scope="col">Crop Details</th>
                  <th scope="col">Timeline</th>
                  <th scope="col">Analytics & Yield</th>
                  <th scope="col" className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.length > 0 ? (
                  filteredCrops.map((crop) => (
                    <tr key={crop.cropId}>
                      <td className="fw-bold text-dark ps-3">#CROP-{crop.cropId}</td>
                      <td>
                        <span className="badge bg-secondary p-2">Farm #{crop.farmId}</span>
                      </td>
                      <td>
                        <div className="fw-bold text-primary">{crop.cropName}</div>
                        <small className="text-muted">
                          <i className="bi bi-textarea-resize me-1"></i> Area: {crop.cropArea} Acres
                        </small>
                      </td>
                      <td>
                        <div className="small">
                          <span className="text-success fw-semibold">Sown:</span> {crop.sownMonthYear}
                        </div>
                        <div className="small">
                          <span className="text-warning fw-semibold">Harvest:</span> {crop.harvestMonthYear}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <small className="text-muted fw-bold">Est. Yield: {crop.yield} Quintals</small>
                          <Link to={`/farm-crop/${crop.cropId}`} className="text-decoration-none">
                            <button
                              className="btn btn-outline-warning text-dark btn-sm px-2 fw-bold border-warning py-1"
                              style={{ borderRadius: "8px", fontSize: "0.75rem" }}
                            >
                              <i className="bi bi-graph-up-arrow me-1 text-warning"></i> View Yield Report
                            </button>
                          </Link>
                        </div>
                      </td>
                          <td className="text-end pe-3">
                            <button
                              onClick={() => navigate(`/crop-input/${crop.cropId}`)}
                              className="btn btn-outline-primary btn-sm px-3 me-2 fw-bold"
                              style={{ borderRadius: "8px" }}
                            >
                              <i className="bi bi-journal-text me-1"></i> View Crop Inputs
                            </button>
                            <button
                              onClick={() => navigate(`/farm-crop-expense/${crop.cropId}`)}
                              className="btn btn-outline-success btn-sm px-3 me-2 fw-bold"
                              style={{ borderRadius: "8px" }}
                            >
                              <i className="bi bi-cash-coin me-1"></i> Crop Expense Report
                            </button>
                            <button
                              onClick={() => removeCrop(crop.cropId)}
                              className="btn btn-outline-danger btn-sm px-3 fw-bold"
                              style={{ borderRadius: "8px" }}
                            >
                              <i className="bi bi-trash3 me-1"></i> Delete
                            </button>
                          </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <i className="bi bi-inbox text-muted display-4 d-block mb-3"></i>
                      <h5 className="text-secondary fw-bold">No Crop Records Found</h5>
                      <p className="small text-muted mb-3">You haven't recorded any crop harvest cycles matching your search.</p>
                      <button
                        className="btn-primary-ag d-inline-flex px-4"
                        style={{ width: "auto", borderRadius: "10px" }}
                        onClick={() => navigate("/crop-add")}
                      >
                        Register New Crop Cycle
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-light text-center border-top d-flex justify-content-center">
            <button
              onClick={() => navigate("/farmer-menu")}
              className="btn-nav-action px-4 py-2"
              style={{ width: "auto", borderRadius: "10px" }}
            >
              <i className="bi bi-arrow-left me-1"></i> Return to Workspace Dashboard
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CropList;