import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function LoginPopup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = (role) => {
    setShow(false);
    if (role === "student") {
      navigate("/registration");
    } else if (role === "admin") {
      navigate("/adminlogin");
    }
  };

  return (
    <>
      {/* Login Button */}
      <div className="d-flex align-items-center ms-3">
        <Button className="btn btn-outline-light" onClick={() => setShow(true)}>
          Login
        </Button>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Login Role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={() => handleRedirect("student")}
          >
            Student Login
          </Button>
          <Button
            variant="success"
            className="w-100"
            onClick={() => handleRedirect("admin")}
          >
            Admin Login
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPopup;
