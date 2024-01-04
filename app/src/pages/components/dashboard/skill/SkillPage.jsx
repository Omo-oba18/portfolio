import React, { useEffect } from "react";
import { Box, SnackbarContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import classnames from "classnames";

import { LoadingPage } from "../../../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { EmptySkillPage } from "./EmptySkillPage";
import { SkillCard } from "./SkillCard";
import { Page } from "../../../../core/components";
import { getSkillState } from "../../../../slices/skill/skillSlice";
import { fetchSkills } from "../../../../slices/skill/thunk/fetchSkill";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { styled } from "@mui/material/styles";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: "40px 0 0 0",
  margin: "0 - 20px",
  [theme.breakpoints.up("md")]: {
    paddingTop: "2em",
    // marginTop: -70,
  },
}));
const Root = styled(Page)(({ theme }) => ({
  textDecoration: "none",
  zIndex: 100,
  width: "100%",
  flexGrow: 1,
  position: "relative",
  padding: "0 4vw",
  backgroundImage: `linear-gradient(180deg, ${alpha(
    theme.palette.grey[300],
    0
  )} 40%, ${theme.palette.grey[300]} 100%)`,
  "&.emptyContainer": {
    padding: "5vw",
  },
}));

const SkillPage = () => {
  const dispatch = useDispatch();
  const { isLoading, skills } = useSelector(getSkillState);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Root
      className={classnames({
        emptyContainer: !skills?.length,
      })}
      title="Skill | Portfolio"
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1040,
          width: "100%",
          minHeight: "60vh",
        }}
      >
        <Button
          component={Link}
          to={PATH_DASHBOARD.newSkill}
          size="large"
          variant="contained"
          sx={{ marginBottom: "2rem !important" }}
        >
          Create new Skill
        </Button>
        {skills?.data?.length ? (
          <>
            <SnackbarContent message="Your skills" />
            <Wrapper>
              {skills.data.map((skill) => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </Wrapper>
          </>
        ) : (
          <EmptySkillPage />
        )}
      </div>
    </Root>
  );
};

export default SkillPage;
