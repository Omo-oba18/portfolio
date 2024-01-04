import React, { useEffect } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingPage } from "../../../pages/LoadingPage";
import { fetchEducations } from "../../../slices/education/thunk/fetch-education";
import { getEducationState } from "../../../slices/education/educationSlice";
import { ReactComponent as UniversityIcon } from "../../../assets/4805370_49411.svg";
import schoolIcon from "../../../assets/37760_teach_school_blackboard_education_teaching_icon.png";
import bepcIcon from "../../../assets/7465092_books_reading_school_icon.png";

import { styled } from "@mui/material/styles";
const Root = styled(Box)(({ theme }) => ({
  padding: "2em",
  backgroundColor: theme.palette.secondary.main,
}));

export const Education = () => {
  const dispatch = useDispatch();
  const { isLoading, educations } = useSelector(getEducationState);
  useEffect(() => {
    dispatch(fetchEducations());
  }, [dispatch]);
  if (isLoading) return <LoadingPage />;

  return (
    <Root>
      <Typography variant="h2" sx={{ textAlign: "center", padding: "2rem 0" }}>
        Background
      </Typography>
      {educations?.data?.length && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ padding: "2em", margin: "0 auto" }}
        >
          {educations.data.map((education, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: "0 2em",
                width: "30%",
                height: "300px",
              }}
              key={index}
            >
              <span className="icon_wrapper">
                {index === 0 && (
                  <UniversityIcon
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {index === 1 && (
                  <img
                    src={bepcIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="school"
                  />
                )}
                {index === 2 && (
                  <img
                    src={schoolIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="school"
                  />
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
    </Root>
  );
};
