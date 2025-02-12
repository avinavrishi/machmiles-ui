import { configureStore } from "@reduxjs/toolkit";
import languageReducer from './LanguageSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer:{
        language:languageReducer,
        user:userReducer
    },
});

export default store