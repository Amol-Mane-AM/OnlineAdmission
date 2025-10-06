import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import 'bootstrap/dist/css/bootstrap.min.css';

function FullAdminDash() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [admissionData, setAdmissionData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Receipt modal state
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [receiptHtml, setReceiptHtml] = useState("");
  const [modalFade, setModalFade] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/admissionData");
      const admissions = res.data._embedded?.admissions || [];

      const updatedData = admissions.map((entry) => ({
        ...entry,
        id: entry._links?.self?.href?.split("/").pop(),
      }));

      setAdmissionData(updatedData);
    } catch (err) {
      console.log("err", err);
      swal(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = admissionData.filter(
    (item) => item.status === activeTab
  );

  const handleViewReceipt = async (receiptUrl) => {
    try {
      const url = `http://localhost:8080/receipts/${receiptUrl}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load receipt");
      const html = await response.text();
      setReceiptHtml(html);

      // Animate modal fade in
      setShowReceiptPopup(true);
      setTimeout(() => setModalFade(true), 10);
    } catch (err) {
      swal("Error", err.message, "error");
    }
  };

  const closeModal = () => {
    // Animate modal fade out
    setModalFade(false);
    setTimeout(() => setShowReceiptPopup(false), 300);
  };
const statusColorMap = {
  PENDING: "btn-warning",
  APPROVED: "btn-success",
  REJECTED: "btn-danger",
};

  return (
    <div className="container my-4 hero-section">
      <h1 className="mb-4"> Admin Dashboard</h1>

      {/* Tabs */}
      <div className="mb-3">
  {["PENDING", "APPROVED", "REJECTED"].map((status) => (
  <button
    key={status}
    onClick={() => setActiveTab(status)}
    className={`btn me-2 ${
      activeTab === status ? statusColorMap[status] : ""
    }`}
    style={{
      backgroundColor: activeTab === status ? undefined : "white",
      border: "1px solid #ccc", // optional: add border so white buttons still look like buttons
      color: activeTab === status ? undefined : "black",
    }}
  >
    {status}
  </button>
))}

</div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle" style={{ minWidth: "1200px" }}>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Payment Status</th>
                <th>Receipt</th>
                <th>Academic Year</th>
                <th>Amount</th>
                <th>Application Date</th>
                <th>Birth Country</th>
                <th>Category</th>
                <th>Contact Number</th>
                <th>Curriculum</th>
                <th>DOB</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Gender</th>
                <th>Grade</th>
                <th>Middle Name</th>
                <th>Mother Tongue</th>
                <th>Nationality</th>
                <th>Place of Birth</th>
                <th>School Name</th>
                <th>Status</th>
                <th>Surname</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.paymentStatus}</td>
                    <td>
                      {item.receiptUrl ? (
                        <button
                          onClick={() => handleViewReceipt(item.receiptUrl)}
                          className="btn btn-link p-0"
                          style={{ textDecoration: "underline" }}
                        >
                          View Receipt
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{item.academicYear}</td>
                    <td>{item.amount}</td>
                    <td>{item.applicationDate}</td>
                    <td>{item.birthCountry}</td>
                    <td>{item.category}</td>
                    <td>{item.contactNumber}</td>
                    <td>{item.curriculum}</td>
                    <td>{item.dob}</td>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.gender}</td>
                    <td>{item.grade}</td>
                    <td>{item.middleName}</td>
                    <td>{item.motherTongue}</td>
                    <td>{item.nationality}</td>
                    <td>{item.placeOfBirth}</td>
                    <td>{item.schoolName}</td>
                    <td>{item.status}</td>
                    <td>{item.surname}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="22" className="text-center">
                    No data available for {activeTab}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bootstrap Modal for Receipt */}
      {showReceiptPopup && (
        <div
          className={`modal fade ${modalFade ? "show d-block" : ""}`}
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-scrollable"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Receipt</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div dangerouslySetInnerHTML={{ __html: receiptHtml }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullAdminDash;
