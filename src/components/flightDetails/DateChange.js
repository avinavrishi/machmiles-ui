import { Box, Grid } from "@mui/material";

export const DateChange = () => {
    return (
        <>
            <Box sx={{ padding: "0.5rem", borderBottom: '1px solid gainsboro' }} mb={2} display={'flex'}>
                <span style={{ fontWeight: '600' }}>Date Change Policy</span>
            </Box>
            <Grid container spacing={2} padding={'3rem'}>
                <Grid item xs={6} sx={{border:'1px solid gainsboro'}}>
               0Hrs to 3Hrs
                </Grid>
                <Grid item xs={6} sx={{border:'1px solid gainsboro', fontWeight:600}}>
                    Non-Changeable
                </Grid>
                <Grid item xs={6} sx={{border:'1px solid gainsboro'}}>
                3Hrs to 365Days
                </Grid>
                <Grid item xs={6} sx={{border:'1px solid gainsboro', fontWeight:600}}>
                    $25 + Fare Difference
                </Grid>
            </Grid>

        </>

    )
}