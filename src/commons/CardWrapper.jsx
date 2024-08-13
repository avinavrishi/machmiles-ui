import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardWrapper = ({ image, cardTitle, cardDesc }) => {
  return (
    <Card sx={{ maxWidth: 345, height: 345 }}>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" height={'5.5rem'} overflow={'hidden'} sx={{overflowY:'scroll'}}>
          {cardDesc}
        </Typography>
      </CardContent>
      {
        image &&
      <CardActions>
        <Button size="small">Book now to Explore</Button>
      </CardActions>
      }
    </Card>
  );
};
export default CardWrapper;
