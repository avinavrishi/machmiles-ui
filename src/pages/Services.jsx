import { Box, Grid, Typography } from "@mui/material";
const Services = () => {
  return (
    <div className="services">
      <div className="service-title-section">
        <p style={{fontSize:'1.5rem',fontWeight:500,lineHeight:'1rem', color:'grey', marginBottom:'-2vw'}}>why</p>
        <p className="service-title"> Our Services</p>
      </div>
      <div
        style={{
          display: "flex",
          padding: "2vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={1} md={1} sm={1} xs={12} sx={{display:'flex', justifyContent:'center',alignItems:'center', textAlign:'center'}}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                background: "#9b5de5ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{fontSize:'1.4rem', color:'white', fontWeight:600}}>1</Typography>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Box>
                <Typography style={{fontSize:'4vh', fontWeight:'bold', color:'black', textAlign:'center'}}>Live Support</Typography>
                <Typography style={{fontSize:'2vh', color:'grey'}}>Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum </Typography>
            </Box>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                background: "#9b5de5ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{fontSize:'1.4rem', color:'white', fontWeight:600}}>2</Typography>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Box>
                <Typography style={{fontSize:'4vh', fontWeight:'bold', color:'black', textAlign:'center'}}>Free Cancellation.</Typography>
                <Typography style={{fontSize:'2vh', color:'grey'}}>Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum </Typography>
            </Box>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                background: "#9b5de5ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{fontSize:'1.4rem', color:'white', fontWeight:600}}>3</Typography>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Box>
                <Typography style={{fontSize:'4vh', fontWeight:'bold', color:'black', textAlign:'center'}}>Offers on 100+ Airlines</Typography>
                <Typography style={{fontSize:'2vh', color:'grey'}}>Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum. Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Services;
