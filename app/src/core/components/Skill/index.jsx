import React, { useEffect } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ReactIcon } from "../../../assets/icons/react-js.svg";
import { getSkillState } from "../../../slices/skill/skillSlice";
import { fetchSkills } from "../../../slices/skill/thunk/fetchSkill";
import { LoadingPage } from "../../../pages/LoadingPage";

export const Skill = () => {
  const { isLoading, skills } = useSelector(getSkillState);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);
  if (isLoading) return <LoadingPage />;
  return (
    <Box className={classes.root}>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Initial state
        animate={{ opacity: 1, x: 0 }} // Animation state
        transition={{ duration: 1 }}
        className={classes.textWrapper}
      >
        <Typography variant="h2" className={classes.title}>
          Skills
        </Typography>
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
                <Stack className={classes.item} direction="column">
                  <ReactIcon className={classes.icon} />
                  <Typography className={classes.skillTitle} variant="h5">
                    {skill.name}
                  </Typography>
                  <Typography>{skill.proficiency}</Typography>
                  {/* <Typography sx={{ textAlign: "justify" }}>
                    {skill.description}
                  </Typography> */}
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: { padding: "2em", backgroundColor: theme.palette.secondary.main },
  title: { textAlign: "center", padding: "2rem 0" },
  item: {
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
  },
  skillTitle: {
    fontWeight: "bolder",
    marginBottom: "0.5rem !important",
  },
  icon: {
    fill: theme.palette.primary.main,
    width: "60px",
    height: "60px",
    position: "absolute",
    right: 0,
  },
  divider: {
    color: theme.palette.primary.main,
    width: "80%",
  },
}));
