import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Chart } from "react-google-charts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDash() {
  if (sessionStorage.name !== 'admin') {
    window.location.href = "/adminlogin";
  }

  const [admissionData, setAdmissionData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const closeModal = () => setShowModal(false);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admissionData");
      const admissions = res.data._embedded.admissions || [];

      const updatedData = admissions.map(entry => ({
        ...entry,
        id: entry._links?.self?.href?.split("/").pop()
      }));

      setAdmissionData(updatedData);
      setSelectedIds([]);
    } catch (err) {
      console.log("err", err);
      swal("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateStatus = async (newStatus) => {
    if (selectedIds.length === 0) {
      return swal("Warning", "Please select at least one record", "warning");
    }

    setLoading(true);

    try {
      await Promise.all(
        selectedIds.map((id) => {
          const record = admissionData.find((entry) => entry.id === id);
          return axios.put(`http://localhost:8080/admission/admissionData/${id}`, {
            ...record,
            status: newStatus,
          });
        })
      );

      swal("Success", `Status updated to ${newStatus}`, "success");
      getData();
    } catch (error) {
      console.error(error);
      swal("Error", "Failed to update status", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filteredData = admissionData.filter((entry) => {
    const fullName = `${entry.firstName} ${entry.surname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.contactNumber.includes(searchTerm)
    );
  });

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
    const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // Chart data
  const statusCounts = admissionData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartOptions = {
    title: "Admission Status",
    is3D: true,
    pieSliceText: "percentage",
    pieSliceTextStyle: { color: "black", fontSize: 14 },
    pieSliceBorderColor: "#000",
    chartArea: { left: 20, top: 40, width: '90%', height: '75%' },
    slices: {
      0: { color: "#28a745" },
      1: { color: "#ffc107" },
      2: { color: "#dc3545" },
    },
    legend: { position: "right", textStyle: { color: "black", fontSize: 14 } },
  };

  const pieChartData = [
    ["Status", "Count"],
    ["APPROVED", statusCounts["APPROVED"] || 0],
    ["PENDING", statusCounts["PENDING"] || 0],
    ["REJECTED", statusCounts["REJECTED"] || 0],
  ];

  const barChartData = [
    ["Status", "Count", { role: "style" }],
    ["APPROVED", statusCounts["APPROVED"] || 0, "#28a745"],
    ["PENDING", statusCounts["PENDING"] || 0, "#ffc107"],
    ["REJECTED", statusCounts["REJECTED"] || 0, "#dc3545"],
  ];

  const barChartOptions = {
    title: "Admission Status",
    legend: { position: "none" },
    hAxis: { title: "Count", minValue: 0 },
    vAxis: { title: "Status" },
  };

  const doughnutData = {
    labels: ["APPROVED", "PENDING", "REJECTED"],
    datasets: [
      {
        data: [
          statusCounts["APPROVED"] || 0,
          statusCounts["PENDING"] || 0,
          statusCounts["REJECTED"] || 0,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        borderColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        labels: { color: "#000" },
      },
    },
  };

  // const ViewUsers = () => {
  //   window.location.href = "/viewUsers";
  // }

  return (
    <div className="container mt-4 hero-section" style={{ height: "1200px" }}>
      <h1 className="mb-4">Admission Dashboard</h1>

      {admissionData.length > 0 && (
        <>
          <div className="mb-3 d-flex justify-content-between">
            <input
              type="text"
              placeholder="Search by name, email, or mobile"
              className="form-control w-50"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={() => updateStatus("APPROVED")}>
                Approve Selected
              </button>
              <button className="btn btn-danger" onClick={() => updateStatus("REJECTED")}>
                Reject Selected
              </button>
              {/* <button className="btn btn-primary" onClick={openModal}>
                Show Charts
              </button> */}
              {/* <button className="btn btn-primary" onClick={ViewUsers}>
                View User
              </button> */}
            </div>
          </div>

          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status" />
              <p>Updating status, please wait...</p>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Select</th>
                  <th>#</th>
                  <th onClick={() => handleSort("firstName")} style={{ cursor: "pointer" }}>
                    Full Name {getSortIcon("firstName")}
                  </th>
                  <th onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                    Email {getSortIcon("email")}
                  </th>
                  <th onClick={() => handleSort("contactNumber")} style={{ cursor: "pointer" }}>
                    Mobile {getSortIcon("contactNumber")}
                  </th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                    Status {getSortIcon("status")}
                  </th>
                  <th>Payment</th>
                  <th>View Application</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(entry.id)}
                        onChange={() => handleCheckboxChange(entry.id)}
                      />
                    </td>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{entry.firstName} {entry.surname}</td>
                    <td>{entry.email}</td>
                    <td>{entry.contactNumber}</td>
                    <td>{entry.gender}</td>
                    <td>{entry.dob}</td>
                    <td>
                      <span
                        className={`badge ${entry.status === "APPROVED"
                            ? "bg-success"
                            : entry.status === "REJECTED"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td>
                      {entry.paymentStatus ? (
                        <span className="badge bg-success">Paid</span>
                      ) : (
                        <span className="badge bg-danger">Unpaid</span>
                      )}
                    </td>
                    <td>
                      <a
                        href={`/application/${entry.id}`}
                        className="btn btn-info btn-sm"
                      >
                        View Application
                      </a>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>




          {/* Pagination controls */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* Modal */}
          {showModal && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Admission Status Charts</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-1">
                        <h6 className="text-center">Pie Chart</h6>
                        <Chart
                          chartType="PieChart"
                          data={pieChartData}
                          options={pieChartOptions}
                          width={"100%"}
                          height={"300px"}
                        />
                      </div>
                      <div className="col-md-6 mb-4 d-flex justify-content-center">
                        <div style={{ width: "250px", height: "250px" }}>
                          <h6 className="text-center">Doughnut Chart</h6>
                          <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <h6 className="text-center">Bar Chart</h6>
                        <Chart
                          chartType="BarChart"
                          width="100%"
                          height="300px"
                          data={barChartData}
                          options={barChartOptions}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="text-center">Column Chart</h6>
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="300px"
                          data={barChartData}
                          options={barChartOptions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>


      )}

      {admissionData.length === 0 && <p className="text-muted">No admission data available.</p>}

    </div>

  );
}
export default AdminDash;

