import React, { useEffect } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../../../pages/LoadingPage";
import {} from "@mui/icons-material";
import { fetchEducations } from "../../../slices/education/thunk/fetch-education";
import { getEducationState } from "../../../slices/education/educationSlice";
import { ReactComponent as UniversityIcon } from "../../../assets/4805370_49411.svg";
import schoolIcon from "../../../assets/37760_teach_school_blackboard_education_teaching_icon.png";
import bepcIcon from "../../../assets/7465092_books_reading_school_icon.png";

export const Education = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, educations } = useSelector(getEducationState);
  useEffect(() => {
    dispatch(fetchEducations());
  }, [dispatch]);
  if (isLoading) return <LoadingPage />;

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Background
      </Typography>
      {educations?.data?.length && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ padding: "2em", margin: "0 auto" }}
        >
          {educations.data.map((education, index) => (
            <Box className={classes.wrapper} key={index}>
              <span className="icon_wrapper">
                {index === 0 && <UniversityIcon className={classes.icon} />}
                {index === 1 && (
                  <img src={bepcIcon} className={classes.icon} alt="school" />
                )}
                {index === 2 && (
                  <img src={schoolIcon} className={classes.icon} alt="school" />
                )}
              </span>
              <Typography sx={{ fontSize: "26px", textAlign: "center" }}>
                {education.institution}
              </Typography>
              <Divider
                variant="middle"
                sx={{ color: "#000", width: "50%", margin: "0.4em 0" }}
              />
              <Typography>{education.degree}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: { padding: "2em", backgroundColor: theme.palette.secondary.main },
  title: { textAlign: "center", padding: "2rem 0" },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0 2em",
    width: "30%",
    height: "300px",
  },
  icon: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
