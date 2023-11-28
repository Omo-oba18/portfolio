import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { Logo } from "../core/components";

export function LoadingPage({ ...other }) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...other}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Logo applyClass={false} />
      </motion.div>

      <Box
        className={classes.animatedInnerBox}
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
      />

      <Box
        className={classes.animatedOuterBox}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.main,
  },
  animatedInnerBox: {
    width: 100,
    height: 100,
    borderRadius: "25%",
    position: "absolute",
    // border: `solid 3px ${alpha(theme.palette.primary.dark, 0.25)}`,
  },
  animatedOuterBox: {
    width: 120,
    height: 120,
    borderRadius: "25%",
    position: "absolute",
    // border: `solid 8px ${alpha(theme.palette.primary.dark, 0.25)}`,
  },
}));
