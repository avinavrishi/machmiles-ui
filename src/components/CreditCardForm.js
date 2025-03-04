import React, { useState } from "react";
import { TextField, Grid, InputAdornment } from "@mui/material";

const CreditCardForm = ({ onCardDetailsChange }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleCardNumberChange = (e) => {
    let cardNumber = e.target.value.replace(/\D/g, ""); // Remove any non-digit characters
    if (cardNumber.length > 16) cardNumber = cardNumber.substring(0, 16); // Limit to 16 digits

    // Group the number into batches of 4 digits
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits

    setFormData((prevState) => {
      const updatedData = { ...prevState, cardNumber };
      onCardDetailsChange(updatedData); // Passing data to the parent or any handler you use
      return updatedData;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Allow only numbers and a slash
    let formattedValue = value.replace(/[^0-9/]/g, "");
  
    // Automatically insert `/` after the first two digits
    if (formattedValue.length > 2 && !formattedValue.includes("/")) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
    }
  
    // Prevent typing more than 5 characters (MM/YY format)
    if (formattedValue.length > 5) {
      return;
    }
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  return (
    <Grid container spacing={3}>
      {/* Card Number */}
      <Grid item xs={12}>
        <TextField
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
          fullWidth
          variant="outlined"
          inputProps={{ maxLength: 19 }} // Allow spaces, so max length is 19 (16 digits + 3 spaces)
          required
          type="tel"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Optionally, display card image */}
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: '0.875rem', // Smaller font size for input text
            padding: '4px', // Optional, adjust the padding if needed
          }}
          size="small" // Makes the input smaller overall
          InputLabelProps={{
            style: {
              fontSize: '0.75rem', // Smaller font size for the label
            },
            shrink: true, // Keeps the label always shrunk, even when focused or filled
          }}
        />
      </Grid>

      {/* Expiry Date */}
      <Grid item xs={6}>
        <TextField
          label="Expiry Date (MM/YY)"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          placeholder="MM/YY"
          type="tel"
          inputProps={{ maxLength: 5 }}
          sx={{
            fontSize: '0.875rem', // Smaller font size for input text
            padding: '4px', // Optional, adjust the padding if needed
          }}
          size="small" // Makes the input smaller overall
          InputLabelProps={{
            style: {
              fontSize: '0.75rem', // Smaller font size for the label
            },
            shrink: true, // Keeps the label always shrunk, even when focused or filled
          }}
        />
      </Grid>

      {/* CVV */}
      <Grid item xs={6}>
        <TextField
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          type="password"
          autoComplete="new-password"
          inputProps={{ maxLength: 3 }}
          sx={{
            fontSize: '0.875rem', // Smaller font size for input text
            padding: '4px', // Optional, adjust the padding if needed
          }}
          size="small" // Makes the input smaller overall
          InputLabelProps={{
            style: {
              fontSize: '0.75rem', // Smaller font size for the label
            },
            shrink: true, // Keeps the label always shrunk, even when focused or filled
          }}
        />
      </Grid>

      {/* Cardholder Name */}
      <Grid item xs={12}>
        <TextField
          label="Cardholder Name"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
          sx={{
            fontSize: '0.875rem', // Smaller font size for input text
            padding: '4px', // Optional, adjust the padding if needed
          }}
          size="small" // Makes the input smaller overall
          InputLabelProps={{
            style: {
              fontSize: '0.75rem', // Smaller font size for the label
            },
            shrink: true, // Keeps the label always shrunk, even when focused or filled
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CreditCardForm;
