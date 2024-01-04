import React, { useEffect } from "react";
import { Box, SnackbarContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

import { LoadingPage } from "../../../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { EmptyProjectPage } from "./EmptyProjectPage";
import { ProjectCard } from "./ProjectCard";
import { Page } from "../../../../core/components";
import { getProjectState } from "../../../../slices/project/projectSlice";
import { fetchProjects } from "../../../../slices/project/thunk/fetch-project";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";

const ProjectPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Page
      className={classnames(classes.root, {
        [classes.emptyContainer]: !projects?.length,
      })}
      title="Project | Portfolio"
    >
      <div className={classes.content}>
        <Button
          component={Link}
          to={PATH_DASHBOARD.newProject}
          size="large"
          variant="contained"
          className={classes.btn}
        >
          Create new Project
        </Button>
        {projects?.data?.length ? (
          <>
            <SnackbarContent message="Your projects" />
            <Box className={classes.wrapper}>
              {projects.data.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </Box>
          </>
        ) : (
          <EmptyProjectPage />
        )}
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
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
  btn: { marginBottom: "2rem !important" },
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

export default ProjectPage;
