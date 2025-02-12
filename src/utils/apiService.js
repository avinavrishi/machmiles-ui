import apiService from './axiosServices'

const API_ENDPOINTS = {
  GET_LANGUAGE:"/rest/v1/flight/get-language/",
  GET_CURRENCY:"/rest/v1/flight/get-currency/",
  FLIGHT_SEARCH_ONE_WAY: "/rest/v1/flight/search-one-way-flight",
  FLIGHT_SEARCH_RETURN: "/rest/v1/flight/search-one-way-flight",
  AIRPORT_SUGGESTIONS: "/rest/v1/flight/auto-complete-search/",
  GET_FLIGHT_DETAILS:"/rest/v1/flight/get-flight-details",
}

//GET language::
export const getLanguage = async()=>{
  try{
    const response = await apiService.get(`${API_ENDPOINTS.GET_LANGUAGE}`);
    return response;
  }
  catch(error){
    console.error("Error in getting Language", error);
    throw error;
  }
};

//GET language::
export const getCurrency = async()=>{
  try{
    const response = await apiService.get(`${API_ENDPOINTS.GET_CURRENCY}`);
    return response;
  }
  catch(error){
    console.error("Error in getting Currency", error);
    throw error;
  }
};


// Fetch airport suggestions
export const getAirportSuggestions = async (query) => {
  if (!query) return [];

  try {
    const response = await apiService.get(`${API_ENDPOINTS.AIRPORT_SUGGESTIONS}?query=${encodeURIComponent(query)}`, {
      headers: { Accept: "application/json" },
    });

    // console.log("Raw API Response:", response);

    let locations = response.data?.flatMap((item) =>
      item.airports.length > 0
        ? item.airports.map((airport) => ({
          name: `${airport.name} (${airport.code})`,
          city: item.name,
          country: item.country.name,
          code: airport.code,
        }))
        : [
          {
            name: item.name,
            city: item.name,
            country: item.country.name,
            code: item.code || null,
          },
        ]
    ) || [];

    return locations;
  } catch (error) {
    console.error("API Call Failed:", error);
    return [];
  }
};

//One Way Flight Search
export const searchFlights = async (payload) => {
  try {
    const response = await apiService.post(API_ENDPOINTS.FLIGHT_SEARCH_ONE_WAY, payload);
    // console.log("Search Results:", response);
    return response;
  } catch (error) {
    console.error("Search request failed:", error);
    throw error;
  }
};

//Get Flight Details:
export const getFlightDetails = async (payload) => {
  try {
    const response = await apiService.post(API_ENDPOINTS.GET_FLIGHT_DETAILS, payload);
    return response;
  } catch (error) {
    console.error("Get Flight Details request failed:", error);
    throw error;
  }
};