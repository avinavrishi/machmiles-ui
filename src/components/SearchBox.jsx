import * as React from "react";
import {
    Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const SearchBox = () => {
  const [value, setValue] = useState("single");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const options = ["Regular", "Student", "Armed Forces", "Senior Citizen"];
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search-box">
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="One way"
              />
              <FormControlLabel
                value="return"
                control={<Radio />}
                label="Round Trip"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <TextField fullWidth label="From" />
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={12}
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SwapHorizIcon sx={{ cursor: "pointer" }} />
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12}>
          <TextField fullWidth label="To" />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={dayjs()}
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker
              label="Return Date"
              value={returnDate}
              disabled={value !== "return" && true}
              onChange={(newValue) => setReturnDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={dayjs()}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField fullWidth label="Passengers" />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField fullWidth label="Class" />
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', paddingTop:'5%'}}>
                <Typography sx={{fontWeight:'bold'}}>Select a special fare</Typography>
            </Box>
        </Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
        <Grid container spacing={2}>
          {options.map((option, index) => (
            <Grid item lg={3} md={3} sm={6} xs={6} key={index}>
              <Box
                onClick={() => handleSelect(index)}
                sx={{
                  border: selected === index ? '2px solid #3f8fd6ff' : '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: selected === index ? '#e0f7fa' : '#fff',
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                }}
              >
                {option}
              </Box>
            </Grid>
          ))}
        </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            display: "flex",
            alignContent: "center",
          }}
          mt={2}
        >
          <Button
            sx={{
              background: "#3f8fd6ff",
              color: "white",
              minWidth: "11vw",
              "&:hover": {
                background: "#3f8fd6ff",
                color: "white",
              },
            }}
          >
            Search Flights
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBox;
