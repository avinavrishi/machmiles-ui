import React from 'react'
import { Button as StyledButton } from '@mui/material'

const Button = ({ variant, label, onClick}) => {
    return (
        <StyledButton sx={{background: "#3f8fd6ff", color: "white"}} onClick={onClick} variant={variant}> {label}</StyledButton> 
    )
}

export default Button