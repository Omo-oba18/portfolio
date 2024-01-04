import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

// import { LoadingPage } from "./LoadingPage";
import { Page } from "../core/components";
// import { useDispatch } from "react-redux";
import { CustomCard } from "./components";
import { styled } from "@mui/material/styles";

const Root = styled(Page)(({ theme }) => ({
  zIndex: 100,
  width: "100%",
  flexGrow: 1,
  position: "relative",
  padding: "0 4vw",
  backgroundImage: `linear-gradient(180deg, ${alpha(
    theme.palette.grey[300],
    0
  )} 40%, ${theme.palette.grey[300]} 100%)`,
}));

const DashboardPage = () => {
  // const dispatch = useDispatch();
  // const { isLoading } = useSelector(getSkillState);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) return <LoadingPage />;

  return (
    <Root title="Dashboard | Portfolio">
      <div
        style={{
          margin: "2em auto",
          maxWidth: 1040,
          width: "100%",
          minHeight: "60vh",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }}>
          <CustomCard title="Skill" />
          <CustomCard title="Education" />
          <CustomCard title="Experience" />
        </Stack>
      </div>
    </Root>
  );
};
export default DashboardPage;
