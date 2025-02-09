import React, { useState, useCallback } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { usePost } from "../hooks/usePost";
import { useGet } from "../hooks/useGet";
import { debounce } from "lodash";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  InputAdornment,
  IconButton
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PassengerSelector from './PassengerSelector'
import { getAirportSuggestions, searchFlights } from '../utils/apiService';

import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [value, setValue] = useState("single");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const options = ["Regular", "Student", "Armed Forces", "Senior Citizen"];

  const [fromCode, setFromCode] = useState(""); // Store airport code
  const [toCode, setToCode] = useState("");     // Store airport code

  //State for Passenger Input
  const [passengerModalOpen, setPassengerModalOpen] = useState(false);
  const [passengers, setPassengers] = useState({ adult: 1, children: 0, infant: 0 });


  // State for input fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // State for API search results
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);

  // State to control the visibility of the dropdowns
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const navigate = useNavigate();
  


  const normalizeOptions = (data) => {
    return (
      Array.isArray(data)
        ? data
          .filter((item) => Array.isArray(item.airports) && item.airports.length > 0) // Filter items with airport objects
          .map((item) => {
            const airportCodes = item.airports.map((airport) => airport.code).join(", ");
            return `(${airportCodes}) ${item.name}, ${item.country.code}`;
          })
        : []
    );
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to fetch airport suggestions
  const fetchAirportSuggestions = async (query, setResults) => {
    const results = await getAirportSuggestions(query);
    setResults(results);
  };

  // Debounced API call handlers
  const debouncedFetchFromResults = debounce((query) => fetchAirportSuggestions(query, setFromResults), 800);
  const debouncedFetchToResults = debounce((query) => fetchAirportSuggestions(query, setToResults), 800);

  // Handle input change
  const handleFromChange = (e) => {
    const query = e.target.value;
    // console.log("Query Typed:", query);
    setFrom(query);
    setShowFromDropdown(true);
    debouncedFetchFromResults(query);
  };

  const handleToChange = (e) => {
    const query = e.target.value;
    setTo(query);
    setShowToDropdown(true);
    debouncedFetchToResults(query);
  };

  // Handle selection from dropdown
  const handleFromSelect = (selectedAirport) => {
    setFrom(selectedAirport.name);  // Display airport name
    setFromCode(selectedAirport.code); // Store airport code
    setShowFromDropdown(false);
  };

  const handleToSelect = (selectedAirport) => {
    setTo(selectedAirport.name);  // Display airport name
    setToCode(selectedAirport.code); // Store airport code
    setShowToDropdown(false);
  };

  //For Passenger Modal
  const openPassengerModal = () => setPassengerModalOpen(true);
  const closePassengerModal = () => setPassengerModalOpen(false);

  const handleApplyPassengers = (newPassengers) => {
    setPassengers(newPassengers);
    closePassengerModal();
  };

  //For Final Search Flight functions:
  const handleSearch = async () => {
    if (!fromCode || !toCode) {
      console.error("Please select valid airport codes for both origin and destination.");
      return;
    }

    const payload = {
      origin: fromCode,
      destination: toCode,
      departureDate: departureDate.format("YYYY-MM-DD"),
      sort: "price",
      page: 1,
      limit: 20,
      adults: passengers.adult,
      children: passengers.children,
      infants: passengers.infant,
      cabinType: "Economy",
      language: "en-us",
      currency: "USD",
    };

    // console.log("Sending search request with payload:", payload);

    try {
      const response = await searchFlights(payload);
      navigate("/flights", { state: { searchResults: response, payload:payload } });
    } catch (error) {
      console.error("Search request failed:", error);
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to fetch airport suggestions
  const fetchAirportSuggestions = async (query, setResults) => {
    const results = await getAirportSuggestions(query);
    setResults(results);
  };

  // Debounced API call handlers
  const debouncedFetchFromResults = debounce((query) => fetchAirportSuggestions(query, setFromResults), 800);
  const debouncedFetchToResults = debounce((query) => fetchAirportSuggestions(query, setToResults), 800);

  // Handle input change
  const handleFromChange = (e) => {
    const query = e.target.value;
    // console.log("Query Typed:", query);
    setFrom(query);
    setShowFromDropdown(true);
    debouncedFetchFromResults(query);
  };

  const handleToChange = (e) => {
    const query = e.target.value;
    setTo(query);
    setShowToDropdown(true);
    debouncedFetchToResults(query);
  };

  // Handle selection from dropdown
  const handleFromSelect = (selectedAirport) => {
    setFrom(selectedAirport.name);  // Display airport name
    setFromCode(selectedAirport.code); // Store airport code
    setShowFromDropdown(false);
  };

  const handleToSelect = (selectedAirport) => {
    setTo(selectedAirport.name);  // Display airport name
    setToCode(selectedAirport.code); // Store airport code
    setShowToDropdown(false);
  };

  //For Passenger Modal
  const openPassengerModal = () => setPassengerModalOpen(true);
  const closePassengerModal = () => setPassengerModalOpen(false);

  const handleApplyPassengers = (newPassengers) => {
    setPassengers(newPassengers);
    closePassengerModal();
  };

  //For Final Search Flight functions:
  const handleSearch = async () => {
    if (!fromCode || !toCode) {
      console.error("Please select valid airport codes for both origin and destination.");
      return;
    }

    const payload = {
      origin: fromCode,
      destination: toCode,
      departureDate: departureDate.format("YYYY-MM-DD"),
      sort: "price",
      page: 1,
      limit: 20,
      adults: passengers.adult,
      children: passengers.children,
      infants: passengers.infant,
      cabinType: "Economy",
      language: "en-us",
      currency: "USD",
    };

    // console.log("Sending search request with payload:", payload);

    try {
      const response = await searchFlights(payload);
      navigate("/flights", { state: { searchResults: response, payload:payload } });
    } catch (error) {
      console.error("Search request failed:", error);
    }
  };

  return (
    <div className="search-box">
      <Grid container spacing={2}>
        {/* Trip Type Selector */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <RadioGroup row value={value} onChange={handleChange}>
              <FormControlLabel value="single" control={<Radio />} label="One way" />
              <FormControlLabel value="return" control={<Radio />} label="Round Trip" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* From & To Fields */}
        <Grid item lg={5} md={5} sm={12} xs={12} position="relative">
          <TextField
            fullWidth
            label="From"
            value={from}
            onChange={handleFromChange}
            InputProps={{
              endAdornment: from && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setFrom("")} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {showFromDropdown && fromResults.length > 0 && (
            <List
              sx={{
                position: "absolute",
                width: "100%",
                background: "#fff",
                zIndex: 1000,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                maxHeight: "200px", // Limit height
                overflowY: "auto",  // Enable scrolling
                borderRadius: "8px",
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {fromResults.map((airport, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleFromSelect(airport)}
                  sx={{
                    "&:hover": { background: "#f5f5f5" },
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    {/* Airport Name (80%) + Code (20%) */}
                    <Grid item xs={8}>
                      <Typography variant="body1" fontWeight="bold">
                        {airport.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body1" fontWeight="bold" color="textSecondary">
                        {airport.code || ""}
                      </Typography>
                    </Grid>

                    {/* City, Country Below */}
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {airport.city}, {airport.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}

            </List>
          )}

        </Grid>

        <Grid item lg={2} md={2} sm={12} xs={12} display="flex" justifyContent="center" alignItems="center">
          <SwapHorizIcon sx={{ cursor: "pointer" }} />
        </Grid>

        <Grid item lg={5} md={5} sm={12} xs={12} position="relative">
          <TextField
            fullWidth
            label="To"
            value={to}
            onChange={handleToChange}
            InputProps={{
              endAdornment: to && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setTo("")} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {showToDropdown && toResults.length > 0 && (
            <List
              sx={{
                position: "absolute",
                width: "100%",
                background: "#fff",
                zIndex: 1000,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                maxHeight: "200px",
                overflowY: "auto",
                borderRadius: "8px",
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {toResults.map((airport, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleToSelect(airport)}
                  sx={{
                    "&:hover": { background: "#f5f5f5" },
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
                    {/* Airport Name (80%) + Code (20%) */}
                    <Grid item xs={8}>
                      <Typography variant="body1" fontWeight="bold">
                        {airport.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body1" fontWeight="bold" color="textSecondary">
                        {airport.code || ""}
                      </Typography>
                    </Grid>

                    {/* City, Country Below */}
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {airport.city}, {airport.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker label="Departure Date" value={departureDate} onChange={setDepartureDate} minDate={dayjs()} />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker label="Return Date" value={returnDate} disabled={value !== "return"} onChange={setReturnDate} minDate={dayjs()} />
          </Grid>
        </LocalizationProvider>

        {/* Passengers & Class */}
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <Button sx={{
            color: 'black',
            borderColor: 'gainsboro',
            padding: '0.9rem'
          }} fullWidth variant="outlined" onClick={openPassengerModal}>
            {passengers.adult} Adult{passengers.adult > 1 ? "s" : ""},
            {passengers.children} Child{passengers.children !== 1 ? "ren" : ""},
            {passengers.infant} Infant{passengers.infant > 1 ? "s" : ""}
          </Button>
        </Grid>
        {/* Passenger Selection Modal */}
        <PassengerSelector
          open={passengerModalOpen}
          onClose={closePassengerModal}
          onApply={handleApplyPassengers}
          initialPassengers={passengers}
        />
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField fullWidth label="Class" />
        </Grid>

        {/* Special Fare Options */}
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Box sx={{ textAlign: "center", paddingTop: "5%" }}>
            <Typography fontWeight="bold">Select a special fare</Typography>
          </Box>
        </Grid>


        {/* Search Button */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: "11vw", "&:hover": { background: "#3f8fd6ff" } }} onClick={handleSearch}>
            Search Flights
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBox;