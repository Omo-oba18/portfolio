import React, { forwardRef } from "react";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

export const Page = forwardRef(({ children, title = "", ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});
