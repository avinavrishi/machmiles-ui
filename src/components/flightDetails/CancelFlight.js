import { Box, Grid } from "@mui/material";

export const CancelFlight = () => {
    return (
        <>
            <Box sx={{ padding: "0.5rem", borderBottom: '1px solid gainsboro' }} mb={2} display={'flex'}>
                <span style={{ fontWeight: '600' }}>Cancellation Policy</span>
            </Box>
            <Grid container spacing={2} padding={'2rem'}>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                Cancellation before 24 hours
                </Grid>
                <Grid item xs={3} sx={{border:'1px solid gainsboro', fontWeight:600}}>
                    Free of Charge
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                Within 24 hours
                </Grid>
                <Grid item xs={3} sx={{border:'1px solid gainsboro', fontWeight:600}}>
                    50% Charge
                </Grid>
                <Grid item xs={6}/>
            </Grid>

        </>

    )
}