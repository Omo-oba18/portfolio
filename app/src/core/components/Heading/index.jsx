import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Logo } from "../Logo";
import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { LoadingPage } from "../../../pages/LoadingPage";
import { getUserState } from "../../../slices/user/userSlice";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
const HireMe = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main} !important`,
  color: "black !important",
  padding: "8px 30px !important",
}));

export const Heading = () => {
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Root>
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          maxWidth: "600px",
          padding: "0 2em",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          <Logo applyClass={true} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          {user && (
            <Typography
              variant="h1"
              fontFamily="Radley serif"
              fontStyle="italic"
            >
              Hello, I am <br />
              <Typography variant="h2" component="span">
                {user.name}!
              </Typography>
            </Typography>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          {user ? (
            <Typography sx={{ textAlign: "justify" }}>{user.bio}</Typography>
          ) : (
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate sequi officia omnis!
            </Typography>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animation state
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.2 }}
        >
          <HireMe>Hire me</HireMe>
        </motion.div>
      </Stack>
    </Root>
  );
};
