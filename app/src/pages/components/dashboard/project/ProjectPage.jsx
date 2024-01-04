import React, { useEffect } from "react";
import { Box, SnackbarContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
import { styled } from "@mui/material/styles";

const Wrapper = styled(Page)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: "40px 0 0 0",
  margin: "0 - 20px",
  [theme.breakpoints.up("md")]: {
    paddingTop: "2em",
    // marginTop: -70,
  },
}));
const Root = styled(Page)(({ theme }) => ({
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
  "&.emptyContainer": {
    padding: "5vw",
  },
}));

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Root
      className={classnames({
        emptyContainer: !projects?.length,
      })}
      title="Project | Portfolio"
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1040,
          width: "100%",
          minHeight: "60vh",
        }}
      >
        <Button
          component={Link}
          to={PATH_DASHBOARD.newProject}
          size="large"
          variant="contained"
          sx={{ marginBottom: "2rem !important" }}
        >
          Create new Project
        </Button>
        {projects?.data?.length ? (
          <>
            <SnackbarContent message="Your projects" />
            <Wrapper>
              {projects.data.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </Wrapper>
          </>
        ) : (
          <EmptyProjectPage />
        )}
      </div>
    </Root>
  );
};

export default ProjectPage;
