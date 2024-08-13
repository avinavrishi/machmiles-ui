import { Button, Grid, TextField, Typography } from "@mui/material";

const Blogs = () => {
  return (
    <div className="subscribe">
      <Grid container spacing={2} sx={{ display: "flex" }}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2} sx={{ color: "white" }}>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, textAlign:'center' }}>
                Stay up-to-Date
              </Typography>
            </Grid>
            <Grid item xs={12} mt={"-1vw"} sx={{textAlign:'center'}}>
              Subscribe and receive latest travel news!!
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <TextField
              fullWidth
              id="fullWidth"
              sx={{ background: "white" }}
              variant="filled"
            />
            <Button
              sx={{ background: "#3f8fd6ff", color: "white", width: "10rem" }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Blogs;
