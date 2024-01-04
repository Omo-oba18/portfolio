import { Link, Outlet } from "react-router-dom";
import { Logo } from "../../components";
import { styled } from "@mui/material/styles";

const CustomHeader = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));
export function LogoLayout() {
  return (
    <>
      <CustomHeader>
        <Link to="/">
          <Logo applyClass={true} />
        </Link>
      </CustomHeader>

      <Outlet />
    </>
  );
}
