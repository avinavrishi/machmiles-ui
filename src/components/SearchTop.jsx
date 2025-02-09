import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
function SearchTop({ data, payload }) {
  const [detailsFlag, setDetailsFlag] = useState(false)

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

  const handleFlag = () => setDetailsFlag(!detailsFlag)

  console.log("The Data to show:::", data, payload)
  return (
    <div className="search-res">
      <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box className="searchBox-result-container">
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 'bold' }}>Origin & Destination Airport</Typography>

                <Typography><span>{payload?.origin} <TrendingFlatIcon sx={{marginTop:'0.5rem'}}/> {payload.destination}</span></Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography sx={{ fontWeight: 'bold' }}>Depature Date</Typography>
                <Typography>{payload.departureDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 'bold' }}>Passengers</Typography>
                <Typography>
                  {payload?.adults} {payload?.adults > 1 ? "Adults" : "Adult"} {payload?.children > 0 && `, ${payload?.children} ${payload?.children > 1 ? "Childrens" : "Children"}`}{payload?.infants > 0 && `, ${payload?.infants} ${payload?.infants > 1 ? "Infants" : "Infant"}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 'bold' }}>Class</Typography>
                <Typography>Economy</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: "9vw", "&:hover": { background: "#3f8fd6ff" } }} >
                  Modify Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
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
                  {data && data.map((data, index) =>{
                    const { arrivalTime, departureTime, isNextDay } = extractTimeAndCheckNextDay(
                      data.arrival_date_time,
                      data.departure_date_time
                    );
                     return(
                    <Grid item xs={12} key={index}>
                      <Box sx={{ border: '1px solid gainsboro', borderRadius: '10px', padding: '1rem' }}>
                        <Grid container>
                          <Grid item xs={2}>
                            <Grid container>
                              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                <img src={data?.carrier_image} height={'80%'} />
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
                                <Button sx={{ background: "#3f8fd6ff", color: "white", minWidth: '6rem', "&:hover": { background: "#3f8fd6ff" } }} >
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
                          <Grid item xs={12} mt={2} display={'flex'} justifyContent={'flex-end'} sx={{ cursor: 'pointer' }} onClick={handleFlag}>
                            {detailsFlag ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            {detailsFlag ? "Hide Flight Details" : "View Flight Details"}

                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  )})}
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
