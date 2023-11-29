import React from "react";
import { Stack, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import coffeeLaptop from "../../../assets/coffee-laptop.png";
import sampleDev from "../../../assets/sample_dev.jpg";
import networkSystem from "../../../assets/data-information-network-system-drawing-concept.jpg";
import designUX from "../../../assets/representations-user-experience-interface-design.jpg";
import analysisImg from "../../../assets/technical_analysis.jpg";
import { motion } from "framer-motion";

export const PostHeading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.postHeading}>
      <Stack className={classes.galery} spacing={2}>
        <motion.div className={classes.topLeft}>
          <img
            src={coffeeLaptop}
            className={classes.image}
            alt="Coffee laptop"
          />
        </motion.div>
        <motion.div className={classes.topRight}>
          <img
            src={analysisImg}
            className={classes.image}
            alt="database analysis"
          />
        </motion.div>
        <motion.div className={classes.middle}>
          <img
            src={networkSystem}
            className={classes.image}
            alt="network analysis"
          />
        </motion.div>
        <motion.div className={classes.bottomRight}>
          <img
            src={sampleDev}
            className={classes.image}
            alt="developer picture"
          />
        </motion.div>
        <motion.div className={classes.centerRight}>
          <img src={designUX} className={classes.image} alt="ux design" />
        </motion.div>
      </Stack>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  postHeading: {
    backgroundColor: theme.palette.primary.main,
    overflow: "hidden", // Adjust the individual photo height as needed
  },
  galery: {
    display: "flex",
    flexWrap: "wrap",
    height: "80vh",
    position: "relative", // Adjust the container height as needed
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "2em",
      paddingBottom: "2em",
      paddingRight: "auto",
      paddingLeft: "auto",
      flexWrap: "nowrap",
      height: "unset",
    },
  },
  topLeft: {
    [theme.breakpoints.up("md")]: {
      bottom: 0,
      left: 0,
      transform: "translate(-10%, 0%)",
      position: "absolute",
      width: "300px", // Adjust the individual photo width as needed
      height: "250px",
    },
    width: "90%",
    height: "200px",
  },
  topRight: {
    [theme.breakpoints.up("md")]: {
      borderTopLeftRadius: "40%",
      borderTopRightRadius: "40%",
      overflow: "hidden",
      top: "0%",
      right: "50%",
      transform: "translate(-10%, 75%)",
      position: "absolute",
      width: "250px", // Adjust the individual photo width as needed
      height: "250px",
    },
    width: "90%",
    height: "200px",
  },
  middle: {
    [theme.breakpoints.up("md")]: {
      transform: "translate(5%, 0%)",
      position: "absolute",
      top: "0%",
      right: "50%",
      overflow: "hidden",
      width: "360px",
      maxHeight: "140px",
    },
    width: "90%",
    height: "200px",
  },
  bottomRight: {
    [theme.breakpoints.up("md")]: {
      bottom: 0,
      right: "20%",
      position: "absolute",
      overflow: "hidden",
      transform: "translate(-5%, -40%)",
      width: "290px",
      height: "290px",
    },
    width: "90%",
    height: "200px",
  },
  centerRight: {
    [theme.breakpoints.up("md")]: {
      top: 0,
      right: 0,
      position: "absolute",
      overflow: "hidden",
      transform: "translate(30%, 10%)",
      width: "290px",
      height: "390px",
    },
    width: "90%",
    height: "200px",
  },
  image: {
    objectFit: "cover",
    width: "100%", // Make sure the image takes 100% width of the container
    height: "100%",
    margin: "8px",
    [theme.breakpoints.down("sm")]: {
      flex: "0 0 100%",
      margin: "0",
    },
  },
}));
