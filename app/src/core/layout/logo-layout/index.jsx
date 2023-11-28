import { Link, Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Logo } from "../../components";

export function LogoLayout() {
  const classes = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <Logo applyClass={true} />
        </Link>
      </header>

      <Outlet />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: "100%",
    position: "absolute",
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5, 5, 0),
    },
  },
}));
