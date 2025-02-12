import { Box, Grid } from "@mui/material";

export const FareSummary = ({ data }) => {
    return (
        <>
            <Box sx={{ padding: "0.5rem", borderBottom: '1px solid gainsboro' }} mb={2} display={'flex'}>
                <span style={{ fontWeight: '600' }}>Fare Breakup</span>
            </Box>
            <Grid container spacing={2} padding={'2rem'}>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                    Base Fare
                </Grid>
                <Grid item xs={3} sx={{border:'1px solid gainsboro', paddingRight:'0.5rem',textAlign:'right'}}>
                    $ {data?.base_fare}
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                    Total Taxes
                </Grid>
                <Grid item xs={3} sx={{border:'1px solid gainsboro', paddingRight:'0.5rem',textAlign:'right'}}>
                    $ {data?.total_tax}
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                   Discount
                </Grid>
                <Grid item xs={3} sx={{border:'1px solid gainsboro', paddingRight:'0.5rem',textAlign:'right'}}>
                    $ {data?.total_discount}
                </Grid>
                <Grid item xs={6}/>
                <Grid item xs={3} sx={{border:'1px solid gainsboro'}}>
                   Total
                </Grid>
                <Grid item xs={3} sx={{fontWeight:600,border:'1px solid gainsboro', paddingRight:'0.5rem',textAlign:'right'}}>
                    $ {data?.total_inclusive_per_passenger}
                </Grid>
                <Grid item xs={6}/>
            </Grid>

        </>

    )
}