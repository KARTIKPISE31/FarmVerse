import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  addAgroExpense,
  generateExpenseId,
} from "../../Services/AgroExpenseService";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

import {
  FaMoneyBillWave,
  FaIdCard,
  FaTag,
  FaBalanceScale,
  FaSave,
  FaRedo,
  FaArrowLeft,
  FaLeaf,
  FaLock
} from "react-icons/fa";

function AgroExpenseEntry() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [expense, setExpense] = useState({
    expenseId: "",
    expenseName: "",
    unitName: "",
    ratePerUnit: "",
  });

  useEffect(() => {
    loadExpenseId();
  }, []);

  const loadExpenseId = () => {
    generateExpenseId()
      .then((response) => {
        setExpense((prev) => ({
          ...prev,
          expenseId: response.data,
        }));
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAgroExpense(expense)
      .then(() => {
        setMessage("Expense Added Successfully");

        setTimeout(() => {
          navigate("/expense-list");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to Add Expense");
      });
  };

  const handleReset = () => {
    setExpense({
      expenseId: expense.expenseId,
      expenseName: "",
      unitName: "",
      ratePerUnit: "",
    });

    setMessage("");
  };

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
        {/* Top Header & Breadcrumb */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <button
            className="btn btn-outline-secondary btn-sm fw-bold px-3 py-2 d-inline-flex align-items-center gap-2"
            style={{ borderRadius: "12px", background: "rgba(255,255,255,0.85)" }}
            onClick={() => navigate("/farmer-menu")}
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <span className="badge-ag-amber">
            <FaLeaf className="me-1" /> Expense Entry Portal
          </span>
        </div>

        {/* Centered Form Card */}
        <div className="form-card-wrapper">
          <div className="form-panel-card p-4 p-md-5 overflow-hidden shadow-lg border-0" style={{ borderRadius: "28px" }}>

            {/* Header Banner Inside Card */}
            <div className="form-section-header">
              <div className="nn-tile green">
                <FaMoneyBillWave style={{ fontSize: "1.5rem" }} />
              </div>
              <div>
                <h2 className="fw-bold mb-0" style={{ color: "#163020", fontSize: "1.6rem" }}>
                  Add Farm Expense
                </h2>
                <p className="text-muted small mb-0">
                  Track and manage your agricultural expenses efficiently
                </p>
              </div>
            </div>

            {/* Success / Error Message */}
            {message && (
              <div
                className={`alert ${message.includes("Successfully") ? "alert-success" : "alert-danger"
                  } d-flex align-items-center gap-2 fw-bold mb-4`}
                role="alert"
                style={{ borderRadius: "14px" }}
              >
                <i className={`bi ${message.includes("Successfully") ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`}></i>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="form-section-title mb-3">
                  <FaLeaf style={{ color: "#2E7D32" }} /> Expense Information
                </div>

                {/* Expense ID (Read-only) */}
                <div className="form-group mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <FaIdCard className="text-success" /> Expense ID
                  </label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon text-muted" />
                    <input
                      type="text"
                      className="form-control readonly bg-light"
                      value={expense.expenseId}
                      readOnly
                      style={{ cursor: "not-allowed", opacity: 0.85, fontWeight: "700" }}
                    />
                  </div>
                  <small className="text-muted mt-1 d-block" style={{ fontSize: "0.78rem" }}>
                    System auto-generated identifier
                  </small>
                </div>

                {/* Expense Name */}
                <div className="form-group mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <FaTag className="text-success" /> Expense Name / Category
                  </label>
                  <div className="input-with-icon">
                    <FaTag className="input-icon" />
                    <input
                      type="text"
                      name="expenseName"
                      className="form-control"
                      placeholder="e.g. Organic Seeds, Tractor Fuel, NPK Fertilizer"
                      value={expense.expenseName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Unit Name */}
                <div className="form-group mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <FaBalanceScale className="text-success" /> Measurement Unit
                  </label>
                  <div className="input-with-icon">
                    <FaBalanceScale className="input-icon" />
                    <input
                      type="text"
                      name="unitName"
                      className="form-control"
                      placeholder="e.g. Kg, Liter, Acre, Hour, Packet"
                      value={expense.unitName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Rate Per Unit */}
                <div className="form-group mb-4">
                  <label className="form-label d-flex align-items-center gap-2">
                    <FaMoneyBillWave className="text-success" /> Rate Per Unit (₹)
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon fw-bold" style={{ fontSize: "1.1rem" }}>₹</span>
                    <input
                      type="number"
                      step="0.01"
                      name="ratePerUnit"
                      className="form-control"
                      placeholder="0.00"
                      value={expense.ratePerUnit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-primary-ag flex-grow-1"
                  style={{
                    borderRadius: "14px",
                    height: "52px",
                    fontSize: "1rem",
                  }}
                >
                  <FaSave /> 🌿 Save Expense
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-nav-action flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "14px",
                    height: "52px",
                    fontSize: "1rem",
                  }}
                >
                  <FaRedo /> Reset
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/farmer-menu")}
                  className="btn-nav-action d-inline-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "14px",
                    height: "52px",
                    fontSize: "1rem",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                  }}
                >
                  <FaArrowLeft /> Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AgroExpenseEntry;
