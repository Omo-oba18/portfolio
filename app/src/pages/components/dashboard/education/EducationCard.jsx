import { Avatar, Box, Card, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import educationCover from "../../../../assets/icons/react-js.svg";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { styled } from "@mui/material/styles";

const Root = styled(Card)(({ theme }) => ({
  display: "flex",
  flex: "1 1 300px",
  flexDirection: "column",
  overflow: "hidden",
  margin: "0 20px 40px",
  minHeight: 300,
  background: "#fff center center",
  backgroundSize: "cover",
  borderRadius: 5,
  boxShadow: "rgb(39 44 49 / 6%) 8px 14px 38px, rgb(39 44 49 / 3%) 1px 3px 8px",
  transition: "all 0.5s ease",
  cursor: "pointer",

  [theme.breakpoints.up("md")]: {
    "&:nth-of-type(6n + 1)": {
      flex: "1 1 100%",
      flexDirection: "row",

      // IMAGE
      "& > :nth-child(1)": {
        position: "relative",
        flex: "1 1 auto",
        borderRadius: "5px 0 0 5px",

        "& > :nth-child(1)": {
          position: "absolute",
          height: "100%",
          width: "100%",
        },
      },

      // CONTENT
      "& > :nth-child(2)": {
        flex: "0 1 350px",
      },
    },
  },

  "&:hover": {
    boxShadow:
      "rgb(39 44 49 / 7%) 8px 28px 50px, rgb(39 44 49 / 4%) 1px 6px 12px",
    transition: "all 0.4s ease",
    transform: "translate3D(0,-1px,0) scale(1.02)",
  },
}));
const Time = styled(Typography)(({ theme }) => ({
  marginLeft: 20,
  color: theme.palette.text.secondary,
}));
const EducationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,

  [theme.breakpoints.up("md")]: {
    "&:nth-of-type(6n + 1)": {
      flex: "0 1 355px",

      // CONTENT
      "& > :nth-child(1)": {
        padding: "30px 40px 0",
      },

      // FOOTER
      "& > :nth-child(2)": {
        padding: "0 40px 30px",
      },
    },
  },
}));

export function EducationCard({ education }) {
  return (
    <Root
      key={education.id}
      component={Link}
      to={PATH_DASHBOARD.educationDetail(education._id)}
    >
      <Box
        sx={{
          position: "relative",
          display: "block",
          overflow: "hidden",
          borderRadius: "5px 5px 0 0",
        }}
      >
        <Box
          sx={{
            width: "auto",
            height: 200,
            background: "#c5d2d9 no-repeat center center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: 1,
              transition: "none 0s ease 0s",
            }}
            component="img"
            src={educationCover}
          />
        </Box>
      </Box>
      <EducationWrapper>
        <Box
          sx={{
            position: "relative",
            flexGrow: 1,
            display: "block",
            padding: " 25px 25px 0",
          }}
        >
          <Box>
            <Typography variant="h3">{education.degree}</Typography>
          </Box>
          <Box>{education?.institution}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: 25,
          }}
        >
          <Tooltip title={education.degree} placement="top">
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              alt="education leader"
            />
          </Tooltip>
          <Time>Updated: {moment(education.createdAt).format("lll")}</Time>
        </Box>
      </EducationWrapper>
    </Root>
  );
}
