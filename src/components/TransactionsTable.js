import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const TransactionsTable = ({ selectedMonth, handlePageChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, page, searchText]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions`, {
        params: { month: selectedMonth, page, search: searchText },
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search Transactions"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell> {/* New Image Column */}
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Date of Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  <img 
                    src={transaction.image} // Ensure this property exists
                    alt={transaction.title}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} // Adjust size and fit
                  />
                </TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                <TableCell>{transaction.dateOfSale}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => handlePageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
