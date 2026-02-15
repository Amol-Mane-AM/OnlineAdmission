import { useState, useEffect } from "react";
import axios from "axios";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

import { Eye, EyeOff } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import config from "../config";


function SignupForm() {
    /* ──────────────────────────────── state ──────────────────────────────── */
    const [step, setStep] = useState("EMAIL");          // EMAIL → OTP → FORM
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [form, setForm] = useState({ uname: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);

    const [countdown, setCountdown] = useState(0);
    const [resendAvailable, setResendAvailable] = useState(true);


    useEffect(() => {
        if (countdown === 0) {
            setResendAvailable(true);
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    /* ─────────────────────────────── helpers ─────────────────────────────── */
    const resetErrors = () => setErrors({});

    // Accept a param; default to state value if not supplied
    const sendOtp = async (arg) => {
        debugger;
        // If the first argument looks like an event, fall back to state
        const targetEmail = typeof arg === 'string' ? arg : email;

        resetErrors();
        if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(targetEmail.trim())) {
            setErrors({ email: "Enter a valid e‑mail address" });
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${config.API_URL}/auth/send-otp`, { email: targetEmail });
            Swal.fire({
                title: "OTP Sent",
                text: "Check your inbox (and spam folder) for the code.",
                icon: "success"
            });

            setStep("OTP");

            // Start countdown after sending
            setCountdown(300);          // e.g., 300 seconds
            setResendAvailable(false);


        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.response?.data || "Unable to send OTP.",
                icon: "error"
            });

        } finally {
            setLoading(false);
        }
    };



    const verifyOtp = async () => {
        resetErrors();
        if (otp.trim().length !== 6) {
            setErrors({ otp: "OTP must be 6 digits" });
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${config.API_URL}/auth/verify-otp`, { email, otp });
            swal("Verified", "OTP verified. Please complete the form.", "success");
            setStep("FORM");

        } catch (e) {
            swal("Invalid OTP", e.response?.data || "Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const register = async (e) => {
        e.preventDefault();
        resetErrors();
        debugger;
        let invalid = false;
        if (form.uname.length < 3 || form.uname.length > 20 || /\s/.test(form.uname)) {
            setErrors((p) => ({ ...p, uname: "Name must be 3‑20 chars, no spaces" }));
            invalid = true;
        }
        if (form.password.length < 6 || form.password.length > 20) {
            setErrors((p) => ({ ...p, password: "Password 6‑20 chars" }));
            invalid = true;
        }
        if (invalid) return;

        try {
            setLoading(true);
            await axios.post(`${config.API_URL}/user/register`, {
                email,
                uname: form.uname,
                password: form.password,
            });
            swal("Success!", e.response?.data || "Account created.", "success");
            setForm({ uname: "", password: "", email: "" });
            //navigate("/registration");
            setStep("EMAIL");
        } catch (e) {
            swal("Error", e.response?.data || "Registration failed.", "error");
        } finally {
            setLoading(false);
        }
    };

    // /* ---------------- Google Identity initialisation ---------------- */

    // //  Create the handler function
    // const handleGoogleLogin = (credentialResponse) => {
    //     debugger;
    //     try {
    //         const decoded = jwtDecode(credentialResponse.credential);
    //         setEmail(decoded.email);
    //         console.log("Decoded:", decoded);
    //         sendOtp(decoded.email);

    //     } catch (error) {
    //         console.error("JWT Decode failed", error);
    //     }
    // };





    /* ────────────────────────────── render ────────────────────────────── */
    return (
        <div className="card shadow-sm">
            <div className="card-body">

                {/* ─────────────── EMAIL STEP ─────────────── */}
                {step === "EMAIL" && (
                    <>
                        <h4 className="card-title text-center">Registration</h4>
                        <h4 className="card-title text-center">Verify E‑mail</h4>
                        <p className="text-center text-muted mb-4">
                            Enter your e‑mail to receive a one‑time password
                        </p>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            onClick={() => sendOtp()}   // ← no event object is forwarded
                            disabled={loading}
                        >
                            Send OTP
                        </button>

                        {/* {!email && (
                            <div style={{ marginTop: "10px" }}>
                                <GoogleLogin
                                    width={1500}
                                    onSuccess={handleGoogleLogin}           // ← use your function
                                    onError={() => console.log("Login Failed")}
                                />
                            </div>
                        )} */}




                    </>
                )}

                {/* ─────────────── OTP STEP ─────────────── */}
                {step === "OTP" && (
                    <>
                        <h4 className="card-title text-center">Enter OTP</h4>
                        <p className="text-center text-muted mb-4">
                            We emailed a 6‑digit code to <strong>{email}</strong>
                        </p>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control text-center"
                                placeholder="******"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                disabled={loading}
                            />
                            {errors.otp && <small className="text-danger">{errors.otp}</small>}
                        </div>
                        <button
                            className="btn btn-success w-100"
                            onClick={verifyOtp}
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <p className="mt-3 text-center">
                            Didn’t get it?{" "}
                            {resendAvailable ? (
                                <span className="text-primary" role="button" onClick={sendOtp}>
                                    Resend
                                </span>
                            ) : (
                                <span className="text-muted">Resend in {countdown}s</span>
                            )}
                        </p>

                    </>
                )}

                {/* ─────────────── FULL FORM ─────────────── */}
                {step === "FORM" && (
                    <>
                        <h4 className="card-title text-center">Sign Up</h4>
                        <p className="text-center text-muted">Create your account</p>
                        <form onSubmit={register}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="uname"
                                    value={form.uname}
                                    onChange={(e) => setForm({ ...form, uname: e.target.value })}
                                    disabled={loading}
                                />
                                {errors.uname && <small className="text-danger">{errors.uname}</small>}
                            </div>

                            <div className="mb-3 position-relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="btn position-absolute end-0 top-50 translate-middle-y"
                                    style={{ border: "none", background: "transparent" }}
                                    onMouseDown={() => setShowPw(true)}
                                    onMouseUp={() => setShowPw(false)}
                                    onMouseLeave={() => setShowPw(false)}
                                >
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && <small className="text-danger d-block">{errors.password}</small>}
                            </div>

                            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>
                    </>
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

export default SignupForm;
