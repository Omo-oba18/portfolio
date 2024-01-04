import { Box } from "@mui/material";
import CMLogo from "../../../assets/chablis-mahutin-logo.png";

// @todo: Make generic component wrappeer for icons
export const Logo = ({ applyClass }) => {
  return (
    <div className={applyClass ? "logo-wrapper" : undefined}>
      <Box
        component="img"
        src={CMLogo}
        sx={{
          width: "100%", //100% width of the container
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};


