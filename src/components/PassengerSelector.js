import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PassengerSelector = ({ open, onClose, onApply, initialPassengers }) => {
  // Local state for passengers
  const [passengers, setPassengers] = useState({ ...initialPassengers });

  const handlePassengerChange = (type, change) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.min(
        { adult: 8, children: 6, infant: 2 }[type],
        Math.max(0, prev[type] + change)
      ),
    }));
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Select Passengers</DialogTitle>
      <DialogContent>
        {[
          { label: "Adults", type: "adult", min: 1, max: 8 },
          { label: "Children", type: "children", min: 0, max: 6 },
          { label: "Infants", type: "infant", min: 0, max: 2 },
        ].map(({ label, type, min, max }) => (
          <Grid container key={type} spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{label}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => handlePassengerChange(type, -1)} disabled={passengers[type] === min}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ marginX: 2 }}>{passengers[type]}</Typography>
              <IconButton onClick={() => handlePassengerChange(type, 1)} disabled={passengers[type] === max}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onApply(passengers)} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PassengerSelector;
