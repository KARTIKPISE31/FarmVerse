import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import { Container } from "react-bootstrap";
import "../../DisplayView.css";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [farmUser, setFarmUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
  });
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setFlag(false);
  }, []);

  const createNewUser = () => {
    setLoading(true);
    registerNewUser(farmUser)
      .then(() => {
        setFlag(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onChangeHandler = (event) => {
    setFlag(false);
    const { name, value } = event.target;
    setFarmUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!farmUser.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!farmUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (farmUser.password.length < 5 || farmUser.password.length > 10) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (farmUser.password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!farmUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }

    if (!farmUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(farmUser.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      createNewUser();
    }
  };

  return (
    <div className="nn-scene d-flex align-items-center justify-content-center py-5 px-3">
      <span className="nn-cloud c1" />
      <span className="nn-cloud c2" />
      <span className="nn-cloud c3" />
      <span className="nn-grass" />
      <Container className="nn-content">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <div className="soft-panel p-4 p-xl-5 mb-4 text-center text-lg-start">
              <div className="section-label mb-2"><i className="bi bi-stars"></i> Premium onboarding</div>
              <h2 className="fw-bold mb-2" style={{ color: "#163020" }}>Set up your digital farm command center.</h2>
              <p className="text-muted mb-0">Create a secure workspace to manage farms, crop cycles, and field insights with clarity.</p>
            </div>
            <div className="form-panel-card nn-float p-0 overflow-hidden" style={{ borderRadius: "28px" }}>
              <div className="p-4 text-center" style={{ background: "linear-gradient(135deg,#163020 0%,#2E7D32 100%)" }}>
                <div className="nn-tile dark mx-auto mb-3" style={{ width: 64, height: 64 }}>
                  <i className="bi bi-person-plus-fill"></i>
                </div>
                <h3 className="fw-bold mb-1 text-white">Farmer Onboarding</h3>
                <p className="small mb-0" style={{ color: "rgba(255,255,255,.8)" }}>
                  Register your agricultural workspace
                </p>
              </div>

              <div className="p-4 p-md-5" style={{ background: "rgba(255,255,255,0.74)" }}>
                {flag ? (
                  <div className="text-center py-3">
                    <div className="nn-tile green mx-auto mb-3" style={{ width: 72, height: 72, fontSize: "2rem" }}>
                      <i className="bi bi-check2-circle"></i>
                    </div>
                    <h4 className="fw-bold mb-2" style={{ color: "#163020" }}>Registration Successful!</h4>
                    <p className="text-muted small mb-4">
                      Your farmer workspace account has been verified and registered. You can now access the portal.
                    </p>
                    <button className="btn-primary-ag w-100" onClick={() => navigate("/")} style={{ borderRadius: "16px" }}>
                      <i className="bi bi-box-arrow-in-right"></i> Proceed to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleValidation} noValidate>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-person-badge-fill" style={{ color: "#2E7D32" }}></i></span>
                        <input
                          placeholder="Enter your full name"
                          type="text"
                          name="personalName"
                          className={`form-control ${errors.personalName ? "is-invalid" : ""}`}
                          value={farmUser.personalName}
                          onChange={onChangeHandler}
                          autoComplete="name"
                        />
                      </div>
                      {errors.personalName && (
                        <div className="text-danger small fw-bold mt-1">
                          <i className="bi bi-exclamation-circle me-1"></i>{errors.personalName}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-envelope-fill" style={{ color: "#2E7D32" }}></i></span>
                        <input
                          placeholder="you@example.com"
                          name="email"
                          type="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          value={farmUser.email}
                          onChange={onChangeHandler}
                          autoComplete="email"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger small fw-bold mt-1">
                          <i className="bi bi-exclamation-circle me-1"></i>{errors.email}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-person-fill" style={{ color: "#2E7D32" }}></i></span>
                        <input
                          placeholder="Choose a username"
                          type="text"
                          name="username"
                          className={`form-control ${errors.username ? "is-invalid" : ""}`}
                          value={farmUser.username}
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
                          placeholder="5-10 characters"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`form-control ${errors.password ? "is-invalid" : ""}`}
                          value={farmUser.password}
                          onChange={onChangeHandler}
                          autoComplete="new-password"
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

                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-shield-lock-fill" style={{ color: "#2E7D32" }}></i></span>
                        <input
                          placeholder="Re-enter your password"
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                          value={confirmPassword}
                          onChange={(e) => {
                            setFlag(false);
                            setConfirmPassword(e.target.value);
                          }}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="btn btn-nav-action px-3"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                          tabIndex={-1}
                        >
                          <i className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="text-danger small fw-bold mt-1">
                          <i className="bi bi-exclamation-circle me-1"></i>{errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn-primary-ag w-100" disabled={loading} style={{ borderRadius: "16px" }}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <i className="bi bi-check2-circle"></i>
                          <span>Complete Registration</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {!flag && (
                  <div className="text-center mt-4 pt-3 nn-footer small">
                    <span className="me-1">Already registered?</span>
                    <button
                      type="button"
                      className="btn btn-link p-0 fw-bold border-0 bg-transparent text-decoration-none"
                      style={{ color: "#2E7D32" }}
                      onClick={() => navigate("/")}
                    >
                      Back to Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );

};

export default RegisterUser;