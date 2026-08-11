import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addAgroExpense,
  generateExpenseId,
} from "../../Services/AgroExpenseService";
import "../../DisplayView.css";

const AgroExpenseEntry = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [newId, setNewId] = useState(0);

  const [expense, setExpense] = useState({
    expenseId: 0,
    expenseName: "",
    unitName: "",
    ratePerUnit: "",
  });

  useEffect(() => {
    generateExpenseId().then((response) => {
      setNewId(response.data);
    }).catch((error) => {
      console.error("Failed to generate expense ID:", error);
    });

    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFlag(false);
  };

  const saveExpense = (event) => {
    event.preventDefault();

    const expenseData = {
      ...expense,
      expenseId: newId,
    };

    addAgroExpense(expenseData).then(() => {
      setFlag(true);

      setExpense({
        expenseId: 0,
        expenseName: "",
        unitName: "",
        ratePerUnit: "",
      });

      generateExpenseId().then((response) => {
        setNewId(response.data);
      }).catch((error) => {
        console.error("Failed to generate expense ID:", error);
      });

      setErrors({});
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!expense.expenseName.trim()) {
      tempErrors.expenseName = "Expense name is required";
      isValid = false;
    }

    if (!expense.unitName.trim()) {
      tempErrors.unitName = "Unit name is required";
      isValid = false;
    }

    if (
      expense.ratePerUnit === "" ||
      Number(expense.ratePerUnit) <= 0
    ) {
      tempErrors.ratePerUnit = "Enter a valid rate";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      saveExpense(event);
    }
  };

  const clearAll = (event) => {
    event.preventDefault();

    setExpense({
      expenseId: 0,
      expenseName: "",
      unitName: "",
      ratePerUnit: "",
    });

    setErrors({});
    setFlag(false);
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#d4fc79 0%,#96e6a1 100%)",
        padding: "30px",
      }}
    >
      <div className="col-lg-5 col-md-8 col-sm-11">
        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          <div
            className="card-header text-center text-white"
            style={{
              background: "linear-gradient(to right,#11998e,#38ef7d)",
              padding: "25px",
            }}
          >
            <h2 className="fw-bold mb-1">
              Agro Expense Entry
            </h2>

            <small>Add Agro Expense Details</small>
          </div>

          <div className="card-body p-5">
            <form>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Expense ID
                </label>

                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-hash"></i></span>

                  <input
                    className="form-control"
                    value={newId}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Expense Name
                </label>

                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-tag"></i></span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Expense Name"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={onChangeHandler}
                  />
                </div>

                {errors.expenseName && (
                  <small className="text-danger">
                    {errors.expenseName}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Unit Name
                </label>

                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-box"></i></span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Unit Name"
                    name="unitName"
                    value={expense.unitName}
                    onChange={onChangeHandler}
                  />
                </div>

                {errors.unitName && (
                  <small className="text-danger">
                    {errors.unitName}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  Rate Per Unit (₹)
                </label>

                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-currency-rupee"></i></span>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Rate Per Unit"
                    name="ratePerUnit"
                    value={expense.ratePerUnit}
                    onChange={onChangeHandler}
                  />
                </div>

                {errors.ratePerUnit && (
                  <small className="text-danger">
                    {errors.ratePerUnit}
                  </small>
                )}
              </div>

              <div className="row g-3 mt-4">

                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={handleValidation}
                  >
                    Save
                  </button>
                </div>

                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={clearAll}
                  >
                    Reset
                  </button>
                </div>

                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-warning text-dark w-100"
                    onClick={returnBack}
                  >
                    Back
                  </button>
                </div>

              </div>

            </form>

            {flag && (
              <div
                className="alert alert-success mt-4 text-center"
                style={{
                  borderRadius: "15px",
                  fontWeight: "600",
                }}
              >
                <i className="bi bi-check-circle-fill me-2"></i> Agro Expense Added Successfully!
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AgroExpenseEntry;