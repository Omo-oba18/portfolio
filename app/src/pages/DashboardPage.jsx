import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

// import { LoadingPage } from "./LoadingPage";
import { Page } from "../core/components";
import { useDispatch } from "react-redux";
import { CustomCard } from "./components";
const DashboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { isLoading } = useSelector(getSkillState);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) return <LoadingPage />;

  return (
    <Page className={classes.root} title="Dashboard | Portfolio">
      <div className={classes.content}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          className={classes.wrapper}
        >
          <CustomCard title="Skill" />
          <CustomCard title="Education" />
          <CustomCard title="Experience" />
        </Stack>
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
    margin: "2em auto",
    maxWidth: 1040,
    width: "100%",
    minHeight: "60vh",
  },
  wrapper: {},
}));

export default DashboardPage;
