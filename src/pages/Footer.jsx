import { Box, Grid, Typography } from "@mui/material";
import Logo from '../assets/icons/logo.svg'
import '../styles/responsive.css'
const Footer = () => {
  return (
    <div className="footer">
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <Grid container spacing={2} sx={{color:'white', padding:'2vw', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                <Grid item xs={12} sx={{fontWeight:600, textTransform:'uppercase'}}>
                    Help
                </Grid>
                {
                    ['privacy policy','Taxes & Faxes', 'Terms','Post Ticketing Fees','Contact us','faq','about company','travel blog'].map((item, index)=>(
                        <Grid key={index} item xs={12} sx={{textTransform:'capitalize'}}><a href="www.machmiles.com" target="blank" style={{color:'white', textDecoration:'none'}}>{item}</a></Grid>
                    ))
                }
            </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <Grid container spacing={2} sx={{color:'white', padding:'2vw', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                <Grid item xs={12} sx={{fontWeight:600, textTransform:'uppercase'}} mb={1}>
                    Hot Flight deals
                </Grid>
                {
                    ['Airlines Flash Sales','Cheap Airfares to South america', 'carribean','middle east','south pacific','Asia','central America'].map((item, index)=>(
                        <Grid key={index} item xs={12} sx={{textTransform:'capitalize'}}><a href="www.machmiles.com" target="blank" style={{color:'white', textDecoration:'none'}}>{item}</a></Grid>
                    ))
                }
            </Grid>
        </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
            <Grid container spacing={2} sx={{color:'white', padding:'2vw', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                <Grid item xs={12} sx={{fontWeight:600, textTransform:'uppercase'}}>
                    Contact Information
                </Grid>
                {
                    ['New York, NY 10012, US','info@example.com', '+ 01 234 567 88',' + 01 234 567 89'].map((item, index)=>(
                        <Grid key={index} item xs={12} sx={{textTransform:'capitalize'}}><a href="www.machmiles.com" target="blank" style={{color:'white', textDecoration:'none'}}>{item}</a></Grid>
                    ))
                }
            </Grid>
        </Grid>
        <Grid item xs={12} mt={'-2vw'}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <div className="navbar-logo" style={{marginRight:'1vw'}}>
              <img src={Logo} alt="MachMiles" width={'150%'} />
            </div>
            <Typography sx={{ fontSize:'2vw',marginTop:'-2vw', fontWeight:700,color:'#0138a5ff'}}>MachMiles</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mt={'-2vw'} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography className="footer-end">Copyright 2024 © MachMiles. All Rights Reserved.</Typography>
        </Grid>
        <Grid item xs={12} mt={1.5} sx={{display:'flex', alignItems:'center', padding:'1vw'}}>
            <Typography className="footer-end">* Fares are inclusive of all surcharges, our service fees & taxes. Tickets are non-refundable, non-transferable and non-assignable unless otherwise stated in the itinerary. Name changes are not permitted once a booking is confirmed. Displayed fares are subject to change and cannot be guaranteed until a booking confirmed and ticket is issued. Lowest fares may require an advance purchase of up to 21 days. Certain blackout dates may apply. Holidays and weekend travel may have a surcharge. Other restrictions may apply. Booking tickets over phone are subject to an additional $10 fee per passenger.</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default Footer;
