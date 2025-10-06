import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import dark from '../icons/contrast_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import light from '../icons/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg';
import React from 'react';
import schoollogo from '../Dashboard/Img/Universitylogo.png';
import LoginPopup from "./LoginPopup";

function Nav() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);

  // Get session values
  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
    setName(sessionStorage.getItem("name")); // Make sure you're saving "name" in sessionStorage during login
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token");
    // navigate("/registration", { replace: true }); // or just window.location.reload()
    window.location.href = "/registration";

  };

  const themeStyle = {
    backgroundColor: isLight ? "#ffffffff" : "#ffffff",
    color: isLight ? "#ffffff" : "#ffffffff",
    padding: "10px 20px",
    transition: "all 0.3s ease"
  };

  const linkStyle = {
    color: isLight ? "#ffffff" : "#ffffffff",
    fontWeight: "500",
    margin: "0 8px"
  };

  const dropdownItemStyle = {
    color: "#000000"
  };


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg shadow bg-black">
          <div className="container-fluid">

            {/* Logo */}
            <NavLink className="navbar-brand" to="/Dashboard">
              <img
                src={schoollogo}
                alt="School Logo"
                style={{ width: '50px', height: '50px', borderRadius: '8px' }}
              />
            </NavLink>
            <h4 className="m-0 text-white">The Pune School</h4>


            {/* Toggler */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
             <ul className="navbar-nav align-items-center">
  {/* DASHBOARD Dropdown */}
  {sessionStorage.name && sessionStorage.name.trim() !== "" && (
    <li className="nav-item dropdown text-white">
      <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
        DASHBOARD
      </a>
      <ul className="dropdown-menu">
        {sessionStorage.name === "admin" ? (
          <li>
            <NavLink className="dropdown-item" to="/adminDash" style={dropdownItemStyle}>
              Admin Dashboard
            </NavLink>
             <NavLink className="dropdown-item" to="/fulladminDash" style={dropdownItemStyle}>
               Dashboard
            </NavLink>
            <NavLink className="dropdown-item" to="/viewUsers" style={dropdownItemStyle}>
               ViewUsers
            </NavLink>
            <NavLink className="dropdown-item" to="/chart" style={dropdownItemStyle}>
               Chart
            </NavLink>
          </li>
          
        ) : (
          <li>
            <NavLink className="dropdown-item" to="/AdmissionFormDashboard" style={dropdownItemStyle}>
              Admission Form Dashboard
            </NavLink>
          </li>
        )}
      </ul>
    </li>
  )}

  {/* SCHOOL Dropdown */}
  <li className="nav-item dropdown text-white">
    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
      SCHOOL
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to="/governingbody" style={dropdownItemStyle}>Governing Body</NavLink></li>
      <li><NavLink className="dropdown-item" to="/leadershipteam" style={dropdownItemStyle}>Leadership Team</NavLink></li>
      <li><NavLink className="dropdown-item" to="/contactus" style={dropdownItemStyle}>Contact Us</NavLink></li>
    </ul>
  </li>

  {/* ABOUT Dropdown */}
  <li className="nav-item dropdown text-white">
    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
      ABOUT
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to="/history" style={dropdownItemStyle}>History</NavLink></li>
      <li><NavLink className="dropdown-item" to="/directorsmessage" style={dropdownItemStyle}>Directors’ Message</NavLink></li>
      <li><NavLink className="dropdown-item" to="/principaldesk" style={dropdownItemStyle}>Principal Desk</NavLink></li>
      <li><NavLink className="dropdown-item" to="/visionmission" style={dropdownItemStyle}>Vision & Mission</NavLink></li>
    </ul>
  </li>

  {/* ADMISSION Dropdown */}
  <li className="nav-item dropdown text-white">
    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
      ADMISSION
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to="/schoolfees" style={dropdownItemStyle}>School Fees</NavLink></li>
      <li><NavLink className="dropdown-item" to="/registeronlineadmission" style={dropdownItemStyle}>Register Online</NavLink></li>
    </ul>
  </li>

  {/* EVENT Dropdown */}
  <li className="nav-item dropdown text-white">
    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
      EVENT
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to="/gallery" style={dropdownItemStyle}>Gallery</NavLink></li>
    </ul>
  </li>

  {/* ACADEMIC Dropdown */}
  <li className="nav-item dropdown text-white">
    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={linkStyle}>
      ACADEMIC
    </a>
    <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" to="/academic" style={dropdownItemStyle}>Academic</NavLink></li>
      <li><NavLink className="dropdown-item" to="/coCurricular" style={dropdownItemStyle}>Co-Curricular</NavLink></li>
      <li><NavLink className="dropdown-item" to="/timetable" style={dropdownItemStyle}>Timetable</NavLink></li>
      <li><NavLink className="dropdown-item" to="/news" style={dropdownItemStyle}>News</NavLink></li>
    </ul>
  </li>
</ul>


              {/* Right section: Auth */}
              <div className="d-flex align-items-center ms-3 text-white">
                {email ? (
                  <>
                    <div className="me-3 text-end">
                      <div style={{ fontSize: "0.9rem" }}>{name || "User"}</div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>{email}</div>
                    </div>
                    <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <LoginPopup />
                )}
              </div>
            </div>
          </div>
        </nav>

        {name?.toLowerCase() !== "admin" && (
          <a href="/registration" className="text-decoration-none text-dark">
            <div className="marquee-container bg-warning text-dark py-2">
              <marquee>
                <div className="scroll-text fw-bold text-uppercase">
                  🎓 Admissions Open – Limited Seats! 🚀
                </div>
              </marquee>
            </div>
          </a>
        )}


      </header>

      <main>
        <Outlet />
      </main>
    </>
  );


}

export default Nav;
