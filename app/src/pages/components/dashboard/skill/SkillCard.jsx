import { Avatar, Box, Card, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import skillCover from "../../../../assets/icons/react-js.svg";

export function SkillCard({ skill }) {
  const classes = useStyles();

  return (
    <Card key={skill.id} className={classes.root}>
      <Box className={classes.imageContainer}>
        <Box className={classes.imageWrapper}>
          <Box
            className={classes.skillImage}
            component="img"
            src={skillCover}
          />
        </Box>
      </Box>
      <Box className={classes.skillWrapper}>
        <Box className={classes.skillContent}>
          <Box>
            <Typography variant="h3">{skill.name}</Typography>
          </Box>
          <Box className={classes.description}>{skill?.description}</Box>
        </Box>
        <Box className={classes.skillFooter}>
          <Tooltip title={skill.name} placement="top">
            <Avatar className={classes.avatar} alt="skill leader" />
          </Tooltip>
          <Typography className={classes.updateDate}>
            Updated: {moment(skill.createdAt).format("lll")}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1 1 300px",
    flexDirection: "column",
    overflow: "hidden",
    margin: "0 20px 40px",
    minHeight: 300,
    background: "#fff center center",
    backgroundSize: "cover",
    borderRadius: 5,
    boxShadow:
      "rgb(39 44 49 / 6%) 8px 14px 38px, rgb(39 44 49 / 3%) 1px 3px 8px",
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
  },
  imageContainer: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    borderRadius: "5px 5px 0 0",
  },
  imageWrapper: {
    width: "auto",
    height: 200,
    background: "#c5d2d9 no-repeat center center",
    backgroundSize: "cover",
  },
  skillImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
    opacity: 1,
    transition: "none 0s ease 0s",
  },
  skillWrapper: {
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
  },
  skillContent: {
    position: "relative",
    flexGrow: 1,
    display: "block",
    padding: " 25px 25px 0",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
  skillFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 25,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  updateDate: {
    marginLeft: 20,
    color: theme.palette.text.secondary,
  },
}));
