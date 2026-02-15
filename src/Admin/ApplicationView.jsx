import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import 'bootstrap/dist/css/bootstrap.min.css';

function ApplicationView() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiptHtml, setReceiptHtml] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get(`${config.API_URL}/admissionData/${id}`)
      .then((res) => {
        setApplication(res.data);
      })
      .catch((err) => {
        console.error("Error fetching application data:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleViewReceipt = async () => {
    try {
      const url = `${config.API_URL}/receipts/${application.receiptUrl}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load receipt");
      const html = await response.text();
      setReceiptHtml(html);
      setShowPopup(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setReceiptHtml("");
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!application) return <div className="container mt-4">Application not found.</div>;

  return (
    <div className="container mt-4">
      <h2>Application Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Application ID</th><td>{id}</td></tr>
          <tr><th>Full Name</th><td>{application.firstName} {application.middleName} {application.surname}</td></tr>
          <tr><th>Date of Birth</th><td>{application.dob}</td></tr>
          <tr><th>Gender</th><td>{application.gender}</td></tr>
          <tr><th>Email</th><td>{application.email}</td></tr>
          <tr><th>Contact Number</th><td>{application.contactNumber}</td></tr>
          <tr><th>Nationality</th><td>{application.nationality}</td></tr>
          <tr><th>Mother Tongue</th><td>{application.motherTongue}</td></tr>
          <tr><th>Place of Birth</th><td>{application.placeOfBirth}</td></tr>
          <tr><th>Birth Country</th><td>{application.birthCountry}</td></tr>
          <tr><th>School Name</th><td>{application.schoolName}</td></tr>
          <tr><th>Curriculum</th><td>{application.curriculum}</td></tr>
          <tr><th>Academic Year</th><td>{application.academicYear}</td></tr>
          <tr><th>Grade</th><td>{application.grade}</td></tr>
          <tr><th>Category</th><td>{application.category}</td></tr>
          <tr><th>Application Date</th><td>{application.applicationDate}</td></tr>
          <tr>
            <th>Status</th>
            <td>
              <span className={`badge ${application.status === "APPROVED"
                ? "bg-success"
                : application.status === "REJECTED"
                  ? "bg-danger"
                  : "bg-warning text-dark"
                }`}>
                {application.status}
              </span>
            </td>
          </tr>
          <tr><th>Payment Status</th><td>{application.paymentStatus}</td></tr>
          <tr><th>Amount</th> <td>₹{(application.amount / 100).toFixed(2)}</td></tr>
          <tr>
            <th>Receipt</th>
            <td>
              {application.receiptUrl ? (
                <button onClick={handleViewReceipt} className="btn btn-sm btn-primary">
                  View Receipt
                </button>
              ) : (
                "No receipt uploaded"
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Receipt Modal */}
      {showPopup && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Receipt</h5>
                <button type="button" className="btn-close" onClick={closePopup} />
              </div>
              <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <div dangerouslySetInnerHTML={{ __html: receiptHtml }} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationView;
