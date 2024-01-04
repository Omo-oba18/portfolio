import {
  Box,
  Divider,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FacebookOutlined, GitHub, Twitter } from "@mui/icons-material";
import emailjs from "@emailjs/browser";

import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { useEffect, useRef } from "react";
import { LoadingPage } from "../../../pages/LoadingPage";
import { getUserState } from "../../../slices/user/userSlice";
import { styled } from "@mui/material/styles";

const Footer = styled("footer")(({ theme }) => ({
  paddingTop: "2rem",
  backgroundColor: theme.palette.primary.main,
}));
const Input = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: theme.palette.secondary.main,
  },
  "& .MuiFormControl-root": {
    background: theme.palette.secondary.main,
    margin: "0.5em 0",
  },
}));
const FooterWrapper = styled(motion.div)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export function MainFooter() {
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { isLoading } = useSelector(getUserState);
  const form = useRef();

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert("message sent successfully...");
          resetForm();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const resetForm = () => {
    if (form && form.current) {
      form.current.reset();
    }
  };

  return (
    <Footer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "4em",
          paddingLeft: "4em",
        }}
      >
        <FooterWrapper
          initial={{ opacity: 0, x: -100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          <Stack
            direction="column"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              maxWidth: "500px",
              padding: "2rem 0",
            }}
            spacing={2}
          >
            <Typography variant="h2" sx={{ fontFamily: "Radley serif" }}>
              Reach out if you want to create impactful visual art together.
            </Typography>
            <Divider
              sx={{ width: "100%", height: "2px", backgroundColor: "#000" }}
            />
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "15px",
                letterSpacing: "2px",
              }}
            >
              I also keep track of some of my work on Socials:
            </Typography>
            <Stack direction="row">
              <FacebookOutlined className="footer-icon" />
              <Twitter className="footer-icon" />
              <GitHub className="footer-icon" />
              <Typography
                sx={{
                  fontStyle: "italic",
                  margin: "0 0.4rem",
                }}
              >
                @omoobaoshoffa
              </Typography>
            </Stack>
          </Stack>
          <form autoComplete="off" noValidate ref={form} onSubmit={sendEmail}>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Input
                  sx={{ width: "48%" }}
                  autoComplete="firstname"
                  type="text"
                  placeholder="Firstname"
                  size="small"
                  name="firstname"
                />

                <Input
                  sx={{ width: "48%" }}
                  autoComplete="lastname"
                  type="text"
                  placeholder="Lastname"
                  size="small"
                  name="lastname"
                />
              </Stack>

              <Input
                fullWidth
                autoComplete="email"
                type="email"
                placeholder="Email address"
                size="small"
                name="user_email"
              />

              <Input
                fullWidth
                autoComplete="subject"
                type="text"
                placeholder="Subject"
                size="small"
                name="subject"
              />

              <Input
                fullWidth
                autoComplete="message"
                type="text"
                placeholder="Your message"
                rows={3}
                multiline
                size="small"
                name="message"
              />
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{ margin: "0.6em 0 !important", backgroundColor: "#000" }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </FooterWrapper>

        <motion.div
          initial={{ opacity: 0, y: 100 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          <Typography
            variant="caption"
            component={Box}
            sx={{
              textAlign: "center",
              paddingTop: "1em",
              paddingBottom: "1em",
            }}
          >
            Copyright © omoobaoshoffa
          </Typography>
        </motion.div>
      </div>
    </Footer>
  );
}
