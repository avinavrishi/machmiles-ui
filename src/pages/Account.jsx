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
  return (
    <div style={{
      marginTop: "5vw",
      position: "relative",
      overflow: "hidden",
      padding: "1rem",
      minHeight: "calc(100vh - 5vw)",
    }}>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={12} xs={12}>
          <Box
            sx={{
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
              padding: { xs: '1.5rem', sm: '2rem', md: '1.5rem' },
              height: { xs: 'auto', sm: 'auto', md: '70vh' },
              minHeight: { xs: '300px', sm: '350px' }
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box className='profile-box'>
                  JD
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography 
                  variant="h5" 
                  display={'flex'} 
                  justifyContent={'center'}
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                    fontWeight: 600
                  }}
                >
                  John Doe
                </Typography>
              </Grid>
              <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <button 
                  className="submit-button" 
                  onClick={handleLogOut}
                  style={{
                    width: { xs: '80%', sm: '60%', md: '70%' },
                    maxWidth: '200px'
                  }}
                >
                  Log Out
                </button>
              </Grid>
            </Grid> 
          </Box>
        </Grid>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <Box
            sx={{
              background: 'white',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
              padding: { xs: '1.5rem', sm: '2rem', md: '1.5rem' },
              height: { xs: 'auto', sm: 'auto', md: '70vh' },
              minHeight: { xs: '400px', sm: '450px' }
            }}
          >
            {/* Content for the right box */}
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}