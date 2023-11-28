import React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
import { LoginForm, Page } from "../core/components";
import { PATH_AUTH } from "../routes/paths";

const LoginPage = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Login | Portfolio">
      <Container>
        <div className={classes.content}>
          <Stack
            className={classes.contentStack}
            direction="row"
            alignItems="center"
          >
            <Box className={classes.contentStackBox}>
              <Typography variant="h4" gutterBottom>
                Sign in to your portfolio dashboard
              </Typography>
              <Typography className={classes.contentStackBoxTypography}>
                Enter your details below.
              </Typography>
            </Box>
          </Stack>
          <LoginForm />
          <Typography
            className={classes.registerBar}
            variant="body2"
            align="center"
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Get started
            </Link>
          </Typography>
        </div>
      </Container>
    </Page>
  );
};

export default LoginPage;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  content: {
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  },
  contentStack: {
    marginBottom: theme.spacing(5),
  },
  contentStackBox: {
    flexGrow: 1,
  },
  contentStackBoxTypography: {
    color: theme.palette.text.secondary,
  },
  registerBar: {
    marginTop: theme.spacing(3),
  },
}));
