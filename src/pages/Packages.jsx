import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import Image2 from "../assets/images/move2.jpg";
import Image1 from "../assets/images/move1.jpg";
import Image3 from "../assets/images/move3.jpg";
import Image4 from "../assets/images/move4.jpg";
import Image5 from "../assets/images/move5.jpg";
import EastSharpIcon from '@mui/icons-material/EastSharp';
import CardWrapper from "../commons/CardWrapper";
const Packages = () => {
  const packageList = [
    {
      title: "Europe",
      desc: "Explore Europe's timeless charm with our exclusive travel packages, blending rich history and vibrant culture for an unforgettable journey across the continent.",
      img: Image2,
    },
    {
      title: "Americas",
      desc: `Embark on an unforgettable journey through the Americas, from the iconic skyscrapers of New York City to the natural wonders of the Grand Canyon`,
      img: Image1,
    },
    {
      title: "SouthEast Asia",
      desc: ` Discover the enchanting allure of Southeast Asia, where ancient temples in Angkor Wat and tropical paradises in Phuket await your exploration.`,
      img: Image3,
    },
    {
      title: "Dubai & Egypt",
      desc: `Explore the enchanting blend of ancient history and modern luxury in the Middle East, from the bustling souks of Dubai to the timeless wonders of Petra. Discover vibrant cultures, stunning deserts, and breathtaking architecture on an unforgettable journey.`,
      img: Image4,
    },
    {
      title: "India",
      desc: `Immerse yourself in the vibrant tapestry of India, where rich history, diverse cultures, and stunning landscapes await, from the majestic Taj Mahal to the serene backwaters of Kerala. Discover a land of unforgettable experiences and timeless beauty.`,
      img: Image5,
    }
  ];
  return (
    <div className="packages">
      <div className="service-title-section">
        <p className="service-title" style={{fontSize:'1.3rem', lineHeight:'90%', textAlign:'center'}}>
          {" "}
          <span style={{ color: "grey", fontWeight: 300}}>
            Explore our
          </span>{" "}
          Holiday Packages{" "}
          <span style={{ color: "grey", fontWeight: 300 }}>today.</span>
        </p>
      </div>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        {packageList.map((item, index) => (
          <Grid item lg={3} md={4} sm={6} xs={12} >
            <CardWrapper
              image={item.img}
              cardTitle={item.title}
              cardDesc={item.desc}
            />
          </Grid>
        ))}
        <Grid item lg={3} md={4} sm={6} xs={12} >
          <Card sx={{ maxWidth: 345, height: 345 }}>
            <CardActionArea>
              <CardContent sx={{display:'flex',justifyContent:'center', alignItems:'center', paddingTop:'50%', paddingBottom:'50%', flexDirection:'column'}}>
                <Typography gutterBottom variant="h5" component="div">
                    Show More
                </Typography>
                <Box>
                <EastSharpIcon fontSize="large"/>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default Packages;
