import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { getCropById } from "../../Services/CropService";
import { getCropInputsById } from "../../Services/CropInputsService";
import { getFarmById } from "../../Services/FarmService";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const CropInputView = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [crop, setCrop] = useState(null);
  const [cropInputs, setCropInputs] = useState(null);
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [cropResponse, cropInputsResponse] = await Promise.all([
        getCropById(cid),
        getCropInputsById(cid),
      ]);

      const cropData = cropResponse.data;
      setCrop(cropData);
      setCropInputs(cropInputsResponse.data);

      if (cropData?.farmId) {
        try {
          const farmResponse = await getFarmById(cropData.farmId);
          setFarm(farmResponse.data);
        } catch (_farmError) {
          setFarm(null);
        }
      } else {
        setFarm(null);
      }
    } catch (fetchError) {
      setError("Unable to load crop details or crop inputs at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [cid]);

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
          <div className="col-xl-9 col-lg-10">
            <div className="form-panel-card p-0 overflow-hidden shadow-lg" style={{ borderRadius: "28px" }}>
              <div className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}>
                <div>
                  <h3 className="fw-bold mb-1">
                    <i className="bi bi-journal-text text-info me-2"></i>Crop Details & Farm Information
                  </h3>
                  <p className="text-white-50 small mb-0">Selected crop details and the associated farm record for the chosen cultivation cycle.</p>
                </div>
                <span className="badge bg-info text-dark px-3 py-2 fw-bold" style={{ borderRadius: "8px" }}>
                  Crop ID: #{crop?.cropId || cid}
                </span>
              </div>

              <div className="p-4" style={{ background: "rgba(255,255,255,0.88)" }}>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-success mb-3" role="status"></div>
                    <p className="text-muted fw-bold">Loading crop inputs and details...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-5">
                    <i className="bi bi-exclamation-triangle text-danger display-5"></i>
                    <h5 className="text-danger fw-bold mt-3">Unable to load crop inputs</h5>
                    <p className="text-muted">{error}</p>
                    <button className="btn-primary-ag px-4 py-2" onClick={loadData} style={{ borderRadius: "10px" }}>
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="bg-light rounded-4 p-4 h-100 border border-secondary border-opacity-10">
                          <div className="d-flex align-items-center mb-4 gap-3">
                            <span className="fs-4">🌱</span>
                            <div>
                              <h5 className="fw-bold mb-1">Crop Details</h5>
                              <p className="text-muted small mb-0">Selected crop information returned by the backend API.</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-muted small">Crop ID</div>
                            <div className="fw-bold text-dark">{crop?.cropId ? `#${crop.cropId}` : `#${cid}`}</div>
                          </div>
                          {crop?.cropName && (
                            <div className="mb-3">
                              <div className="text-muted small">Crop Name</div>
                              <div className="fw-bold text-dark">{crop.cropName}</div>
                            </div>
                          )}
                          {crop?.cropArea != null && (
                            <div className="mb-3">
                              <div className="text-muted small">Crop Area</div>
                              <div className="fw-bold text-dark">{crop.cropArea} Acres</div>
                            </div>
                          )}
                          {crop?.soil && (
                            <div className="mb-3">
                              <div className="text-muted small">Soil Type</div>
                              <div className="fw-bold text-dark">{crop.soil}</div>
                            </div>
                          )}
                          {crop?.sownMonthYear && (
                            <div className="mb-3">
                              <div className="text-muted small">Sown Month / Year</div>
                              <div className="fw-bold text-dark">{crop.sownMonthYear}</div>
                            </div>
                          )}
                          {crop?.harvestMonthYear && (
                            <div className="mb-3">
                              <div className="text-muted small">Harvest Month / Year</div>
                              <div className="fw-bold text-dark">{crop.harvestMonthYear}</div>
                            </div>
                          )}
                          {crop?.yield != null && (
                            <div className="mb-0">
                              <div className="text-muted small">Yield</div>
                              <div className="fw-bold text-dark">{crop.yield} Quintals</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="bg-light rounded-4 p-4 h-100 border border-secondary border-opacity-10">
                          <div className="d-flex align-items-center mb-4 gap-3">
                            <span className="fs-4">🚜</span>
                            <div>
                              <h5 className="fw-bold mb-1">Farm Details</h5>
                              <p className="text-muted small mb-0">Information for the farm associated with this crop.</p>
                            </div>
                          </div>

                          {farm?.farmId != null && (
                            <div className="mb-3">
                              <div className="text-muted small">Farm ID</div>
                              <div className="fw-bold text-dark">#{farm.farmId}</div>
                            </div>
                          )}
                          {farm?.farmName && (
                            <div className="mb-3">
                              <div className="text-muted small">Farm Name</div>
                              <div className="fw-bold text-dark">{farm.farmName}</div>
                            </div>
                          )}
                          {farm?.area != null && (
                            <div className="mb-3">
                              <div className="text-muted small">Farm Area</div>
                              <div className="fw-bold text-dark">{farm.area} Acres</div>
                            </div>
                          )}
                          {(farm?.soil || crop?.soil) && (
                            <div className="mb-3">
                              <div className="text-muted small">Soil Type</div>
                              <div className="fw-bold text-dark">{farm?.soil || crop?.soil}</div>
                            </div>
                          )}
                          {(farm?.location || farm?.address || farm?.farmAddress) && (
                            <div className="mb-0">
                              <div className="text-muted small">Location</div>
                              <div className="fw-bold text-dark">{farm?.location || farm?.address || farm?.farmAddress}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4 border-top pt-4">
                      <button
                        onClick={() => navigate("/crop-list")}
                        className="btn-nav-action px-4 py-2"
                        style={{ width: "auto", borderRadius: "10px" }}
                      >
                        <i className="bi bi-arrow-left me-1"></i> Return to Crop List
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CropInputView;
