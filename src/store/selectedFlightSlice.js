import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const selectedFlightSlice = createSlice({
    name: 'selectedFlight',
    initialState,
    reducers: {
        setSelectedFlight: (state, action) => action.payload,
        clearSelectedFlight: () => null,
    }
})

export const {setSelectedFlight, clearSelectedFlight} = selectedFlightSlice.actions;
export default selectedFlightSlice.reducer;