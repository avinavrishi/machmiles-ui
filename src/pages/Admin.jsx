import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import Payments from "../components/Admin/Payments";
import UserInfo from "../components/Admin/UserInfo";
import Bookings from "../components/Admin/Bookings";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container sx={{ marginTop: "4vw" }}>
      {/* <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Panel
      </Typography> */}

      {/* Tabs for navigation */}
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab sx={{fontFamily:'Poppins'}} label="User Info" />
        <Tab sx={{fontFamily:'Poppins'}} label="Bookings" />
        <Tab sx={{fontFamily:'Poppins'}} label="Payments" />
      </Tabs>

      {/* Tab Panels */}
      <Box sx={{ padding: 3 }}>
        {activeTab === 0 && <UserInfo />}
        {activeTab === 1 && <Bookings />}
        {activeTab === 2 && <Payments/>}
      </Box>
    </Container>
  );
};


