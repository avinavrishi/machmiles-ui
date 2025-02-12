import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FlightDetails } from "./flightDetails/FlightDetails";
import { FareSummary } from "./flightDetails/FareSummary";
import { CancelFlight } from "./flightDetails/CancelFlight";
import { DateChange } from "./flightDetails/DateChange";
// import { getFlightDetails } from "../utils/apiService";
function SearchTop({ data, payload, onBookNow }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState("flightDetails");

  const tabs = [
    { id: "flightDetails", label: "Flight Details" },
    { id: "fareSummary", label: "Fare Summary" },
    { id: "cancellation", label: "Cancellation" },
    { id: "dateChange", label: "Date Change" },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "flightDetails":
        return (<FlightDetails data={tempResponse} />);
      case "fareSummary":
        return (<FareSummary data={tempResponse} />);
      case "cancellation":
        return (<CancelFlight />);
      case "dateChange":
        return (<DateChange />);
      default:
        return null;
    }
  };

  //Function for Converting durations
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const extractTimeAndCheckNextDay = (arrivalDateTime, departureDateTime) => {
    const arrival = new Date(arrivalDateTime);
    const departure = new Date(departureDateTime);

    // Extract HH:MM in 24-hour format
    const formatTime = (date) => date.toTimeString().slice(0, 5);

    // Check if arrival is on the next day
    const isNextDay = arrival.getDate() > departure.getDate();

    return {
      arrivalTime: formatTime(arrival),
      departureTime: formatTime(departure),
      isNextDay
    };
  };

  const handleFlag = async (index) => {
    const isExpanding = expandedIndex !== index;
    setExpandedIndex(isExpanding ? index : null);

    if (isExpanding) {
      let payload = {
        itenary_id: data[index]?.id,
        token: data[index]?.token,
        language: "en-us",
        currency: "USD"
      }
      console.log("The payload to be sent:::", payload)



      // try{
      //   const response = await getFlightDetails(payload);
      //   console.log("Response for the Flight Details:", response)
      // }
      // catch(error){
      //   console.error(error);
      // }
    }

  };

  const tempResponse = {
    "itinerary_id": "A:BOM_20250216_A:DEL_1-0-0_ECO_2__346180584",
    "token": "AAAA.AAAADK4CAq7A/SzUuFDKH9yxlLDAbUVquwW6AlHjRtYDdgSC0XYMh+ecbusxSAVCAE9Vx5Prpk67SVKHkc0cgWeV6aZmm+hlO8u6sg9UJt02QNUsf0MbmYNW5mbUQbMjabZJLlA7GBTWZVvDh76NKeimMm05rrAKfROyOKsgeaJ5wdA/poJkgn7FIv8tSMCB/zfWFVOX3s6J7ouxpbcVqsJyeyuGIszstHE+zeJjwzrUIGA4M39pnzHVB/ByEigx7Zf1DpHDh0KsVjsAsS1oBngvsdK4JzOA3Vyo5uzz4IFOmoAC9y7Zk+yRy67CrwtShRo9jeMnBls2rp6h7KwwNRG54gCaYEJ3RoFROr4Ebd3JcpljysDIP2o2WsbWjsXRrrn35Qs91dRizsgzShmXJYqHMB3LY2JSU+Ul3D9oQ8B5ZPq7XH3g6u1OD34bEdZWWdKkafkAbifx+vJJHIQE1poqF7gBX9vUiF6WqTrrBeutfp5dtyASDuI9euBKjCzVxQ==",
    "lap_infant_allowed": false,
    "password_required": false,
    "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/QP_v1.png",
    "carrier_name": "Air India",
    "flight_number": "2986",
    "departure_time": "2025-02-16T22:50:00",
    "origin_data": {
      "code": "BOM",
      "name": "Chhatrapati Shivaji Maharaj International Airport",
      "cityInfo": {
        "id": 16850,
        "name": "Mumbai"
      },
      "country": {
        "countryIso2": null,
        "coordinates": null,
        "countryCallingCode": null,
        "id": 35,
        "name": "India",
        "code": null
      }
    },
    "arrival_time": "2025-02-17T01:00:00",
    "destination": {
      "code": "DEL",
      "name": "Indira Gandhi International Airport",
      "cityInfo": {
        "id": 14552,
        "name": "New Delhi and NCR"
      },
      "country": {
        "countryIso2": null,
        "coordinates": null,
        "countryCallingCode": null,
        "id": 35,
        "name": "India",
        "code": null
      }
    },
    "trip_duration": 130,
    "cabin_class": 4,
    "cabin_name": "Economy Class",
    "baggage_fee": 0.0,
    "aircraft_data": {
      "code": "32N",
      "name": "Airbus A320",
      "features": null
    },
    "base_fare": 63.45,
    "total_tax": 10.42,
    "total_fare": 73.71,
    "total_fare_per_passenger": 73.87,
    "total_tax_per_passenger": 10.42,
    "total_discount": 0.16,
    "total_inclusive_per_passenger": 73.71
  }

  // useEffect(() => {
  //   console.log("The Data to show:::", data, payload)
  // }, [])

  return (
    <div className="search-res">
      <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box className="searchBox-result-container">
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins',fontSize: '0.85rem' }}>Origin & Destination Airport</Typography>
                <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins',fontSize: '0.85rem' }} paddingLeft={'2rem'}><span>{payload?.origin} ⟶ {payload.destination}</span></Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins',fontSize: '0.85rem' }}>Depature Date</Typography>
                <Typography sx={{ fontFamily: 'Poppins',fontSize: '0.85rem' }}>{payload.departureDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins',fontSize: '0.85rem' }}>Passengers</Typography>
                <Typography sx={{ fontFamily: 'Poppins',fontSize: '0.85rem' }}>
                  {payload?.adults} {payload?.adults > 1 ? "Adults" : "Adult"} {payload?.children > 0 && `, ${payload?.children} ${payload?.children > 1 ? "Childrens" : "Children"}`}{payload?.infants > 0 && `, ${payload?.infants} ${payload?.infants > 1 ? "Infants" : "Infant"}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins',fontSize: '0.85rem' }}>Class</Typography>
                <Typography sx={{ fontFamily: 'Poppins',fontSize: '0.85rem' }}>Economy</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: "9vw", "&:hover": { background: "#3f8fd6ff" }, fontFamily: 'Poppins',fontSize: '0.85rem' }} >
                  Modify Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        {/* <Grid item xs={2}>
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
        </Grid> */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
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
            </Grid> */}
            <Grid item xs={12}>
              <div
                style={{
                  border: "1px solid white",
                  // borderRadius: "14px",
                  background: "#ffff",
                  height: '37.5rem',
                  overflowY: 'scroll'
                }}
              >
                <Grid container spacing={2} padding={'1rem'}>
                  {data && data.map((data, index) => {
                    const { arrivalTime, departureTime } = extractTimeAndCheckNextDay(
                      data.arrival_date_time,
                      data.departure_date_time
                    );
                    return (
                      <Grid item xs={12} key={index}>
                        <Box sx={{ border: '1px solid gainsboro', borderRadius: '10px', padding: '1rem' }}>
                          <Grid container>
                            <Grid item xs={2}>
                              <Grid container>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                  <img src={data?.carrier_image} height={'80%'} alt="logo" />
                                </Grid>
                                <Grid item xs={12} mt={1} display={'flex'} justifyContent={'center'}>
                                  <Typography>{data?.carrier_code} {data?.flight_number}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={1} display={'flex'} alignItems={'center'}>
                              <Typography sx={{ fontWeight: 600 }} >{data?.carrier_name}</Typography>
                            </Grid>
                            <Grid item xs={2.5} >
                              <Grid container>
                                <Grid item xs={12} mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>{departureTime}</Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}><h3>{data?.departure_arrival_airport?.departureCityName}</h3></Grid>
                              </Grid>

                            </Grid>
                            <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                              <Grid container>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>{convertMinutesToHours(data?.total_trip_duration)}</Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}><HorizontalRuleIcon sx={{ color: 'blue', transform: 'scaleX(5)' }} /></Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>Non-Stop</Grid>
                              </Grid>

                            </Grid>
                            <Grid item xs={2.5} >
                              <Grid container spacing={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Grid item xs={12} mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>{arrivalTime}</Grid></Grid>
                              <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}><h3>{data?.departure_arrival_airport?.arrivalCityName}</h3></Grid>

                            </Grid>
                            <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                              <h2>${data?.price_inclusive}</h2>
                            </Grid>
                            <Grid item xs={2}>
                              <Grid container spacing={2} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                  <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: '6rem', "&:hover": { background: "#3f8fd6ff" } }} onClick={() => onBookNow(data)} >
                                    Book Now
                                  </Button>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                  <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: '6rem', "&:hover": { background: "#3f8fd6ff" } }} >
                                    Call Now
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} sx={{ cursor: 'pointer' }}
                              onClick={() => handleFlag(index)}
                            >
                              {expandedIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              {expandedIndex === index ? "Hide Flight Details" : "View Flight Details"}
                            </Grid>

                            {/* Conditionally render flight details */}
                            {expandedIndex === index && (
                              // <Grid item xs={12} mt={2}>
                              //   <Box sx={{ border: "1px solid gainsboro", borderRadius: "10px", padding: "1rem", background: "#f9f9f9" }}>

                              //     {/* Airline & Flight Info */}
                              //     <Grid container spacing={2} alignItems="center">
                              //       <Grid item xs={12} display="flex" alignItems="center">
                              //         <img src={tempResponse.carrier_image} height="40px" alt="Airline Logo" />
                              //         <Typography ml={1} fontWeight="bold">
                              //           {tempResponse.carrier_name} - Flight {tempResponse.flight_number}
                              //         </Typography>
                              //       </Grid>

                              //       {/* Departure & Arrival Details */}
                              //       <Grid item xs={6}>
                              //         <Typography fontWeight="bold">Departure</Typography>
                              //         <Typography>{tempResponse.origin_data.name} ({tempResponse.origin_data.code})</Typography>
                              //         <Typography>{new Date(tempResponse.departure_time).toLocaleString()}</Typography>
                              //       </Grid>

                              //       <Grid item xs={6}>
                              //         <Typography fontWeight="bold">Arrival</Typography>
                              //         <Typography>{tempResponse.destination.name} ({tempResponse.destination.code})</Typography>
                              //         <Typography>{new Date(tempResponse.arrival_time).toLocaleString()}</Typography>
                              //       </Grid>

                              //       {/* Flight Duration & Aircraft Info */}
                              //       <Grid item xs={12}>
                              //         <Typography><strong>Duration:</strong> {convertMinutesToHours(tempResponse.trip_duration)}</Typography>
                              //         <Typography><strong>Aircraft:</strong> {tempResponse.aircraft_data.name} ({tempResponse.aircraft_data.code})</Typography>
                              //       </Grid>

                              //       {/* Pricing Details */}
                              //       <Grid item xs={12} mt={1}>
                              //         <Typography fontWeight="bold">Pricing Breakdown</Typography>
                              //         <Typography>Base Fare: ${tempResponse.base_fare.toFixed(2)}</Typography>
                              //         <Typography>Taxes: ${tempResponse.total_tax.toFixed(2)}</Typography>
                              //         <Typography fontWeight="bold">Total Fare: ${tempResponse.total_fare.toFixed(2)}</Typography>
                              //       </Grid>

                              //       {/* Baggage & Class */}
                              //       <Grid item xs={12} mt={1}>
                              //         <Typography><strong>Class:</strong> {tempResponse.cabin_name}</Typography>
                              //         <Typography><strong>Baggage Fee:</strong> {tempResponse.baggage_fee ? `$${tempResponse.baggage_fee.toFixed(2)}` : "Included"}</Typography>
                              //       </Grid>

                              //     </Grid>
                              //   </Box>
                              // </Grid>

                              <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="center">
                                  <Grid item xs={12}>
                                    <Divider sx={{ marginBottom: '1rem' }} />
                                    {/* <Box className="searchBox-result-container"> */}
                                    <Grid container>
                                      {tabs.map((tab) => (
                                        <Grid item key={tab.id}>
                                          <Box
                                            variant={selectedTab === tab.id ? "contained" : "outlined"}
                                            onClick={() => setSelectedTab(tab.id)}
                                            sx={{ textTransform: "none", border: '1px solid gainsboro', padding: '0.5rem', background: selectedTab === tab.id ? '#3f8fd6' : 'none', color: selectedTab === tab.id ? 'white' : 'black', cursor: 'pointer' }}
                                          >
                                            {tab.label}
                                          </Box>
                                        </Grid>
                                      ))}
                                    </Grid>
                                    {/* </Box> */}
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box
                                      sx={{
                                        border: "1px solid gainsboro",
                                        // borderRadius: "10px",
                                        // padding: "1rem",
                                        // background: "#f9f9f9",
                                      }}
                                    >
                                      {renderTabContent()}
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}

                          </Grid>
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchTop;