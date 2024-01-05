import React, { useEffect } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProjectState } from "../../../slices/project/projectSlice";
import { fetchProjects } from "../../../slices/project/thunk/fetch-project";
import { LoadingPage } from "../../../pages/LoadingPage";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  padding: "6em 2em",
  backgroundColor: theme.palette.secondary.main,
}));
const CustomTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.main,
}));

export const Experience = () => {
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Root>
      <CustomTypography variant="h2">Project Galery</CustomTypography>
      <p
        style={{ fontSize: "16px", marginBottom: "4rem", textAlign: "center" }}
      >
        Here is some of the Projects I worked on
      </p>
      {projects?.data?.length && (
        <ImageList variant="masonry" cols={3} gap={12}>
          {projects.data.map((item) => (
            <ImageListItem key={item._id}>
              <img
                srcSet={`${process.env.REACT_APP_API_URL}${item.images[1]}`}
                src={`${process.env.REACT_APP_API_URL}${item.images[1]}`}
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
    </Root>
  );
};
