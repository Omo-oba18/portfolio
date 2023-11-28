import { Link } from "react-scroll";
import {
  Box,
  Container,
  Divider,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";

export function MainFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <motion.div>
          <Stack
            direction="column"
            className={classes.leftSideFooter}
            spacing={2}
          >
            <Typography variant="h2">
              Reach out if you want to create impactful visual art together.
            </Typography>
            <Divider />
            <Typography>
              I also keep track of some of my work on Socials:
            </Typography>
            <Stack direction="row"></Stack>
          </Stack>
        </motion.div>
        <motion.div>
          <Stack>
            <Stack></Stack>
            <Stack></Stack>
          </Stack>
        </motion.div>

        <Typography
          variant="caption"
          component="p"
          className={classes.copyright}
        >
          Copyright © omoobaoshoffa
        </Typography>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "2em 0",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
  },
  leftSideFooter: {
    justifyContent: "center",
    alignItems: "start",
    maxWidth: "500px",
  },
  copyright: {
    textAlign: "center",
  },
}));
