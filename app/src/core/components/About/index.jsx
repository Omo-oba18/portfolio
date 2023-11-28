import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import profil from "../../../assets/profil.png";

export const About = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        space={2}
        className={classes.wrapper}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
          className={classes.textWrapper}
        >
          <Typography variant="h2" className={classes.title}>
            About Chablis Mahutin
          </Typography>
          <Typography>
            I am a versatile software engineer with expertise in building
            mobile, desktop, and web applications. My passion lies in creating
            innovative and user-friendly solutions.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
          className={classes.roundedBox}
        >
          <img src={profil} className={classes.image} />
        </motion.div>
      </Stack>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: { padding: "2em", backgroundColor: theme.palette.secondary.main },
  wrapper: { justifyContent: "space-evenly", alignItems: "center" },
  title: { color: theme.palette.primary.main },
  textWrapper: { maxWidth: "400px" },
  roundedBox: {
    borderTopLeftRadius: "40%",
    borderTopRightRadius: "40%",
    width: "300px",
    height: "370px",
    overflow: "hidden",
  },
  image: {
    objectFit: "cover",
    width: "100%", // Make sure the image takes 100% width of the container
    height: "100%",
  },
}));
