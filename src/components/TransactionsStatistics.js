import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics`, {
        params: { month: selectedMonth },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="statistics-class">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#662549" , color:"white"}}> {/* Darker Light Blue */}
            <CardContent>
              <Typography variant="h5">Total Sale Amount</Typography>
              <Typography variant="h6">{statistics.totalSaleAmount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#AE445A" ,color:"white"}}> {/* Darker Light Green */}
            <CardContent>
              <Typography variant="h5">Sold Items</Typography>
              <Typography variant="h6">{statistics.soldItemsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#451952",color:"white" }}> {/* Darker Light Red */}
            <CardContent>
              <Typography variant="h5">Not Sold Items</Typography>
              <Typography variant="h6">{statistics.unsoldItemsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TransactionsStatistics;
