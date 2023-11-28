import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../core/components";
import profileImage from "../assets/profile-image.jpg";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { ModeEditOutline } from "@mui/icons-material";
import { getUserState } from "../slices/user/userSlice";
import { LoadingPage } from "./LoadingPage";
import { getUserInfo } from "../slices/user/thunk/get-user";
import { Form, FormikProvider, useFormik } from "formik";
import { updateUserInfo } from "../slices/user/thunk/edit-user";
import { PATH_DASHBOARD } from "../routes/paths";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const classes = useStyles();

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      formik.setValues({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  };
  const handleEditAbout = () => {
    setEditAboutMe(!editAboutMe);
    if (!editAboutMe && user) {
      formik.setValues({
        aboutMe: user.aboutMe || "",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      bio: "",
      aboutMe: "",
    },
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(updateUserInfo(values))
        .unwrap()
        .then(() => {
          dispatch(getUserInfo(userName));
        })
        .catch((error) => {
          const errorMessage = error.payload
            ? error.payload.errorMessage
            : "Unknown error occurred"; // Extract error message from payload
          setSubmitting(false);
          setErrors({
            afterSubmit: errorMessage,
          });
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  if (isLoading) return <LoadingPage />;

  const alertSeverity = formik.errors.afterSubmit ? "error" : "success";

  return (
    <Page className={classes.root} title="Profile | Portfolio">
      <Typography variant="h2" className={classes.title}>
        Profile
      </Typography>
      <Typography className={classes.bio}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, non
        placeat. Provident.
      </Typography>
      {formik.errors.afterSubmit && (
        <Alert severity={alertSeverity}>{formik.errors.afterSubmit}</Alert>
      )}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            className={classes.wrapper}
          >
            <Stack direction="column" className={classes.boxContent}>
              <Typography>About me</Typography>
              {editAboutMe ? (
                <TextField
                  autoFocus
                  type="text"
                  multiline
                  rows={8}
                  {...getFieldProps("aboutMe")}
                  error={Boolean(touched.aboutMe && errors.aboutMe)}
                  helperText={touched.aboutMe && errors.aboutMe}
                />
              ) : (
                user && <Typography>{user.aboutMe}</Typography>
              )}
              <ModeEditOutline
                className={classes.editIcon}
                onClick={handleEditAbout}
              />
              {editAboutMe && (
                <Button
                  // disabled={isSubmitDisabled}
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Save
                </Button>
              )}
            </Stack>
            <Box component="img" src={profileImage} className={classes.image} />
            <Stack direction="column" className={classes.boxContent}>
              <Typography>Detail</Typography>
              <Typography>Name:</Typography>
              <Stack direction="row" className={classes.editWrapper}>
                {isEditing ? (
                  <TextField
                    autoFocus
                    size="small"
                    type="text"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                ) : (
                  user && <Typography>{user.name}</Typography>
                )}
              </Stack>
              <Typography>Phone:</Typography>
              <Stack direction="row" className={classes.editWrapper}>
                {isEditing ? (
                  <TextField
                    autoFocus
                    size="small"
                    type="text"
                    {...getFieldProps("phone")}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                ) : (
                  user && <Typography>{user.phone}</Typography>
                )}
              </Stack>
              <Typography>Bio:</Typography>
              <Stack direction="row" className={classes.editWrapper}>
                {isEditing ? (
                  <TextField
                    autoFocus
                    size="small"
                    type="text"
                    rows={5}
                    multiline
                    {...getFieldProps("bio")}
                    error={Boolean(touched.bio && errors.bio)}
                    helperText={touched.bio && errors.bio}
                  />
                ) : (
                  user && <Typography>{user.bio}</Typography>
                )}
              </Stack>
              <ModeEditOutline
                className={classes.editIcon}
                onClick={handleEdit}
              />
              {isEditing && (
                <Button
                  // disabled={isSubmitDisabled}
                  type="submit"
                  onSubmit={handleSubmit}
                >
                  Save
                </Button>
              )}
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Page>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 100,
    width: "100%",
    flexGrow: 1,
    position: "relative",
    padding: "0 4vw",
    backgroundImage: `linear-gradient(180deg, ${alpha(
      theme.palette.grey[300],
      0
    )} 40%, ${theme.palette.grey[300]} 100%)`,
  },
  title: {
    margin: "2em auto",
    textAlign: "center",
    fontSize: "46px",
    fontWeight: "bold",
  },
  wrapper: {
    padding: "2em",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bio: {
    textTransform: "uppercase",
    fontSize: "16px",
    margin: "2em auto",
    textAlign: "center",
  },
  image: {
    width: "200px",
    height: "200px",
    borderRadius: "100%",
  },
  boxContent: {
    width: "30%",
    margin: "10px",
    position: "relative",
    display: "flex",
    alignItems: "start",
  },
  editWrapper: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    top: 0,
    cursor: "pointer",
  },
}));

export default ProfilePage;
