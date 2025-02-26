import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: "JFK",
    destination: "CDG",
    departureDate: "2025-03-18T00:40:00Z",
    sort: "price",
    page: 1,
    limit: 20,
    adults: 0,
    children: 0,
    infants: 0,
    cabinType: "Economy",
    language: "en-us",
    currency: "USD",
};;

const passengerDetailsSlice = createSlice({
    name: "passengerSlice",
    initialState,
    reducers: {
        setPassengerDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearPassengerDetails: () => initialState,
    }
})

export const { setPassengerDetails, clearPassengerDetails } = passengerDetailsSlice.actions;
export default passengerDetailsSlice.reducer;