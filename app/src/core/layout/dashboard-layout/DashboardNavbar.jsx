import {
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

import classnames from "classnames";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";
import { Logo } from "../../components";
import dashboardCover from "../../../assets/dashboard-cover.jpg";
import { getSkillState } from "../../../slices/skill/skillSlice";
import { logoutUser } from "../../../slices/auth/thunk/logout";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
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
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  margin: "0 auto",
  maxWidth: 1040,
  width: "100%",
  "&.toolbarOffset": {
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(7),
    },
  },
}));

const CustomDashboardTile = styled(Box)(({ theme }) => ({
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
}));

const CustomButton = styled(Button)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.secondary.main,
  marginRight: theme.spacing(2),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& > h1": {
    marginLeft: theme.spacing(2),
    fontSize: 35,
    fontWeight: 700,
  },
}));

export function DashboardNavbar() {
  const dispatch = useDispatch();
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
    <CustomAppBar>
      <CustomDashboardTile>
        <LogoWrapper>
          <Logo applyClass={true} />
          <Typography variant="h1">Dashboard | Portfolio</Typography>
        </LogoWrapper>
        <Typography variant="h2">
          The modern portfolio dashboard needed for any person.
        </Typography>
      </CustomDashboardTile>

      <StyledToolbar
        className={classnames({
          toolbarOffset: pathname === PATH_DASHBOARD.root && skills?.length,
        })}
        disableGutters
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          maxWidth="lg"
        >
          <CustomButton
            component={RouterLink}
            to={PATH_DASHBOARD.root}
            variant="text"
          >
            Home
          </CustomButton>
          <CustomButton
            component={RouterLink}
            to={PATH_DASHBOARD.skill}
            variant="text"
          >
            Skill
          </CustomButton>
          <CustomButton
            component={RouterLink}
            to={PATH_DASHBOARD.education}
            variant="text"
          >
            Education
          </CustomButton>
          <CustomButton
            component={RouterLink}
            to={PATH_DASHBOARD.project}
            variant="text"
          >
            Project
          </CustomButton>
          {/* Section divider */}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.profile}
            sx={{ p: 0, marginRight: "1em" }}
          >
            <Avatar alt="Chablis Mahutin" src="/static/images/avatar/2.jpg" />
          </Button>
          <CustomButton variant="outlined" onClick={handleLogout}>
            Logout
          </CustomButton>
        </Container>
      </StyledToolbar>
    </CustomAppBar>
  );
}
