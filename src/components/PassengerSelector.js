import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

const PassengerSelector = ({ open, onClose, onApply, initialPassengers }) => {
  // Local state for passengers
  const [passengers, setPassengers] = useState({ ...initialPassengers });

  const handleSelect = (type, value) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const renderSelectionBoxes = (type, range) => (
    <Grid container spacing={1} justifyContent="center">
      {range.map((num) => (
        <Grid item key={num}>
          <Button
            variant={passengers[type] === num ? "contained" : "outlined"}
            onClick={() => handleSelect(type, num)}
          >
            {num}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={onClose} sx={{padding:'1rem'}}>
      <DialogTitle>Select Passengers</DialogTitle>
      <DialogContent>
        {[ 
          { label: "Adults", type: "adult", range: Array.from({ length: 10 }, (_, i) => i) },
          { label: "Children", type: "children", range: Array.from({ length: 7 }, (_, i) => i) },
          { label: "Infants", type: "infant", range: Array.from({ length: 5 }, (_, i) => i) },
        ].map(({ label, type, range }) => (
          <div key={type} style={{ marginBottom: 16 }}>
            <Typography sx={{textAlign:'center', fontWeight:600}} gutterBottom>{label}</Typography>
            {renderSelectionBoxes(type, range)}
          </div>
        ))}
      </DialogContent>
      <DialogActions sx={{padding:'2rem'}}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onApply(passengers)} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PassengerSelector;