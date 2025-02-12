import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLanguage } from "../utils/apiService";

export const fetchLanguage = createAsyncThunk("language/fetchLanguage", async () => {
    try {
       const response = await getLanguage();
       return response?.data || [];

    }
    catch(error){
        console.error("error in fetching language", error)
        return [];
    }
})


const languageSlice = createSlice({
    name: "language",
    initialState: {
        languages:[],
        selectedLanguage: localStorage.getItem("selectedLanguage") || "en-us",   //Default Language
    },
    reducers: {
        setLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
            localStorage.setItem("selectedLanguage", action.payload)
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchLanguage.fulfilled, (state,action)=>{
            state.languages = action.payload;
        })
    }
});

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer;