import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { PATH_AUTH } from "../routes/paths";
import { RegisterForm } from "../core/components/auth";
import { Page } from "../core/components";
import { styled } from "@mui/material/styles";

const Root = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
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
const ContentStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));
const LoginBar = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export default function RegisterPage() {

  return (
    <Root title="Register | Portfolio">
      <Container>
        <Content>
          <ContentStack direction="row" alignItems="center">
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
            </Box>
          </ContentStack>

          <RegisterForm />

          <LoginBar variant="body2" align="center">
            Already have an account?&nbsp;
            <Link to={PATH_AUTH.login} component={RouterLink}>
              Login
            </Link>
          </LoginBar>
        </Content>
      </Container>
    </Root>
  );
}

