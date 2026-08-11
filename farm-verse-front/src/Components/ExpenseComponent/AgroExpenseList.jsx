import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllAgroExpenses,
  deleteAgroExpenseById,
} from "../../Services/AgroExpenseService";
import "../../DisplayView.css";

const AgroExpenseList = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  const setExpenseData = () => {
    getAllAgroExpenses()
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        alert("Error while loading agro expenses : " + error);
      });
  };

  useEffect(() => {
    setExpenseData();
  }, []);

  const removeExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteAgroExpenseById(id).then(() => {
        setExpenses(
          expenses.filter((expense) => expense.expenseId !== id)
        );
      });
    }
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#d4fc79 0%,#96e6a1 100%)",
      }}
    >
      <div className="container">

        <div className="card shadow-lg border-0 rounded-4">

          <div
            className="card-header text-center text-white"
            style={{
              background: "linear-gradient(to right,#11998e,#38ef7d)",
            }}
          >
            <h2 className="fw-bold mb-0">
              Agro Expense List
            </h2>


          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle text-center">

                <thead className="table-success">

                  <tr>
                    <th>Expense ID</th>
                    <th>Expense Name</th>
                    <th>Unit</th>
                    <th>Rate / Unit (₹)</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {expenses.length > 0 ? (

                    expenses.map((expense) => (

                      <tr key={expense.expenseId}>

                        <td>{expense.expenseId}</td>

                        <td>{expense.expenseName}</td>

                        <td>
                          <span className="badge bg-primary fs-6 px-3 py-2">
                            {expense.unitName}
                          </span>
                        </td>

                        <td>
                          ₹ {expense.ratePerUnit}
                        </td>

                        <td>

                          <button
                            className="btn btn-danger btn-sm px-3"
                            onClick={() =>
                              removeExpense(expense.expenseId)
                            }
                          >
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="5">

                        <h5 className="text-secondary my-4">
                          No Agro Expenses Available
                        </h5>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            <div className="text-center mt-4">

              <button
                className="btn btn-success px-5 py-2"
                onClick={returnBack}
              >
                <i className="bi bi-arrow-left-circle me-2"></i> Return to Menu
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AgroExpenseList;