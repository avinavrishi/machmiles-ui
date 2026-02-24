import * as React from "react";
import {
  // Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PassengerSelector from './PassengerSelector'
import { getAirportSuggestions, searchFlights, searchReturnFlight } from '../utils/apiService';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../i18n";
import { setPassengerDetails } from "../store/passengerDetailsSlice";

const SearchBox = ({prevData}) => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const {t} = useTranslation();
  const dispatch = useDispatch()
  React.useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Update language when Redux store changes
  }, [selectedLanguage]);
  
  const [value, setValue] = useState(prevData?.tripType || "single");
  const [departureDate, setDepartureDate] = useState(prevData?.departureDate ? dayjs(prevData.departureDate) : dayjs());
  const [returnDate, setReturnDate] = useState(prevData?.returnDate ? dayjs(prevData.returnDate) : dayjs());
  const [cabinClass, setCabinClass] = useState(prevData?.cabinClass || t("economy"));
  // const options = ["Regular", "Student", "Armed Forces", "Senior Citizen"];
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(prevData?.origin || "");
  const [fromCode, setFromCode] = useState(prevData?.origin || "");
  const [to, setTo] = useState(prevData?.destination || "");
  const [toCode, setToCode] = useState(prevData?.destination || "");

  //State for Passenger Input
  const [passengerModalOpen, setPassengerModalOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adult: prevData?.adults || 1,
    children: prevData?.children || 0,
    infant: prevData?.infants || 0
  });


  // State for input fields
  

  // State for API search results
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [fromSuggestionsLoading, setFromSuggestionsLoading] = useState(false);
  const [toSuggestionsLoading, setToSuggestionsLoading] = useState(false);

  // State to control the visibility of the dropdowns
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setValue(e.target.value);
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
  const fetchAirportSuggestions = async (query, setResults, setLoading) => {
    setLoading(true);
    const results = await getAirportSuggestions(query);
    setResults(results);
    setLoading(false);
  };

  // Debounced API call handlers (400ms for snappy UX)
  const debouncedFetchFromResults = debounce(
    (query) => fetchAirportSuggestions(query, setFromResults, setFromSuggestionsLoading),
    400
  );
  const debouncedFetchToResults = debounce(
    (query) => fetchAirportSuggestions(query, setToResults, setToSuggestionsLoading),
    400
  );

  // Handle input change
  const handleFromChange = (e) => {
    const query = e.target.value;
    setFrom(query);
    if (!query.trim()) {
      setFromCode("");
      setFromResults([]);
      setShowFromDropdown(false);
      return;
    }
    setShowFromDropdown(true);
    debouncedFetchFromResults(query);
  };

  const handleToChange = (e) => {
    const query = e.target.value;
    setTo(query);
    if (!query.trim()) {
      setToCode("");
      setToResults([]);
      setShowToDropdown(false);
      return;
    }
    setShowToDropdown(true);
    debouncedFetchToResults(query);
  };

  // Close dropdown on blur (delay so click on item fires first)
  const closeFromDropdown = () => setTimeout(() => setShowFromDropdown(false), 150);
  const closeToDropdown = () => setTimeout(() => setShowToDropdown(false), 150);

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

    if(value === 'return'){
      payload.returnDate = returnDate.format("YYYY-MM-DD");
    }

    console.log("Sending search request with payload:", payload);
    setLoading(true); // Start loading
    dispatch(setPassengerDetails(payload));
    navigate("/flights", { state: { tripType: value} });
    setLoading(false)
  };



  return (
    <div className="search-box">
      <Grid container spacing={2}>
        {/* Trip Type Selector */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <RadioGroup row value={value} onChange={handleChange}>
              <FormControlLabel sx={{color:'black', fontFamily:'Poppins'}} value="single" control={<Radio />} label={t("oneway")} />
              <FormControlLabel sx={{color:'black', fontFamily:'Poppins'}} value="return" control={<Radio />} label={t("return")} />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* From & To Fields */}
        <Grid item lg={5} md={5} sm={12} xs={12} position="relative" sx={{ overflow: "visible" }}>
          <TextField
            fullWidth
            label={t("origin")}
            value={from}
            onChange={handleFromChange}
            onBlur={closeFromDropdown}
            onFocus={() => from.trim() && fromResults.length > 0 && setShowFromDropdown(true)}
            InputProps={{
              endAdornment: (from || fromSuggestionsLoading) && (
                <InputAdornment position="end">
                  {fromSuggestionsLoading ? (
                    <CircularProgress size={20} sx={{ color: "var(--accent-color)" }} />
                  ) : from ? (
                    <IconButton
                      onClick={() => { setFrom(""); setFromCode(""); setFromResults([]); setShowFromDropdown(false); }}
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                </InputAdornment>
              ),
              style: {
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                color: '#000',
              },
              sx: {
                '& .MuiInputLabel-root': {
                  color: 'var(--accent-color)',
                  '&.Mui-focused': {
                    color: 'var(--accent-color)',
                  }
                },
                '& .MuiOutlinedInput-input': {
                  color: '#000',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                }
              }
            }}
          />
          {showFromDropdown && (fromSuggestionsLoading || fromResults.length > 0) && (
            <List
              component="div"
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                width: "100%",
                marginTop: 1,
                background: "#fff",
                zIndex: 1100,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.18)",
                maxHeight: 240,
                overflowY: "auto",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {fromSuggestionsLoading && fromResults.length === 0 ? (
                <ListItem sx={{ justifyContent: "center", py: 2 }}>
                  <Typography variant="body2" color="textSecondary">{t("searching") || "Searching…"}</Typography>
                </ListItem>
              ) : (
                fromResults.map((airport, index) => (
                <ListItem
                  key={airport.code ? `${airport.code}-${index}` : index}
                  button
                  onClick={() => handleFromSelect(airport)}
                  sx={{
                    "&:hover": { background: "#f0f4f8" },
                    padding: "10px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
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
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {airport.city}, {airport.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
              )}
            </List>
          )}

        </Grid>

        <Grid item lg={2} md={2} sm={12} xs={12} display="flex" justifyContent="center" alignItems="center">
          <SwapHorizIcon sx={{ cursor: "pointer" }} 
          onClick={() => {
            setFrom(to);
            setTo(from);
            setFromCode(toCode);
            setToCode(fromCode);
          }}  />
        </Grid>

        <Grid item lg={5} md={5} sm={12} xs={12} position="relative" sx={{ overflow: "visible" }}>
          <TextField
            fullWidth
            label={t("destination")}
            value={to}
            onChange={handleToChange}
            onBlur={closeToDropdown}
            onFocus={() => to.trim() && toResults.length > 0 && setShowToDropdown(true)}
            InputProps={{
              endAdornment: (to || toSuggestionsLoading) && (
                <InputAdornment position="end">
                  {toSuggestionsLoading ? (
                    <CircularProgress size={20} sx={{ color: "var(--accent-color)" }} />
                  ) : to ? (
                    <IconButton
                      onClick={() => { setTo(""); setToCode(""); setToResults([]); setShowToDropdown(false); }}
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                </InputAdornment>
              ),
              style: {
                fontSize: '0.75rem',
                backgroundColor: '#fff',
                color: '#000',
              },
              sx: {
                '& .MuiInputLabel-root': {
                  color: 'var(--accent-color)',
                  '&.Mui-focused': {
                    color: 'var(--accent-color)',
                  }
                },
                '& .MuiOutlinedInput-input': {
                  color: '#000',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                }
              }
            }}
          />
          {showToDropdown && (toSuggestionsLoading || toResults.length > 0) && (
            <List
              component="div"
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                width: "100%",
                marginTop: 1,
                background: "#fff",
                zIndex: 1100,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.18)",
                maxHeight: 240,
                overflowY: "auto",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {toSuggestionsLoading && toResults.length === 0 ? (
                <ListItem sx={{ justifyContent: "center", py: 2 }}>
                  <Typography variant="body2" color="textSecondary">{t("searching") || "Searching…"}</Typography>
                </ListItem>
              ) : (
                toResults.map((airport, index) => (
                <ListItem
                  key={airport.code ? `${airport.code}-${index}` : index}
                  button
                  onClick={() => handleToSelect(airport)}
                  sx={{
                    "&:hover": { background: "#f0f4f8" },
                    padding: "10px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid container spacing={1} alignItems="center">
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
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        {airport.city}, {airport.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
              )}
            </List>
          )}
        </Grid>

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker 
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  backgroundColor: '#fff',
                  '& input': {
                    color: '#000',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--accent-color)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                }
              }} 
              label={t("depatureDate")} 
              value={departureDate} 
              onChange={setDepartureDate} 
              minDate={dayjs()} 
            />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <DatePicker 
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  backgroundColor: '#fff',
                  '& input': {
                    color: '#000',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--accent-color)',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent-color)',
                }
              }} 
              label={t("returnDate")} 
              value={returnDate} 
              disabled={value !== "return"} 
              onChange={setReturnDate} 
              minDate={dayjs()} 
            />
          </Grid>
        </LocalizationProvider>

        {/* Passengers & Class */}
        <Grid item lg={3} md={3} sm={6} xs={12}>
          <Button sx={{
            color: 'black',
            borderColor: 'gainsboro',
            padding: prevData?.adults ? '-1rem': '0.9rem'
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
          <FormControl fullWidth>
            <Select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Economy">{t("economy")}</MenuItem>
              <MenuItem value="Premium Economy">{t("premiumEco")}</MenuItem>
              <MenuItem value="Business">{t("business")}</MenuItem>
              <MenuItem value="First">{t("first")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Special Fare Options */}
        {/* <Grid item lg={2} md={2} sm={12} xs={12}>
          <Box sx={{ textAlign: "center", paddingTop: "5%" }}>
            <Typography fontWeight="bold">Select a special fare</Typography>
          </Box>
        </Grid> */}


        {/* Search Button */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <button className="submit-button" disabled={loading} onClick={handleSearch}>
          {
            loading ? (
              <Grid container>
                <Grid item xs={3}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                </Grid>
                <Grid item xs={9} pt={'0rem'} display={'flex'} justifyContent={'center'} alignContent={'flex-end'}>
                  Searching Flights
                </Grid>
              </Grid>
            ):(
          <Grid container>
            <Grid item xs={12}>
            {t("searchFlight")}
            </Grid>
          </Grid>
            )
          }
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBox;