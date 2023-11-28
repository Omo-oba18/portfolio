import React, { useEffect } from "react";
import { Box, SnackbarContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

import { LoadingPage } from "../../../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { EmptyEducationPage } from "./EmptyEducationPage";
import { EducationCard } from "./EducationCard";
import { Page } from "../../../../core/components";
import { getEducationState } from "../../../../slices/education/educationSlice";
import { fetchEducations } from "../../../../slices/education/thunk/fetchEducation";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";

const EducationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, educations } = useSelector(getEducationState);

  useEffect(() => {
    dispatch(fetchEducations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Page
      className={classnames(classes.root, {
        [classes.emptyContainer]: !educations?.length,
      })}
      title="Education | Portfolio"
    >
      <div className={classes.content}>
        <Button
          component={Link}
          to={PATH_DASHBOARD.newEducation}
          size="large"
          variant="contained"
          className={classes.btn}
        >
          Create new Education
        </Button>
        {educations?.data?.length ? (
          <>
            <SnackbarContent message="Your educations" />
            <Box className={classes.wrapper}>
              {educations.data.map((education) => (
                <EducationCard key={education._id} education={education} />
              ))}
            </Box>
          </>
        ) : (
          <EmptyEducationPage />
        )}
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    width: "100%",
    flexGrow: 1,
    position: "relative",
    padding: "0 4vw",
    backgroundImage: `linear-gradient(180deg, ${alpha(
      theme.palette.grey[300],
      0
    )} 40%, ${theme.palette.grey[300]} 100%)`,
  },
  emptyContainer: {
    padding: "5vw",
  },
  content: {
    margin: "0 auto",
    maxWidth: 1040,
    width: "100%",
    minHeight: "60vh",
  },
  btn: { marginBottom: "1rem" },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    padding: "40px 0 0 0",
    margin: "0 - 20px",
    [theme.breakpoints.up("md")]: {
      paddingTop: "2em",
      // marginTop: -70,
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    padding: "25px 0",
  },
}));

export default EducationPage;
