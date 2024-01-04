import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { getUserState } from "../../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { LoadingPage } from "../../../pages/LoadingPage";

export const About = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;
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
          {user && (
            <Typography sx={{ textAlign: "justify" }}>
              {user.aboutMe}
            </Typography>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
          className={classes.roundedBox}
        >
          {user && <img src={user.profilePicture} className={classes.image} />}
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
