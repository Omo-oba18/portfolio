import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { getUserState } from "../../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { LoadingPage } from "../../../pages/LoadingPage";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const CustomBox = styled(Box)(({ theme }) => ({
  padding: "2em",
  backgroundColor: theme.palette.secondary.main,
}));

export const About = () => {
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;
  return (
    <CustomBox>
      <Stack
        direction={{ sm: "column", md: "row" }}
        space={2}
        style={{ justifyContent: "space-evenly", alignItems: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
          style={{ maxWidth: "400px" }}
        >
          <CustomTypography variant="h2">
            About Chablis Mahutin
          </CustomTypography>
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
          style={{
            borderTopLeftRadius: "40%",
            borderTopRightRadius: "40%",
            width: "300px",
            height: "370px",
            overflow: "hidden",
          }}
        >
          {user && (
            <img
              src={user.profilePicture}
              style={{
                objectFit: "cover",
                width: "100%", // Make sure the image takes 100% width of the container
                height: "100%",
              }}
              alt={user.name}
            />
          )}
        </motion.div>
      </Stack>
    </CustomBox>
  );
};
