import { Box, Grid, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/userSlice"

export const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () =>{
    dispatch(logout());
    navigate("/"); 
  }
  return <div style={{
    marginTop: "5vw",
    height: "90vh",
    position: "relative", // Ensure relative positioning for absolute children
    overflow: "hidden",
  }}>
    <Grid container spacing={2} padding={2}>
      <Grid item xs={3}>
        <Box
          sx={{
            background:'white',
            height:'70vh',
            borderRadius:'10px',
            display:'flex',
            justifyContent:'center'
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box className='profile-box'>
                JD
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" display={'flex'} justifyContent={'center'}>John Doe</Typography>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <button className="submit-button" onClick={handleLogOut}>Log Out</button>
            </Grid>
          </Grid> 
        </Box>
        
      </Grid>
      <Grid item xs={9}>
      <Box
          sx={{
            background:'white',
            height:'70vh',
            borderRadius:'10px'
          }}
        >
          
        </Box>
      </Grid>
    </Grid>
  </div>
}