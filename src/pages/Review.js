import { Box, Divider, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { convertMinutesToHours, formatDateTime12hr } from "../commons/FormatDate";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreditCardForm from "../components/CreditCardForm";
import {Loader} from '../commons/Loader'
function Review() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const flightData = useSelector((state) => state.selectedFlight)
  const { adults, children, infants } = useSelector((state) => state.passengerDetails);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  useEffect(() => {
    setIsLoading(true)
    // const flightData = localStorage.getItem("selectedFlight");
    if (flightData) {
      setTimeout(()=>{
        setIsLoading(false)
      },[2000])
      // setSelectedFlight(JSON.parse(flightData));
      setSelectedFlight(flightData);
    } else {
      navigate('/flights'); // Redirect to /flights if no flight is selected
    }
    // eslint-disable-next-line
  }, []);

  // ${type === "adult" ? "Adult" : type === "child" ? "Child" : "Infant"}

  // Dynamic state to store traveller details input
  // const [travellers, setTravellers] = useState({
  //   adults: Array(adults).fill({ first_name: "", last_name: "", gender: "", dob: "", assistance: "" }),
  //   children: Array(children).fill({ first_name: "", last_name: "", gender: "", dob: "", assistance: "" }),
  //   infants: Array(infants).fill({ first_name: "", last_name: "", gender: "", dob: "", assistance: "" }),
  // });

  // Handle change in traveller details
  // const handleTravellerChange = (type, index, field, value) => {
  //   const updatedTravellers = { ...travellers };
  //   updatedTravellers[type][index][field] = value;
  //   setTravellers(updatedTravellers);
  // };

  if (!selectedFlight) {
    return null
  }

  const renderTravellerForm = (count, type) => {
    return [...Array(count)].map((_, index) => (
      <Grid container spacing={3} key={index} >
        {/* Heading for Adult, Child, or Infant */}
        <Grid item xs={12} mt={2}>
          <Typography sx={{ fontSize: '0.85rem' }} variant="h6">
            {`
            Passenger
             ${index + 1}`
             }
            </Typography>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            name={`${type}-${index}-first_name`}
            sx={{
              fontSize: '0.875rem', // Smaller font size for input text
              padding: '4px', // Optional, adjust the padding if needed
            }}
            size="small" // Makes the input smaller overall
            InputLabelProps={{
              style: {
                fontSize: '0.75rem', // Smaller font size for the label
              },
              shrink: true, // Keeps the label always shrunk, even when focused or filled
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            name={`${type}-${index}-last_name`}
            sx={{
              fontSize: '0.875rem', // Smaller font size for input text
              padding: '4px', // Optional, adjust the padding if needed
            }}
            size="small" // Makes the input smaller overall
            InputLabelProps={{
              style: {
                fontSize: '0.75rem', // Smaller font size for the label
              },
              shrink: true, // Keeps the label always shrunk, even when focused or filled
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '0.80rem', // Smaller font size
                padding: '4px', // Optional, adjust the padding if needed
              }}
              size="small" // This makes the input smaller overall
            >Gender</InputLabel>
            <Select
              sx={{
                fontSize: '0.875rem', // Smaller font size
                padding: '4px', // Optional, adjust the padding if needed
              }}
              size="small" // This makes the input smaller overall
              label="Gender"
              name={`${type}-${index}-gender`}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            label="Date of Birth"
            fullWidth
            variant="outlined"
            type="date"
            name={`${type}-${index}-dob`}
            sx={{
              fontSize: '0.875rem', // Smaller font size for input text
              padding: '4px', // Optional, adjust the padding if needed
            }}
            size="small" // Makes the input smaller overall
            InputLabelProps={{
              style: {
                fontSize: '0.75rem', // Smaller font size for the label
              },
              shrink: true, // Keeps the label always shrunk, even when focused or filled
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                fontSize: '0.80rem', // Smaller font size
                padding: '4px', // Optional, adjust the padding if needed
              }}
              size="small" // This makes the input smaller overall
            >Assistance Required</InputLabel>
            <Select
              label="Assistance Required"
              name={`${type}-${index}-assistance`}
              sx={{
                fontSize: '0.875rem', // Smaller font size
                padding: '4px', // Optional, adjust the padding if needed
              }}
              size="small" // This makes the input smaller overall
            >
              <MenuItem value="0">None Requested</MenuItem>
              <MenuItem value="1">Wheelchair(Passenger can walk up the stairs)</MenuItem>
              <MenuItem value="2">Wheelchair(Passenger not can walk up the stairs)</MenuItem>
              <MenuItem value="3">Blind Passenger</MenuItem>
              <MenuItem value="3">Deaf Passenger</MenuItem>
              <MenuItem value="3">Stretcher</MenuItem>
              <MenuItem value="3">Medical Case</MenuItem>
              <MenuItem value="3">Passenger is travelling with an assistance dog</MenuItem>
              <MenuItem value="3">Disabled passenger needing assistance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    ));
  };

  const handleCardDetailsChange = (updatedDetails) => {
    setCardDetails(updatedDetails);
    console.log(cardDetails); // You can do whatever you need with the updated data
  };

  return (
    <div style={{
      marginTop: "4vw",
      //  background: 'white' 
    }}>
      {
        isLoading ? (
          <Loader/>
        ):(
      <>
      <Grid container mb={3} className="review-heading">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '1.75rem' }}>Review Trip Details and Book</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '0.75rem' }}>You're on the final step. Only a few more minutes to finish!</Typography>
        </Grid>
      </Grid>
      {/* This is the itinerary review container */}
      <Grid mb={2} container sx={{ padding: '0.5rem' }}>
        <Grid item xs={12}>
          <Grid container className="review-box">
            <Grid item xs={11}>
              <Box>1. Your itinerary (Please review details carefully & make sure they are accurate)</Box>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background: 'white' }}>
            <Grid container spacing={1}>
              <Grid item lg={1} md={1} sm={6} xs={6}>
                Depart
              </Grid>
              <Grid item lg={11} md={1} sm={6} xs={6}>
                {selectedFlight.departure_arrival_airport.departureCityName} ⟶ {selectedFlight.departure_arrival_airport.arrivalCityName}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item lg={2} md={2} sm={4} xs={12}>
                <Grid container sx={{ justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}>
                  <Grid item xs={12} justifyContent={'center'}>
                    <img src={selectedFlight?.carrier_image} height={'40%'} alt="logo" />
                  </Grid>
                  <Grid item xs={12} mt={-4}>
                    {selectedFlight?.carrier_code} {selectedFlight?.flight_number}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    {formatDateTime12hr(selectedFlight.departure_date_time)}
                  </Grid>
                  <Grid item xs={12}>
                    {selectedFlight.departure_arrival_airport.departureAirportName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    {formatDateTime12hr(selectedFlight.arrival_date_time)}
                  </Grid>
                  <Grid item xs={12}>
                    {selectedFlight.departure_arrival_airport.arrivalAirportName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    {selectedFlight.cabin_class.cabinName}
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={1} marginTop={'-0.15rem'}><AccessTimeIcon sx={{ color: "green", fontSize: '1rem', paddingTop: '0.2rem' }} /></Grid>
                      <Grid item xs={11}>{convertMinutesToHours(selectedFlight.total_trip_duration)}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* This is the fare Breakup container */}
      <Grid mb={2} container sx={{ padding: '0.5rem' }}>
        <Grid item xs={12}>
          <Grid container className="review-box">
            <Grid item xs={11}>
              <Box>2. Fare Breakdown</Box>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background: 'white' }}>
            <Grid container spacing={2} padding={'2rem'}>
              <Grid item xs={6} sx={{ border: '1px solid gainsboro' }}>
                Base Fare
              </Grid>
              <Grid item xs={6} sx={{ border: '1px solid gainsboro', paddingRight: '0.5rem', textAlign: 'right' }}>
                $ {selectedFlight?.base_fare}
              </Grid>

              <Grid item xs={6} sx={{ border: '1px solid gainsboro' }}>
                Total Taxes
              </Grid>
              <Grid item xs={6} sx={{ border: '1px solid gainsboro', paddingRight: '0.5rem', textAlign: 'right' }}>
                $ {selectedFlight?.total_tax}
              </Grid>

              <Grid item xs={6} sx={{ border: '1px solid gainsboro' }}>
                Discount
              </Grid>
              <Grid item xs={6} sx={{ border: '1px solid gainsboro', paddingRight: '0.5rem', textAlign: 'right' }}>
                $ {selectedFlight?.total_discount}
              </Grid>

              <Grid item xs={6} sx={{ border: '1px solid gainsboro' }}>
                Total
              </Grid>
              <Grid item xs={6} sx={{ fontWeight: 600, border: '1px solid gainsboro', paddingRight: '0.5rem', textAlign: 'right' }}>
                $ {selectedFlight?.total_inclusive_per_passenger}
              </Grid>

            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* This is the Passenger info container */}
      <Grid mb={2} container sx={{ padding: '0.5rem' }}>
        <Grid item xs={12}>
          <Grid container className="review-box">
            <Grid item xs={11}>
              <Box>3. Traveller Details(Please make sure names match government-issued IDs)</Box>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background:'white' }}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                Depart
              </Grid>
              <Grid item xs={11}>
                {selectedFlight.departure_arrival_airport.departureCityName} ⟶ {selectedFlight.departure_arrival_airport.arrivalCityName}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={2}>
                <Grid container>
                  <Grid item xs={12} >
                    <img src={selectedFlight?.carrier_image} height={'40%'} alt="logo" />
                  </Grid>
                  <Grid item xs={12} mt={-4}>
                    {selectedFlight?.carrier_code} {selectedFlight?.flight_number}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                <Grid item xs={12}>
                   {formatDateTime12hr(selectedFlight.departure_date_time)}
                  </Grid>
                  <Grid item xs={12}>
                  {selectedFlight.departure_arrival_airport.departureAirportName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                <Grid item xs={12}>
                   {formatDateTime12hr(selectedFlight.arrival_date_time)}
                  </Grid>
                  <Grid item xs={12}>
                  {selectedFlight.departure_arrival_airport.arrivalAirportName}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <Grid container>
                <Grid item xs={12}>
                  {selectedFlight.cabin_class.cabinName} 
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={1} marginTop={'-0.15rem'}><AccessTimeIcon sx={{ color: "green", fontSize:'1rem', paddingTop:'0.2rem' }} /></Grid>
                      <Grid item xs={11}>{convertMinutesToHours(selectedFlight.total_trip_duration)}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background: 'white' }}>
            {/* Render Adults */}
            {adults > 0 && (
              <Box mb={2}>
                <Typography sx={{fontSize:'1.25rem'}} variant="h5">Adult:</Typography>
                {renderTravellerForm(adults, "adult")}
                <Divider sx={{ marginTop: '1rem' }} />
              </Box>
            )}

            {/* Render Children */}
            {children > 0 && (
              <Box mb={2}>
                <Typography variant="h5">Children:</Typography>
                {renderTravellerForm(children, "child")}
                <Divider sx={{ marginTop: '1rem' }} />
              </Box>
            )}

            {/* Render Infants */}
            {infants > 0 && (
              <Box mb={2}>
                <Typography variant="h5">Infants:</Typography>
                {renderTravellerForm(infants, "infant")}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      {/* This is the Contact details container */}
      <Grid mb={2} container sx={{ padding: '0.5rem' }}>
        <Grid item xs={12}>
          <Grid container className="review-box">
            <Grid item xs={11}>
              <Box>4. Contact Details</Box>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background: 'white' }}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  label="Email Address"
                  fullWidth
                  type="email"
                  variant="outlined"
                  name={`email_address`}
                  sx={{
                    fontSize: '0.875rem', // Smaller font size for input text
                    padding: '4px', // Optional, adjust the padding if needed
                  }}
                  size="small" // Makes the input smaller overall
                  InputLabelProps={{
                    style: {
                      fontSize: '0.75rem', // Smaller font size for the label
                    },
                    shrink: true, // Keeps the label always shrunk, even when focused or filled
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  label="Confirm Email Address"
                  fullWidth
                  type="email"
                  variant="outlined"
                  name={`comfirm_email_address`}
                  sx={{
                    fontSize: '0.875rem', // Smaller font size for input text
                    padding: '4px', // Optional, adjust the padding if needed
                  }}
                  size="small" // Makes the input smaller overall
                  InputLabelProps={{
                    style: {
                      fontSize: '0.75rem', // Smaller font size for the label
                    },
                    shrink: true, // Keeps the label always shrunk, even when focused or filled
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  // type="number"
                  variant="outlined"
                  name={`phone`}
                  sx={{
                    fontSize: '0.875rem', // Smaller font size for input text
                    padding: '4px', // Optional, adjust the padding if needed
                  }}
                  size="small" // Makes the input smaller overall
                  InputLabelProps={{
                    style: {
                      fontSize: '0.75rem', // Smaller font size for the label
                    },
                    shrink: true, // Keeps the label always shrunk, even when focused or filled
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{fontSize:'0.75rem'}}><span style={{color:'red'}}>Note:</span>*** Your ticket will be sent to this email address.</Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* This is the payment details container */}
      <Grid mb={2} container sx={{ padding: '0.5rem' }}>
        <Grid item xs={12}>
          <Grid container className="review-box">
            <Grid item xs={11}>
              <Box>5. Payment Details</Box>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: '1rem', background: 'white' }}>
            <Grid item xs={12}>
              <Box sx={{ padding: '1rem', background: 'white' }}>
                <CreditCardForm onCardDetailsChange={handleCardDetailsChange}/>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid mb={2} container sx={{ padding: '0.5rem' }} >
        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
          <button className="final-book">Complete Booking</button>
        </Grid>
      </Grid>
      </>
        )
      }
    </div>
  );
}

export default Review;
