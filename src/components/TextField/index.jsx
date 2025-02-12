import { Box, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

const Input = ({name, control, label, type, placeholder, error, helperText}) => {
    return (
        <Box>
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={control}
                render={<TextField type={type} placeholder={placeholder}  />}
            />
            {error &&  <Typography variant='caption' color={error.Typography}>{helperText}</Typography>}
     
       </Box>
    )
}  

export default Input