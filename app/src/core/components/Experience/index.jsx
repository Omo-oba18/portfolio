import React, { useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProjectState } from "../../../slices/project/projectSlice";
import { fetchProjects } from "../../../slices/project/thunk/fetch-project";
import { LoadingPage } from "../../../pages/LoadingPage";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export const Experience = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Project Galery
      </Typography>
      <p className={classes.subtitle}>
        Here is some of the Projects I worked on
      </p>
      {projects?.data?.length && (
        <ImageList variant="masonry" cols={3} gap={12}>
          {projects.data.map((item) => (
            <ImageListItem key={item._id}>
              <img
                srcSet={`${process.env.REACT_APP_API_URL}${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${process.env.REACT_APP_API_URL}${item.images[0]}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.technologies.join(", ")}
                actionIcon={
                  <IconButton aria-label={`info about ${item.title}`}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6em 2em",
    backgroundColor: theme.palette.secondary.main,
  },
  title: { textAlign: "center", color: theme.palette.primary.main },
  subtitle: {
    fontSize: "16px",
    marginBottom: "4rem",
    textAlign: "center",
  },
}));
