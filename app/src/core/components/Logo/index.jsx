import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CMLogo from "../../../assets/chablis-mahutin-logo.png";

// @todo: Make generic component wrappeer for icons
export const Logo = ({ applyClass }) => {
  const classes = useStyles();
  return (
    <div className={applyClass ? classes.logoWrapper : undefined}>
      <Box component="img" src={CMLogo} className={classes.logo} />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  logo: {
    width: "100%", //100% width of the container
    height: "100%",
    objectFit: "cover",
  },
  logoWrapper: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "100%",
    width: "60px",
    height: "60px",
  },
}));
