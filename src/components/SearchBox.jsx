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
  Autocomplete,
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
} from "@mui/material";

const options = ["Regular", "Student", "Armed Forces", "Senior Citizen"];

const SearchBox = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      tripType: "single",
      origin: null,
      destination: null,
      departureDate: dayjs(),
      returnDate: dayjs(),
      passengers: 1,
      travelClass: "",
      specialFare: null,
    },
  });

  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const handleOriginQueryChange = useCallback(
    debounce((value) => setOriginQuery(value), 500),
    []
  );

  const handleDestinationQueryChange = useCallback(
    debounce((value) => setDestinationQuery(value), 500),
    []
  );

  const { data: originOptions = [], isFetching: isLoadingOrigin } = useGet(
    "origin",
    "/flight/auto-complete-search/",
    originQuery ? { query: originQuery } : null
  );

  const { data: destinationOptions = [], isFetching: isLoadingDestination } = useGet(
    "destination",
    "/flight/auto-complete-search/",
    destinationQuery ? { query: destinationQuery } : null
  );

  const tripType = watch("tripType");

  const { mutate: searchFlights } = usePost(
    tripType === "single" ? "/flight/search-one-way-flight" : "/flight/search-two-way-flight",
    (data) => {
      console.log("Search response:", data);
    }
  );

  const onSubmit = (data) => {
    const payload = {
      ...data,
      departureDate: data.departureDate?.format("YYYY-MM-DD"),
      returnDate: data.tripType === "return" ? data.returnDate?.format("YYYY-MM-DD") : null,
      language: "en-us",
      currency: "USD",
    };
    console.log("Payload:", payload);
    searchFlights(payload);
  };


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



  return (
    <div className="search-box">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <FormControl>
              <Controller
                name="tripType"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="single" control={<Radio />} label="One Way" />
                    <FormControlLabel value="return" control={<Radio />} label="Round Trip" />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>

            <Controller
              name="origin"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  options={normalizeOptions(originOptions?.data)}
                  onInputChange={(_, value) => handleOriginQueryChange(value)}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  loading={isLoadingOrigin}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="From"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingOrigin && <CircularProgress color="inherit" size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />

          </Grid>
          <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
            <SwapHorizIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                const currentOrigin = getValues("origin");
                const currentDestination = getValues("destination");
                setValue("origin", currentDestination);
                setValue("destination", currentOrigin);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  options={normalizeOptions(destinationOptions?.data)}
                  onInputChange={(_, value) => handleDestinationQueryChange(value)}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  loading={isLoadingDestination}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="To"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingDestination && <CircularProgress color="inherit" size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={6} sm={3}>
              <Controller
                name="departureDate"
                control={control}
                render={({ field }) => (
                  <DatePicker label="Departure Date" value={field.value} onChange={field.onChange} minDate={dayjs()} />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Controller
                name="returnDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Return Date"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={tripType !== "return"}
                    minDate={dayjs()}
                  />
                )}
              />
            </Grid>
          </LocalizationProvider>
          <Grid item xs={6} sm={3}>
            <Controller name="passengers" control={control} render={({ field }) => <TextField {...field} fullWidth label="Passengers" type="number" />} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Controller
              name="travelClass"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select {...field} label="Class">
                    <MenuItem value="economy">Economy</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="first">First</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid>

          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
            <Button type="submit" sx={{ background: "#3f8fd6ff", color: "white", minWidth: "11vw", "&:hover": { background: "#3f8fd6ff" } }}>
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchBox;