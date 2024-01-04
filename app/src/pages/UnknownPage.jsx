import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/404_not_found.png";
import { Page } from "../core/components";
import { styled } from "@mui/material/styles";

const Root = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
const Image = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

export default function UnknownPage() {
  return (
    <Root title="404 Page Not Found | Chablis Mahutin Portfolio">
      <Container>
        <Box component={motion.div} initial="false" animate>
          <Box
            sx={{
              maxWidth: 400,
              margin: "auto",
              textAlign: "center",
            }}
          >
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
            <Text>
              Sorry, we could not find the pages you are looking for. Perhaps
              you have mistyped the URL? Be sure to check you spelling.
            </Text>
            <motion.div
              animate={{
                scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
                opacity: [0, 1, 1, 1, 1, 1],
                transition: { duration: 0.72, ease: [0.43, 0.13, 0.23, 0.96] },
              }}
            >
              <Image component="img" src={notFoundImg} />
            </motion.div>
            <Button
              sx={{
                color: "#fff",
              }}
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
    </Root>
  );
}
