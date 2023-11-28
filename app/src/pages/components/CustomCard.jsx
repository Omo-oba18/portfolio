import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

export const CustomCard = ({ title }) => {
  const classes = useStyles();
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardMedia
        sx={{ height: 100 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    marginLeft: "2em",
    marginRight: "2em",
  },
}));
