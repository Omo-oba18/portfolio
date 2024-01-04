import {
  Box,
  Divider,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FacebookOutlined,
  GitHub,
  MailOutline,
  PhoneOutlined,
  Twitter,
} from "@mui/icons-material";
import emailjs from "@emailjs/browser";

import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { useEffect, useRef } from "react";
import { LoadingPage } from "../../../pages/LoadingPage";
import { getUserState } from "../../../slices/user/userSlice";

export function MainFooter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);
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
    <Box className={classes.footer}>
      <div className={classes.container}>
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
          className={classes.footerWrapper}
        >
          <Stack
            direction="column"
            className={classes.leftSideFooter}
            spacing={2}
          >
            <Typography variant="h2" className={classes.title}>
              Reach out if you want to create impactful visual art together.
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.subtitle}>
              I also keep track of some of my work on Socials:
            </Typography>
            <Stack direction="row">
              <FacebookOutlined className={classes.icon} />
              <Twitter className={classes.icon} />
              <GitHub className={classes.icon} />
              <Typography className={classes.textValue}>
                @omoobaoshoffa
              </Typography>
            </Stack>
          </Stack>
          <form autoComplete="off" noValidate ref={form} onSubmit={sendEmail}>
            <Stack spacing={2} className={classes.formWrapper}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <TextField
                  sx={{ width: "48%" }}
                  autoComplete="firstname"
                  type="text"
                  placeholder="Firstname"
                  className={classes.input}
                  size="small"
                  name="firstname"
                />

                <TextField
                  sx={{ width: "48%" }}
                  autoComplete="lastname"
                  type="text"
                  placeholder="Lastname"
                  className={classes.input}
                  size="small"
                  name="lastname"
                />
              </Stack>

              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                placeholder="Email address"
                className={classes.input}
                size="small"
                name="user_email"
              />

              <TextField
                fullWidth
                autoComplete="subject"
                type="text"
                placeholder="Subject"
                className={classes.input}
                size="small"
                name="subject"
              />

              <TextField
                fullWidth
                autoComplete="message"
                type="text"
                placeholder="Your message"
                className={classes.input}
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
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, x: 100 }} // Initial state
          animate={{ opacity: 1, x: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          <Stack className={classes.rightSideFooter} spacing={2}>
            <Stack direction="row" spacing={2} className={classes.itemWrapper}>
              <Box className={classes.iconWrapper}>
                <MailOutline />
              </Box>
              <Box>
                <Typography className={classes.subtitle}>Email</Typography>
                {user && (
                  <Typography className={classes.textValue}>
                    {user.email}
                  </Typography>
                )}
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} className={classes.itemWrapper}>
              <Box className={classes.iconWrapper}>
                <PhoneOutlined />
              </Box>
              <Box>
                <Typography className={classes.subtitle}>Phone</Typography>
                {user && (
                  <Typography className={classes.textValue}>
                    {user.phone}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Stack>
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, y: 100 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animation state
          transition={{ duration: 1 }}
        >
          <Typography
            variant="caption"
            component={Box}
            className={classes.copyright}
          >
            Copyright © omoobaoshoffa
          </Typography>
        </motion.div>
      </div>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: "2rem",
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingRight: "4em",
    paddingLeft: "4em",
  },
  leftSideFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    maxWidth: "500px",
    padding: "2rem 0",
  },
  rightSideFooter: {
    display: "flex",
    padding: "2rem 0",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "end",
  },
  title: {
    fontFamily: "Radley serif",
  },
  subtitle: {
    textTransform: "uppercase",
    fontSize: "15px",
    letterSpacing: "2px",
  },
  icon: {
    marginRight: "0.4rem",
    marginLeft: "0.4rem",
    fontSize: "16px",
  },
  copyright: {
    textAlign: "center",
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  divider: {
    width: "100%",
    height: "2px",
    backgroundColor: "#000",
  },
  iconWrapper: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemWrapper: {
    display: "flex",
    minWidth: "300px",
    justifyContent: "start",
    margin: "0 4em",
  },
  textValue: {
    fontStyle: "italic",
    margin: "0 0.4rem",
  },
  input: {
    "& .MuiInputBase-root": {
      background: theme.palette.secondary.main,
    },
    "& .MuiFormControl-root": {
      background: theme.palette.secondary.main,
      margin: "0.5em 0",
    },
  },
  footerWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection:"row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));
