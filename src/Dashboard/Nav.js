import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import schoollogo from './Img/Universitylogo.png';
import LoginPopup from './LoginPopup';
import './Nav.css';

function Nav() {


  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get session values
  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));
    setName(sessionStorage.getItem('name'));
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('token');
    window.location.href = '/registration';
  };

  return (
    <>
      <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid px-3">
            {/* Logo Section */}
            <NavLink className="navbar-brand brand-wrapper" to="/Dashboard">
              <div className="logo-container">
                <img
                  src={schoollogo}
                  alt="School Logo"
                  className="school-logo"
                />
              </div>
              <div className="brand-text">
                <h4 className="school-name">The Pune School</h4>
                <span className="school-tagline">Excellence in Education</span>
              </div>
            </NavLink>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              {/* Navigation Menu */}
              <ul className="navbar-nav mx-auto main-nav">
                {/* DASHBOARD Dropdown */}
                {sessionStorage.name && sessionStorage.name.trim() !== '' && (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="nav-icon">📊</span>
                      DASHBOARD
                    </button>
                    <ul className="dropdown-menu custom-dropdown">
                      {sessionStorage.name === 'admin' ? (
                        <>
                          <li>
                            <NavLink className="dropdown-item" to="/adminDash">
                              <span className="dropdown-icon">🎯</span>
                              Admin Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/fulladminDash">
                              <span className="dropdown-icon">📈</span>
                              Full Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/viewUsers">
                              <span className="dropdown-icon">👥</span>
                              View Users
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/chart">
                              <span className="dropdown-icon">📊</span>
                              Charts
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <li>
                          <NavLink className="dropdown-item" to="/AdmissionFormDashboard">
                            <span className="dropdown-icon">📝</span>
                            Admission Form Dashboard
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </li>
                )}

                {/* SCHOOL Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="nav-icon">🏫</span>
                    SCHOOL
                  </button>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/governingbody">
                        <span className="dropdown-icon">👔</span>
                        Governing Body
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/leadershipteam">
                        <span className="dropdown-icon">🎖️</span>
                        Leadership Team
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/contactus">
                        <span className="dropdown-icon">📞</span>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* ABOUT Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="nav-icon">ℹ️</span>
                    ABOUT
                  </button>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/history">
                        <span className="dropdown-icon">📜</span>
                        History
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/directorsmessage">
                        <span className="dropdown-icon">💬</span>
                        Directors' Message
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/principaldesk">
                        <span className="dropdown-icon">🎓</span>
                        Principal Desk
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/visionmission">
                        <span className="dropdown-icon">🎯</span>
                        Vision & Mission
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* ADMISSION Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="nav-icon">📋</span>
                    ADMISSION
                  </button>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/schoolfees">
                        <span className="dropdown-icon">💰</span>
                        School Fees
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/registeronlineadmission">
                        <span className="dropdown-icon">✍️</span>
                        Register Online
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* EVENT Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="nav-icon">🎉</span>
                    EVENT
                  </button>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/gallery">
                        <span className="dropdown-icon">🖼️</span>
                        Gallery
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* ACADEMIC Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="nav-icon">📚</span>
                    ACADEMIC
                  </button>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/academic">
                        <span className="dropdown-icon">📖</span>
                        Academic
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/coCurricular">
                        <span className="dropdown-icon">🎨</span>
                        Co-Curricular
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/timetable">
                        <span className="dropdown-icon">🕐</span>
                        Timetable
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/news">
                        <span className="dropdown-icon">📰</span>
                        News
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Auth Section */}
              <div className="auth-section">
                {email ? (
                  <div className="user-profile-wrapper">
                    <div className="user-info">
                      <div className="user-avatar">
                        {name ? name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{name || 'User'}</div>
                        <div className="user-email">{email}</div>
                      </div>
                    </div>
                    <button className="btn-logout" onClick={handleLogout}>
                      <span className="logout-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                ) : (
                  <LoginPopup />
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Admission Banner */}
        {name?.toLowerCase() !== 'admin' && (
          <div className="admission-banner">
            <a href="/registration" className="banner-link">
              <div className="banner-content">
                <span className="banner-icon">🎓</span>
                <span className="banner-text">Admissions Open – Limited Seats!</span>
                <span className="banner-icon">🚀</span>
              </div>
            </a>
          </div>
        )}
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default Nav;