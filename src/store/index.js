import { configureStore } from "@reduxjs/toolkit";
import languageReducer from './LanguageSlice'
import userReducer from './userSlice'
import selectedFlightReducer from './selectedFlightSlice'
import passengerReducer from './passengerDetailsSlice'
const store = configureStore({
    reducer:{
        language:languageReducer,
        user:userReducer,
        selectedFlight:selectedFlightReducer,
        passengerDetails:passengerReducer,
    },
});

export default store