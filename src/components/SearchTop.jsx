import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FlightDetails } from "./flightDetails/FlightDetails";
import { FareSummary } from "./flightDetails/FareSummary";
import { CancelFlight } from "./flightDetails/CancelFlight";
import { DateChange } from "./flightDetails/DateChange";
import { getFlightDetails } from "../utils/apiService";
import { Loader } from "../commons/Loader";
import { useSelector } from "react-redux";
import { formatShortDate } from "../commons/FormatDate";
import SearchBox from "./SearchBox";
function SearchTop({ data, onBookNow }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState("flightDetails");
  // const [detailPayload, setDetailsPayload] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const passengerDetails = useSelector((state) => state.passengerDetails)
  const [modifyTab, setModifyTab] = useState(false)
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



      try {
        const response = await getFlightDetails(payload);
        console.log("Response for the Flight Details:", response)
      }
      catch (error) {
        console.error(error);
      }
    }

  };

  const tempResponse = {
    "itinerary_id": "A:BOM_20250216_A:DEL_1-0-0_ECO_2__346180584",
    "token": "AAAA.AAAADK4CAq7A/SzUuFDKH9yxlLDAbUVquwW6AlHjRtYDdgSC0XYMh+ecbusxSAVCAE9Vx5Prpk67SVKHkc0cgWeV6aZmm+hlO8u6sg9UJt02QNUsf0MbmYNW5mbUQbMjabZJLlA7GBTWZVvDh76NKeimMm05rrAKfROyOKsgeaJ5wdA/poJkgn7FIv8tSMCB/zfWFVOX3s6J7ouxpbcVqsJyeyuGIszstHE+zeJjwzrUIGA4M39pnzHVB/ByEigx7Zf1DpHDh0KsVjsAsS1oBngvsdK4JzOA3Vyo5uzz4IFOmoAC9y7Zk+yRy67CrwtShRo9jeMnBls2rp6h7KwwNRG54gCaYEJ3RoFROr4Ebd3JcpljysDIP2o2WsbWjsXRrrn35Qs91dRizsgzShmXJYqHMB3LY2JSU+Ul3D9oQ8B5ZPq7XH3g6u1OD34bEdZWWdKkafkAbifx+vJJHIQE1poqF7gBX9vUiF6WqTrrBeutfp5dtyASDuI9euBKjCzVxQ==",
    "lap_infant_allowed": false,
    "password_required": false,
    "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
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

  const handleModify = () => {
    setModifyTab(!modifyTab)
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, [3000])
  }, [])

  return (

    <div className="search-res">
      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
              <Grid item xs={12}>
                <Box className="searchBox-result-container">
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'} justifyContent={'center'}>
                      <Grid container>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '0.85rem' }}>Origin & Destination Airport</Typography>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                          <Typography sx={{ fontWeight: 600, fontFamily: 'Poppins', fontSize: '0.85rem' }} ><span>{passengerDetails?.origin} ⟶ {passengerDetails.destination}</span></Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2.5} md={3} sm={6} xs={12}>
                      <Grid container>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '0.85rem' }}>Departure Date</Typography></Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>{formatShortDate(passengerDetails.departureDate)}</Typography></Grid>
                      </Grid>
                    </Grid>
                    {
                      passengerDetails.returnDate.length > 0 && 
                    <Grid item lg={2.5} md={3} sm={6} xs={12}>
                      <Grid container>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '0.85rem' }}>Return Date</Typography></Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>{formatShortDate(passengerDetails.returnDate)}</Typography></Grid>
                      </Grid>
                    </Grid>
                    }
                    <Grid item lg={2} md={3} sm={6} xs={12} >
                      <Grid container>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '0.85rem' }}>Passengers</Typography>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                          <Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>
                          {passengerDetails?.adults > 0 && ` ${passengerDetails?.adults} ${passengerDetails?.adults > 1 ? "Adults" : "Adult"}`} {passengerDetails?.children > 0 && `, ${passengerDetails?.children} ${passengerDetails?.children > 1 ? "Childrens" : "Children"}`}{passengerDetails?.infants > 0 && `, ${passengerDetails?.infants} ${passengerDetails?.infants > 1 ? "Infants" : "Infant"}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} md={2} sm={6} xs={12}>
                      <Grid container>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '0.85rem' }}>Class</Typography></Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography sx={{ fontFamily: 'Poppins', fontSize: '0.85rem' }}>{passengerDetails.cabinType}</Typography></Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={passengerDetails.returnDate.length > 0 ? 12 : 2.5} md={12} sm={12} xs={12} display={'flex'} justifyContent={'center'} mt={1}>
                      <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: "9vw", "&:hover": { background: "#3f8fd6ff" }, fontFamily: 'Poppins', fontSize: '0.85rem' }} onClick={handleModify} >
                        {modifyTab ? "Close" : "Modify Search"}
                      </Button>
                    </Grid>
                    {
                      modifyTab &&
                      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                        <SearchBox prevData={passengerDetails} />
                      </Grid>
                    }
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
                      className="search-main"
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
                                        <Button sx={{ background: "#0e367e", color: "white", minWidth: '6rem', "&:hover": { background: "green" } }} onClick={() => onBookNow(data)} >
                                          Book Now
                                        </Button>
                                      </Grid>
                                      <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                                        <Button sx={{ background: "#0e367e", color: "white", minWidth: '6rem', "&:hover": { background: "#3f8fd6ff" } }} >
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
          </>
        )
      }
    </div>
  );
}

export default SearchTop;