import {
  Link,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
import { Logo } from "../../components";
import dashboardCover from "../../../assets/dashboard-cover.jpg";
import { getSkillState } from "../../../slices/skill/skillSlice";
import { logoutUser } from "../../../slices/auth/thunk/logout";

export function DashboardNavbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { skills } = useSelector(getSkillState);

  const handleLogout = async () => {
    await dispatch(logoutUser())
      .then(() => navigate(`${PATH_AUTH.login}`))
      .catch((error) => {});
    // await logout().finally(() => navigate('/'));
  };

  return (
    <AppBar className={classes.appBar}>
      <Box className={classes.dashboardTitle}>
        <Box className={classes.logoWrapper}>
          <Logo applyClass={true} />
          <Typography variant="h1">Dashboard | Portfolio</Typography>
        </Box>
        <Typography variant="h2">
          The modern portfolio dashboard needed for any person.
        </Typography>
      </Box>

      <Toolbar
        className={classnames(classes.toolbar, {
          [classes.toolbarOffset]:
            pathname === PATH_DASHBOARD.root && skills?.length,
        })}
        disableGutters
      >
        <Container
          sx={{ display: "flex" }}
          className={classes.container}
          maxWidth="lg"
        >
          <Button
            className={classes.link}
            component={RouterLink}
            to={PATH_DASHBOARD.root}
            variant="text"
          >
            Home
          </Button>
          <Button
            className={classes.link}
            component={RouterLink}
            to={PATH_DASHBOARD.skill}
            variant="text"
          >
            Skill
          </Button>
          <Button
            className={classes.link}
            component={RouterLink}
            to={PATH_DASHBOARD.education}
            variant="text"
          >
            Education
          </Button>
          <Button
            className={classes.link}
            component={RouterLink}
            to={PATH_DASHBOARD.project}
            variant="text"
          >
            Project
          </Button>
          {/* Section divider */}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.profile}
            sx={{ p: 0 }}
            className={classes.profile}
          >
            <Avatar alt="Chablis Mahutin" src="/static/images/avatar/2.jpg" />
          </Button>
          <Button
            className={classes.link}
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1,
    height: "60%",
    padding: "0 5vw",
    position: "relative !important",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: theme.palette.common.white,
    background: "#0a0b0c no-repeat center center",
    backgroundSize: "cover",
    backgroundImage: `url(${dashboardCover})`,
  },
  toolbar: {
    margin: "0 auto",
    maxWidth: 1040,
    width: "100%",
  },
  toolbarOffset: {
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(7),
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dashboardTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "6vw 4vw",
    minHeight: 200,
    maxHeight: 450,
    textAlign: "center",

    "& > h2": {
      marginLeft: theme.spacing(2),
      padding: "5px 0",
      fontSize: 22,
      fontWeight: 400,
    },
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > h1": {
      marginLeft: theme.spacing(2),
      fontSize: 35,
      fontWeight: 700,
    },
  },
  link: {
    ...theme.typography.subtitle2,
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  profile: {
    marginRight: "1em",
  },
}));
