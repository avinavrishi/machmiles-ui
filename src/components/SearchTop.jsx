import { Box, Grid } from "@mui/material";
import React from "react";

function SearchTop() {
  return (
    <div className="search-res">
      <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box className="searchBox-result-container">Pre-selected values here</Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <div
            style={{
              border: "1px solid white",
              // borderRadius: "14px",
              background: "#ffff",
              height: "35vw",
            }}
          >
            Filter Box
          </div>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  border: "1px solid white",
                  // borderRadius: "14px",
                  background: "#ffff",
                  height: "4rem",
                }}
              >
                Date wise rates here
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  border: "1px solid white",
                  // borderRadius: "14px",
                  background: "#ffff",
                  height: "4rem",
                }}
              >
                Flight Booking Card
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchTop;
