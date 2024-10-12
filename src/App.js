import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsStatistics from "./components/TransactionsStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart";
import "./App.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
} from "@mui/material";

const MainPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(1); // No default selection initially

  // Handles month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Use effect to trigger API calls when month is selected
  useEffect(() => {
    if (selectedMonth !== "") {
      // APIs will be called whenever the selectedMonth changes
      console.log(`Selected Month: ${selectedMonth}`);
    }
  }, [selectedMonth]);

  const handlePageChange = (newPage) => {
    // Logic for handling pagination
  };

  return (
    <Container>
      <FormControl fullWidth style={{ marginBottom: "20px", marginTop: "50px" }}>
        <InputLabel id="month-label">Select Month</InputLabel>
        <Select
          labelId="month-label"
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>February</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </Select>
      </FormControl>

      {selectedMonth && (
        <>
          <TransactionsTable
            selectedMonth={selectedMonth}
            handlePageChange={handlePageChange}
          />
          <TransactionsStatistics selectedMonth={selectedMonth} />
          <TransactionsBarChart selectedMonth={selectedMonth} />
          <TransactionsPieChart selectedMonth={selectedMonth} />
        </>
      )}
    </Container>
  );
};

export default MainPage;
