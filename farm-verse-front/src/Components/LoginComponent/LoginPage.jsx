import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import { Container } from "react-bootstrap";
import "../../DisplayView.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [flag, setFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateLogin = () => {
    setLoading(true);
    validateUser(loginData.username, loginData.password)
      .then((response) => {
        let reply = String(response.data);
        if (reply === "True" || reply === "true") {
          navigate("/farmer-menu");
        } else {
          setFlag(false);
          setLoading(false);
        }
      })
      .catch(() => {
        setFlag(false);
        setLoading(false);
      });
  };

  const onChangeHandler = (event) => {
    setFlag(true);
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      validateLogin();
    }
  };


  return (
    <div className="nn-scene d-flex align-items-center justify-content-center py-5 px-3">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />
      <Container className="nn-content">
        <div className="row align-items-center g-4 g-xl-5">
          <div className="col-lg-6 text-center text-lg-start">
            <div className="soft-panel p-4 p-xl-5">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(46,125,50,0.16)", boxShadow: "0 10px 24px rgba(22,48,32,0.08)" }}>
                <i className="bi bi-cpu-fill" style={{ color: "#2E7D32" }}></i>
                <span className="fw-bold" style={{ color: "#163020" }}>AI-Powered Farm Operations</span>
              </div>
              <h1 className="display-5 fw-bold mb-3" style={{ color: "#163020" }}>Welcome back to your intelligent agri workspace.</h1>
              <p className="lead mb-4" style={{ color: "#5f7a68", maxWidth: "540px" }}>Coordinate fields, crop cycles, and predictive insights in a calm, premium experience designed for modern agriculture.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <div className="metric-pill">
                  <i className="bi bi-sun-fill" style={{ color: "#C6FF00" }}></i>
                  <span>Live insights</span>
                </div>
                <div className="metric-pill">
                  <i className="bi bi-shield-check" style={{ color: "#2E7D32" }}></i>
                  <span>Secure access</span>
                </div>
                <div className="metric-pill">
                  <i className="bi bi-graph-up-arrow" style={{ color: "#0369A1" }}></i>
                  <span>Smart forecasting</span>
                </div>
              </div>
              <div className="info-grid text-start">
                <div className="info-card">
                  <div className="section-label mb-2"><i className="bi bi-diagram-3-fill"></i>Connected workflow</div>
                  <div className="fw-semibold" style={{ color: "#163020" }}>Everything from farm registration to crop reporting stays in one elegant hub.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-panel-card nn-float p-0 overflow-hidden" style={{ borderRadius: "28px" }}>
              <div className="p-4 text-center" style={{ background: "linear-gradient(135deg,#163020 0%,#2E7D32 100%)" }}>
                <div className="nn-tile dark mx-auto mb-3" style={{ width: 64, height: 64 }}>
                  <i className="bi bi-flower3 nn-grow"></i>
                </div>
                <h3 className="fw-bold mb-1 text-white">FarmVerse Portal</h3>
                <p className="small mb-0" style={{ color: "rgba(255,255,255,.8)" }}>Sign in to your farmer workspace</p>
              </div>

              <div className="p-4 p-md-5" style={{ background: "rgba(255,255,255,0.74)" }}>
                <form onSubmit={handleValidation} noValidate>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person-fill" style={{ color: "#2E7D32" }}></i></span>
                      <input
                        placeholder="Enter your username"
                        type="text"
                        name="username"
                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                        value={loginData.username}
                        onChange={onChangeHandler}
                        autoComplete="username"
                      />
                    </div>
                    {errors.username && (
                      <div className="text-danger small fw-bold mt-1">
                        <i className="bi bi-exclamation-circle me-1"></i>{errors.username}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock-fill" style={{ color: "#2E7D32" }}></i></span>
                      <input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        value={loginData.password}
                        onChange={onChangeHandler}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="btn btn-nav-action px-3"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-danger small fw-bold mt-1">
                        <i className="bi bi-exclamation-circle me-1"></i>{errors.password}
                      </div>
                    )}
                  </div>

                  {!flag && (
                    <div className="alert alert-danger small fw-bold p-3 mb-4 d-flex align-items-center" style={{ borderRadius: "14px" }}>
                      <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                      <span>Invalid Username or Password</span>
                    </div>
                  )}

                  <button type="submit" className="btn-primary-ag w-100" disabled={loading} style={{ borderRadius: "16px" }}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Sign In to Dashboard</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4 pt-3 small" style={{ borderTop: "1px solid rgba(46,125,50,0.14)" }}>
                  <span className="me-1" style={{ color: "#5f7a68" }}>New to FarmVerse?</span>
                  <button
                    type="button"
                    className="btn btn-link p-0 fw-bold border-0 bg-transparent text-decoration-none"
                    style={{ color: "#2E7D32" }}
                    onClick={() => navigate("/register")}
                  >
                    Create an Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );

};

export default LoginPage;