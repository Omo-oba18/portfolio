import { Box, Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/404_not_found.png";
import { Page } from "../core/components";

export default function UnknownPage() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404 Page Not Found | Chablis Mahutin Portfolio"
    >
      <Container>
        <Box component={motion.div} initial="false" animate>
          <Box className={classes.box}>
            <motion.div
              animate={{
                scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
                opacity: [0, 1, 1, 1, 1, 1],
                transition: { duration: 0.72, ease: [0.43, 0.13, 0.23, 0.96] },
              }}
            >
              <Typography variant="h3" paragraph>
                Sorry, the page is not found
              </Typography>
            </motion.div>
            <Typography className={classes.text}>
              Sorry, we could not find the pages you are looking for. Perhaps
              you have mistyped the URL? Be sure to check you spelling.
            </Typography>
            <motion.div
              animate={{
                scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
                opacity: [0, 1, 1, 1, 1, 1],
                transition: { duration: 0.72, ease: [0.43, 0.13, 0.23, 0.96] },
              }}
            >
              <Box
                className={classes.image}
                component="img"
                src={notFoundImg}
              />
            </motion.div>
            <Button
              className={classes.btn}
              component={Link}
              to="/"
              size="large"
              variant="contained"
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100%",
    alignItems: "center",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  },
  box: {
    maxWidth: 400,
    margin: "auto",
    textAlign: "center",
  },
  text: {
    color: theme.palette.text.primary,
  },
  image: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  btn: {
    color: "#fff",
  },
}));
