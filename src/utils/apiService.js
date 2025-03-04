import apiService from './axiosServices';

const API_ENDPOINTS = {
  GET_LANGUAGE: "/rest/v1/flight/get-language/",
  GET_CURRENCY: "/rest/v1/flight/get-currency/",
  REGISTER_USER: "/rest/v1/auth/signup/",
  USER_LOGIN: "/rest/v1/auth/login/",
  FLIGHT_SEARCH_ONE_WAY: "/rest/v1/flight/search-one-way-flight",
  FLIGHT_SEARCH_RETURN: "/rest/v1/flight/search-two-way-flight",
  AIRPORT_SUGGESTIONS: "/rest/v1/flight/auto-complete-search/",
  GET_FLIGHT_DETAILS: "/rest/v1/flight/get-flight-details/",

  // Admin API links
  GET_ALL_USER: "/rest/v1/admin/get-all-users",
  DELETE_USER: "/rest/v1/admin/delete-user/",
  GET_ALL_BOOKINGS: "/rest/v1/admin/get-all-bookings/",
  DELETE_BOOKING: "/rest/v1/admin/delete-booking/",
  GET_ALL_PAYMENTS: "/rest/v1/admin/get-all-payments",
  DELETE_PAYMENT: "/rest/v1/admin/delete-payment/"
};

// GET Language
export const getLanguage = async () => {
  return apiService.get(API_ENDPOINTS.GET_LANGUAGE);
};

// GET Currency
export const getCurrency = async () => {
  return apiService.get(API_ENDPOINTS.GET_CURRENCY);
};

// Register User
export const registerUser = async (payload) => {
  return apiService.post(API_ENDPOINTS.REGISTER_USER, payload);
};

// Login
export const userLogin = async (payload) => {
  return apiService.post(API_ENDPOINTS.USER_LOGIN, payload);
};

// Fetch Airport Suggestions
export const getAirportSuggestions = async (query) => {
  if (!query) return [];
  try {
    const response = await apiService.get(
      API_ENDPOINTS.AIRPORT_SUGGESTIONS,
      { query: encodeURIComponent(query) },
      { Accept: "application/json" }
    );
    
    return response?.data?.flatMap((item) =>
      item.airports.length > 0
        ? item.airports.map((airport) => ({
            name: `${airport.name} (${airport.code})`,
            city: item.name,
            country: item.country.name,
            code: airport.code,
          }))
        : [{
            name: item.name,
            city: item.name,
            country: item.country.name,
            code: item.code || null,
          }]
    ) || [];
  } catch (error) {
    console.error("API Call Failed:", error);
    return [];
  }
};

// One-Way Flight Search
export const searchFlights = async (payload) => {
  return apiService.post(API_ENDPOINTS.FLIGHT_SEARCH_ONE_WAY, payload);
};

// Return Flight Search
export const searchReturnFlight = async (payload) => {
  return apiService.post(API_ENDPOINTS.FLIGHT_SEARCH_RETURN, payload);
};

// Get Flight Details
export const getFlightDetails = async (payload) => {
  return apiService.post(API_ENDPOINTS.GET_FLIGHT_DETAILS, payload);
};

// Admin API

// Get all users (Requires Auth)
export const getAllUsers = async () => {
  return apiService.get(API_ENDPOINTS.GET_ALL_USER, {}, {}, true);
};

// Delete User (Requires Auth)
export const deleteUser = async (userId) => {
  return apiService.delete(`${API_ENDPOINTS.DELETE_USER}${userId}`, {}, true);
};

// Get all Bookings (Requires Auth)
export const getAllBookings = async () => {
  return apiService.get(API_ENDPOINTS.GET_ALL_BOOKINGS, {}, {}, true);
};

// Delete Booking (Requires Auth)
export const deleteBooking = async (bookingId) => {
  return apiService.delete(`${API_ENDPOINTS.DELETE_BOOKING}${bookingId}`, {}, true);
};

// Get all Payments (Requires Auth)
export const getAllPayments = async () => {
  return apiService.get(API_ENDPOINTS.GET_ALL_PAYMENTS, {}, {}, true);
};

// Delete Payment (Requires Auth)
export const deletePayment = async (paymentId) => {
  return apiService.delete(`${API_ENDPOINTS.DELETE_PAYMENT}${paymentId}`, {}, true);
};
