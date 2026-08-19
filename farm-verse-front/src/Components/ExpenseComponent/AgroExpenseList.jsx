import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import {
  getAllAgroExpenses,
  deleteAgroExpenseById,
} from "../../Services/AgroExpenseService";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";

import {
  FaMoneyBillWave,
  FaPlusCircle,
  FaTrashAlt,
  FaArrowLeft,
  FaReceipt,
  FaSeedling,
  FaCalculator,
  FaTag
} from "react-icons/fa";

function AgroExpenseList() {
  const [expenseList, setExpenseList] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    getAllAgroExpenses()
      .then((response) => {
        setExpenseList(response.data);
      })
      .catch((error) => {
        console.error("Error loading expenses:", error);
      });
  };

  const handleDelete = (expenseId) => {
    deleteAgroExpenseById(expenseId)
      .then(() => {
        setMessage("Expense deleted successfully.");

        loadExpenses();

        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);

        setMessage("Unable to delete expense.");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  // Helper to calculate total value sum from existing data safely
  const totalExpenseCost = expenseList.reduce(
    (acc, curr) => acc + (parseFloat(curr.ratePerUnit) || 0),
    0
  );

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
        {/* Top Header Card */}
        <div className="form-panel-card p-0 overflow-hidden shadow-lg border-0 mb-4" style={{ borderRadius: "28px" }}>
          <div
            className="p-4 p-md-5 text-white d-flex justify-content-between align-items-center flex-wrap gap-3"
            style={{ background: "linear-gradient(135deg, #163020 0%, #2E7D32 100%)" }}
          >
            <div>
              <span className="badge-ag-amber mb-2 d-inline-flex">
                🌱 Agricultural Finance Management
              </span>
              <h2 className="fw-bold mb-1 display-6" style={{ color: "#fff" }}>
                Farm Expenses
              </h2>
              <p className="text-white-50 small mb-0 fs-6">
                Track and manage your agricultural operational expenses
              </p>
            </div>

            <button
              className="btn-primary-ag px-4 py-3 fw-bold fs-6 d-inline-flex align-items-center gap-2"
              style={{ borderRadius: "14px" }}
              onClick={() => navigate("/expense-add")}
            >
              <FaPlusCircle /> Add Expense
            </button>
          </div>
        </div>

        {/* Dynamic Summary Metric Cards (using existing data ONLY) */}
        <Row className="g-3 mb-4">
          <Col md={6}>
            <div className="stat-card-clean d-flex align-items-center gap-3">
              <div className="nn-tile green">
                <FaReceipt />
              </div>
              <div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: "0.5px" }}>
                  Recorded Expenses
                </span>
                <h3 className="fw-bold mb-0 text-dark">
                  {expenseList.length} Items
                </h3>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="stat-card-clean d-flex align-items-center gap-3">
              <div className="nn-tile lime">
                <FaCalculator />
              </div>
              <div>
                <span className="text-uppercase text-muted fw-bold small d-block" style={{ letterSpacing: "0.5px" }}>
                  Cumulative Unit Rates
                </span>
                <h3 className="fw-bold mb-0 text-success">
                  ₹ {totalExpenseCost.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>
          </Col>
        </Row>

        {/* Message Banner */}
        {message && (
          <div
            className={`alert ${
              message.includes("deleted") ? "alert-success" : "alert-danger"
            } d-flex align-items-center gap-2 fw-bold mb-4`}
            role="alert"
            style={{ borderRadius: "14px" }}
          >
            <i className={`bi ${message.includes("deleted") ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`}></i>
            {message}
          </div>
        )}

        {/* Expense List Table Container */}
        <div className="form-panel-card p-0 overflow-hidden shadow-lg border-0" style={{ borderRadius: "28px" }}>
          <div className="table-responsive p-3" style={{ background: "rgba(248,255,245,0.85)" }}>
            <table className="table table-hover align-middle mb-0">
              <thead className="text-uppercase" style={{ fontSize: "0.78rem", letterSpacing: "0.05em" }}>
                <tr>
                  <th className="ps-4 py-3">Expense ID</th>
                  <th className="py-3">Expense Name</th>
                  <th className="py-3">Unit</th>
                  <th className="py-3">Cost Per Unit</th>
                  <th className="text-end pe-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.length > 0 ? (
                  expenseList.map((expense) => (
                    <tr key={expense.expenseId}>
                      <td className="fw-bold text-dark ps-4">
                        <span className="badge bg-light text-success border border-success border-opacity-25 px-3 py-2 fw-bold" style={{ borderRadius: "8px" }}>
                          #{expense.expenseId}
                        </span>
                      </td>

                      <td>
                        <div className="fw-bold text-dark d-flex align-items-center gap-2">
                          <FaSeedling className="text-success" style={{ fontSize: "0.9rem" }} />
                          {expense.expenseName}
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-dark px-3 py-1.5 fw-bold" style={{ borderRadius: "8px" }}>
                          {expense.unitName}
                        </span>
                      </td>

                      <td>
                        <div className="amount-badge">
                          <FaMoneyBillWave className="me-1" style={{ fontSize: "0.85rem" }} />
                          ₹ {expense.ratePerUnit}
                        </div>
                      </td>

                      <td className="text-end pe-4">
                        <button
                          className="btn btn-outline-danger btn-sm px-3 fw-bold d-inline-flex align-items-center gap-1"
                          style={{ borderRadius: "8px" }}
                          onClick={() => handleDelete(expense.expenseId)}
                        >
                          <FaTrashAlt style={{ fontSize: "0.8rem" }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="py-4">
                        <div className="nn-tile green mx-auto mb-3" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                          🌱
                        </div>
                        <h4 className="fw-bold text-dark mb-1">No expenses recorded yet.</h4>
                        <p className="text-muted small mb-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
                          Start tracking your farming supplies, seeds, irrigation, and labor costs to optimize yield profits.
                        </p>
                        <button
                          className="btn-primary-ag px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2"
                          style={{ borderRadius: "12px" }}
                          onClick={() => navigate("/expense-add")}
                        >
                          <FaPlusCircle /> Add Expense
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-light text-center border-top">
            <button
              className="btn btn-outline-dark px-4 fw-bold d-inline-flex align-items-center gap-2"
              style={{ borderRadius: "12px" }}
              onClick={() => navigate("/farmer-menu")}
            >
              <FaArrowLeft /> Return to Dashboard
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AgroExpenseList;