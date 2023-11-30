import { Box, Divider, Stack, Typography } from "@mui/material";
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
import { getUserInfo } from "../../../slices/user/thunk/get-user";
import { useEffect } from "react";
import { LoadingPage } from "../../../pages/LoadingPage";
import { getUserState } from "../../../slices/user/userSlice";

export function MainFooter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  if (isLoading) return <LoadingPage />;

  return (
    <Box className={classes.footer}>
      <div className={classes.container}>
        <motion.div>
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
        </motion.div>
        <motion.div>
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
        </motion.div>

        <Typography
          variant="caption"
          component={Box}
          className={classes.copyright}
        >
          Copyright © omoobaoshoffa
        </Typography>
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
    justifyContent: "flex-start",
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
  },
  textValue: {
    fontStyle: "italic",
    margin: "0 0.4rem",
  },
}));
