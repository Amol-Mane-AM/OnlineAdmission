import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ThemeContext } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Use only one state object for the form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    try {
      const { email, password } = formData;

      if (email === 'admin@gmail.com' && password === '111') {
        //alert("Admin logged in");
        sessionStorage.setItem("name", 'admin');
      sessionStorage.setItem("id", '001');
      sessionStorage.setItem("email", email);

       window.location.href = "/adminDash";
      console.log("sessionstorage",sessionStorage);
       
        return;
      }
else{
       
        alert("Login failed. Please try again.");
        navigate("/adminlogin");
       

      // Clear form
      setFormData({ email: '', password: '' });
}
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="bg-white p-5 rounded shadow login-form hero-section"
        style={{ width: '100%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-primary ">Login Account</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            id="showPassword"
          />
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <a href="/register" className="text-decoration-none">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;