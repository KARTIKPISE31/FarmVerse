import React, { useState, useEffect } from "react";




import { useNavigate, useParams } from "react-router-dom";




import { getExpectedYield } from "../../Services/AIService";




import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";




import { logoutUser } from "../../Services/LoginService";




import "../../DisplayView.css";




const FarmCropReport = () => {




let navigate = useNavigate();




let param = useParams();




const [farmCrop, setFarmCrop] = useState({



farmId: 0,

farmName: "",

soil: "",

cropId: "",

cropName: "",

cropArea: 0.0,

sownMonthYear: "",

harvestMonthYear: "",

yield: 0.0,

comments: "",




});




const [loading, setLoading] = useState(true);




const setFarmCropData = () => {



setLoading(true);

getExpectedYield(param.cid)

  .then((response) => {

    setFarmCrop(response.data);

    setLoading(false);

  })

  .catch(() => {

    setLoading(false);

  });




};




useEffect(() => {



setFarmCropData();




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

    {/* Top Navbar */}

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

      <div className="col-lg-8">

        <div className="form-panel-card p-0 overflow-hidden shadow-lg" style={{ borderRadius: "28px" }}>

          {/* Panel Header */}

          <div

            className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap gap-3"

            style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}

          >

            <div>

              <h3 className="fw-bold mb-1">

                <i className="bi bi-graph-up-arrow text-warning me-2"></i>Crop Yield Analytics & Report

              </h3>

              <p className="text-white-50 small mb-0">Detailed performance metrics for Crop ID: #{param.cid}</p>

            </div>

            <span className="badge bg-warning text-dark px-3 py-2 fw-bold" style={{ borderRadius: "8px" }}>

              AI Yield Analysis

            </span>

          </div>

          <div className="p-4" style={{ background: "rgba(255,255,255,0.78)" }}>

            {loading ? (

              <div className="text-center py-5">

                <div className="spinner-border text-success mb-3" role="status"></div>

                <p className="text-muted fw-bold">Analyzing crop harvest & yield data...</p>

              </div>

            ) : (

              <>

                {/* Yield Highlight Banner */}

                <div className="bg-light rounded-4 p-4 mb-4 border border-secondary border-opacity-25 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ boxShadow: "0 10px 30px rgba(22,48,32,0.08)" }}>

                  <div>

                    <span className="text-uppercase text-muted fw-bold small d-block mb-1">Expected Total Yield</span>

                    <h2 className="display-6 fw-bold text-success mb-0">

                      {farmCrop.yield || "--"}{" "}

                      <span className="fs-6 text-muted fw-normal">Quintals / Acre</span>

                    </h2>

                  </div>

                  <div className="text-md-end">

                    <span className="badge bg-success p-2 mb-1 d-inline-flex align-items-center gap-1 text-white" style={{ borderRadius: "999px" }}>

                      <i className="bi bi-shield-check"></i> Optimized Forecast

                    </span>

                    <small className="d-block text-muted mt-1">Based on soil composition & climate</small>

                  </div>

                </div>

                {/* Report Data Grid */}

                <div className="table-responsive">

                  <table className="table table-hover border align-middle mb-0">

                    <tbody>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3" style={{ width: "35%" }}>

                          <i className="bi bi-hash me-2 text-primary"></i> Crop ID

                        </td>

                        <td className="fw-bold text-dark">#CROP-{farmCrop.cropId}</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-sprout-fill me-2 text-success"></i> Crop Name

                        </td>

                        <td className="fw-bold text-dark">{farmCrop.cropName}</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-geo-alt-fill me-2 text-danger"></i> Associated Farm

                        </td>

                        <td className="fw-bold text-dark">{farmCrop.farmName || `Farm #${farmCrop.farmId}`}</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-layers-fill me-2 text-info"></i> Soil Category

                        </td>

                        <td>

                          <span className="badge bg-info bg-opacity-10 text-info p-2 fw-bold">

                            🌱 {farmCrop.soil || "N/A"}

                          </span>

                        </td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-textarea-resize me-2 text-secondary"></i> Cultivated Area

                        </td>

                        <td className="fw-bold text-dark">{farmCrop.cropArea} Acres</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-calendar-event me-2 text-warning"></i> Sown Date

                        </td>

                        <td className="fw-bold text-dark">{farmCrop.sownMonthYear || "N/A"}</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-calendar-check me-2 text-success"></i> Harvest Date

                        </td>

                        <td className="fw-bold text-dark">{farmCrop.harvestMonthYear || "N/A"}</td>

                      </tr>

                      <tr>

                        <td className="bg-light fw-bold text-muted ps-3">

                          <i className="bi bi-card-text me-2 text-muted"></i> System Comments

                        </td>

                        <td className="text-secondary text-wrap" style={{ maxWidth: "250px" }}>

                          {farmCrop.comments || "Soil moisture and nutrient levels optimal for harvest."}

                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

                <div className="text-center mt-4 border-top pt-4">

                  <button

                    onClick={() => navigate("/crop-list")}

                    className="btn-nav-action px-4 py-2"

                    style={{ width: "auto", borderRadius: "10px" }}

                  >

                    <i className="bi bi-arrow-left me-1"></i> Return to Crop Directory

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




export default FarmCropReport;