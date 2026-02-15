import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";
import { Chart as GoogleChart } from "react-google-charts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${config.API_URL}/admissionData`);
        const admissions = res.data._embedded?.admissions || [];

        const updatedData = admissions.map(entry => ({
          ...entry,
          id: entry._links?.self?.href?.split("/").pop()
        }));

        setAdmissionData(updatedData);
      } catch (err) {
        console.log("err", err);
        swal("Error", err.response?.data?.message || "Something went wrong", "error");
      }
    };

    getData();
  }, []);

  const statusCounts = admissionData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = [
    ["Status", "Count"],
    ["APPROVED", statusCounts["APPROVED"] || 0],
    ["PENDING", statusCounts["PENDING"] || 0],
    ["REJECTED", statusCounts["REJECTED"] || 0],
  ];

  const pieChartOptions = {
    title: "Admission Status",
    is3D: true,
    pieSliceText: "percentage",
    chartArea: { left: 20, top: 40, width: '90%', height: '75%' },
    slices: {
      0: { color: "#28a745" },
      1: { color: "#ffc107" },
      2: { color: "#dc3545" },
    },
    legend: { position: "right", textStyle: { color: "black", fontSize: 14 } },
  };

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

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">Admission Status Overview</h3>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h6 className="text-center">Pie Chart</h6>
          <GoogleChart
            chartType="PieChart"
            data={pieChartData}
            options={pieChartOptions}
            width="100%"
            height="300px"
          />
        </div>

        <div className="col-md-6 mb-4 d-flex flex-column align-items-center">
          <h6 className="text-center">Doughnut Chart</h6>
          <div style={{ width: "250px", height: "250px" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h6 className="text-center">Bar Chart</h6>
          <GoogleChart
            chartType="BarChart"
            data={barChartData}
            options={barChartOptions}
            width="100%"
            height="300px"
          />
        </div>

        <div className="col-md-6 mb-4">
          <h6 className="text-center">Column Chart</h6>
          <GoogleChart
            chartType="ColumnChart"
            data={barChartData}
            options={barChartOptions}
            width="100%"
            height="300px"
          />
        </div>
      </div>
    </div>
  );
}

export default Chart;
