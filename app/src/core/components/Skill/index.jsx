import React, { useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ReactIcon } from "../../../assets/icons/react-js.svg";
import { getSkillState } from "../../../slices/skill/skillSlice";
import { fetchSkills } from "../../../slices/skill/thunk/fetchSkill";
import { LoadingPage } from "../../../pages/LoadingPage";
import { StarOutlineOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  padding: "2em",
  backgroundColor: theme.palette.secondary.main,
}));
const Title = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "2rem 0",
  color: theme.palette.primary.main,
}));

export const Skill = () => {
  const { isLoading, skills } = useSelector(getSkillState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);
  if (isLoading) return <LoadingPage />;

  return (
    <Root>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Initial state
        animate={{ opacity: 1, x: 0 }} // Animation state
        transition={{ duration: 1 }}
      >
        <Title variant="h2">Skills</Title>
      </motion.div>
      <motion.div>
        {skills?.data?.length && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 8, md: 12 }}
          >
            {skills.data.map((skill) => (
              <Grid key={skill._id} item xs={12} sm={4} md={3}>
                <Stack
                  sx={{
                    width: "330px",
                    height: "170px",
                    padding: "2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    position: "relative",
                    borderRadius: "10px",
                    border: "0.4px solid rgba(0, 0, 0, 0.045)",
                    boxShadow:
                      "9.2px 9.2px 1px rgba(0, 0, 0, 0.045),11.4px 11.4px 1.9px rgba(0, 0, 0, 0.072), 22.9px 22.9px 14.3px rgba(0, 0, 0, 0.093), 50px 50px 40px rgba(0, 0, 0, 0.13)",
                  }}
                  direction="column"
                >
                  {skill.image ? (
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="skill-icon"
                    />
                  ) : (
                    <ReactIcon className="skill-icon" />
                  )}
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      marginBottom: "0.5rem !important",
                    }}
                    variant="h5"
                  >
                    {skill.name}
                  </Typography>
                  <Typography variant="p">
                    {/* {getRandomSentence(skill.description)} */}
                  </Typography>

                  <Stack direction="row">
                    {getStarsForProficiency(skill.proficiency)}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Root>
  );
};

const getStarsForProficiency = (proficiency) => {
  const starCount = 5;
  const fullStar = (
    <StarOutlineOutlined key="full" style={{ color: "#4F6F52" }} />
  );
  const halfStar = (
    <StarOutlineOutlined
      key="half"
      style={{
        color: "#4F6F52",
        clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
      }}
    />
  );
  const emptyStar = (
    <StarOutlineOutlined key="empty" style={{ color: "#000" }} />
  );

  const proficiencyLower = proficiency.toLowerCase();
  let filledStars = 0;
  let halfFilled = false;

  if (proficiencyLower === "beginner") {
    filledStars = 2;
  } else if (proficiencyLower === "intermediate") {
    filledStars = 3.5;
    halfFilled = true;
  } else if (proficiencyLower === "advanced") {
    filledStars = 4.5;
    halfFilled = true;
  }

  const starIcons = [];

  for (let i = 0; i < starCount; i++) {
    if (filledStars >= 1) {
      starIcons.push(fullStar);
      filledStars -= 1;
    } else if (halfFilled) {
      starIcons.push(halfStar);
      halfFilled = false;
    } else {
      starIcons.push(emptyStar);
    }
  }

  return starIcons;
};
