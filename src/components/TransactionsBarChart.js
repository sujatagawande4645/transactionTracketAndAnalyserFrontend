import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register the required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getbarchart`, {
        params: { month: selectedMonth },
      });

      const data = response.data.priceRanges;
      const labels = Object.keys(data);
      const values = Object.values(data);

      setBarChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  return (
    <div>
      <Bar
        data={barChartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TransactionsBarChart;
