import React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LoginForm, Page } from "../core/components";
import { PATH_AUTH } from "../routes/paths";
import { styled } from "@mui/material/styles";

const Root = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
const ContentStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));
const RegisterBar = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
const Content = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const LoginPage = () => {
  return (
    <Root title="Login | Portfolio">
      <Container>
        <Content>
          <ContentStack direction="row" alignItems="center">
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Sign in to your portfolio dashboard
              </Typography>
              <StyledTypography>Enter your details below.</StyledTypography>
            </Box>
          </ContentStack>
          <LoginForm />
          <RegisterBar variant="body2" align="center">
            Don’t have an account?&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.register}
            >
              Get started
            </Link>
          </RegisterBar>
        </Content>
      </Container>
    </Root>
  );
};

export default LoginPage;
