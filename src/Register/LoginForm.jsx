import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";




function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState("EMAIL"); // "EMAIL" → "OTP"
  const [email, setEmail] = useState("");

  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [resetErrors, setResetErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      //swal("Error", "Email and password are required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/user/login", form);
      console.log("res", res);
      swal("Success!", res.data.message || "Login.", "success");

      // ✅ Show success alert
      //swal("Login Successful", "Welcome!", "success");

      // ✅ Redirect to dashboard
      sessionStorage.setItem("name", res.data.uname);
      sessionStorage.setItem("id", res.data.userId);
      sessionStorage.setItem("email", res.data.email);

      window.location.href = "/AdmissionFormDashboard";
      console.log("sessionstorage", sessionStorage);


    } catch (err) {
      // ✅ Show error only if login fails
      console.log("err", err);

      swal("Error", err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };


  const handleSendResetOtp = async () => {
    setLoading(true);
    setResetErrors({});
    if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(resetForm.email)) {
      setResetErrors({ email: "Enter a valid email address" });
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/send-otp-forget", {
        email: resetForm.email,
      });
      swal("OTP Sent", "Check your inbox (and spam folder) for the code.", "success");
      setResetStep("OTP");
    } catch (e) {
      swal("Error", e.response?.data || "Unable to send OTP.", "error");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setResetErrors({});
    const { email, otp, newPassword } = resetForm;

    let err = {};
    if (!otp || otp.length !== 6) err.otp = "OTP must be 6 digits";
    if (!newPassword || newPassword.length < 6 || newPassword.length > 20) {
      err.newPassword = "Password must be 6 to 20 characters long";
    }

    // if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/.test(newPassword)) {
    //   err.newPassword = "Password must be 6–20 characters with uppercase, lowercase, number & symbol.";
    // }


    if (Object.keys(err).length > 0) {
      setResetErrors(err);
      return;
    }

    try {
      await axios.put("http://localhost:8080/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      swal("Success", "Password has been reset. You can now log in.", "success");
      setShowResetModal(false);
    } catch (e) {
      swal("Error", e.response?.data || "Unable to reset password.", "error");
    }
    setLoading(false);
  };


  /* ---------------- Google Identity initialisation ---------------- */

  //  Create the handler function



  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title text-center">Login</h4>
        <p className="text-center text-muted">Admissions Portal</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address *</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
            />
          </div>
          <p
            className="text-end text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setResetForm({ email: "", otp: "", newPassword: "" });
              setResetStep("EMAIL");
              setShowResetModal(true);
            }}
          >
            Forgot?
          </p>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>



        </form>



        {/* popup */}
        {showResetModal && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reset Password</h5>
                  <button type="button" className="btn-close" onClick={() => setShowResetModal(false)}></button>
                </div>

                <div className="modal-body">
                  {resetStep === "EMAIL" && (
                    <>
                      <p>Enter your email to receive an OTP:</p>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={resetForm.email}
                        onChange={(e) =>
                          setResetForm({ ...resetForm, email: e.target.value })
                        }
                      />
                      {resetErrors.email && <small className="text-danger">{resetErrors.email}</small>}
                    </>
                  )}

                  {resetStep === "OTP" && (
                    <>
                      <p>Enter the OTP sent to <strong>{resetForm.email}</strong> and set a new password:</p>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter OTP"
                        value={resetForm.otp}
                        onChange={(e) =>
                          setResetForm({ ...resetForm, otp: e.target.value })
                        }
                      />
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={resetForm.newPassword}
                        onChange={(e) =>
                          setResetForm({ ...resetForm, newPassword: e.target.value })
                        }
                      />
                      {resetErrors.otp && <small className="text-danger">{resetErrors.otp}</small>}
                      {resetErrors.newPassword && <small className="text-danger">{resetErrors.newPassword}</small>}
                    </>
                  )}
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowResetModal(false)}>
                    Cancel
                  </button>

                  {resetStep === "EMAIL" && (
                    <button className="btn btn-primary" onClick={handleSendResetOtp}>
                      Send OTP
                    </button>
                  )}
                  {resetStep === "OTP" && (
                    <button className="btn btn-success" onClick={handleResetPassword}>
                      Reset Password
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        {loading && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

      </div>
    </div>

  );
}

export default LoginForm;
