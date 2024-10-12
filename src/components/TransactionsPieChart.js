import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";


ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionsPieChart = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchPieChartData();
  }, [selectedMonth]);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getpiechart`, {
        params: { month: selectedMonth },
      });

      const categories = response.data.categories;
      const labels = categories.map((cat) => cat.category);
      const values = categories.map((cat) => cat.count);

      setPieChartData({
        labels,
        datasets: [
          {
            label: "Category Distribution",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            data: values,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  return (
    <div style={{width:"500px",margin:"20px auto"}}>
      <Pie
        data={pieChartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default TransactionsPieChart;
