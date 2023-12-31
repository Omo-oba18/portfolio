import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../core/components";
import profileImage from "../assets/profile-image.jpg";
import { alpha } from "@mui/material/styles";
import { CameraAltOutlined, ModeEditOutline } from "@mui/icons-material";
import { getUserState } from "../slices/user/userSlice";
import { LoadingPage } from "./LoadingPage";
import { getUserInfo } from "../slices/user/thunk/get-user";
import { Form, FormikProvider, useFormik } from "formik";
import { updateUserInfo } from "../slices/user/thunk/edit-user";

import { styled } from "@mui/material/styles";

const Root = styled(Page)(({ theme }) => ({
  zIndex: 100,
  width: "100%",
  flexGrow: 1,
  position: "relative",
  padding: "0 4vw",
  backgroundImage: `linear-gradient(180deg, ${alpha(
    theme.palette.grey[300],
    0
  )} 40%, ${theme.palette.grey[300]} 100%)`,
}));

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userName = "Chablis";
  const { user, isLoading } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserInfo(userName));
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoadingImage(true);
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("profilePicture", reader.result);
        dispatch(updateUserInfo({ profilePicture: reader.result }))
          .unwrap()
          .then(() => {
            dispatch(getUserInfo(userName));
            setIsLoadingImage(false);
          })
          .catch((error) => {
            setIsLoadingImage(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      bio: "",
      aboutMe: "",
      profilePicture: null,
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
    <Root title="Profile | Portfolio">
      <Typography
        variant="h2"
        sx={{
          margin: "2em auto",
          textAlign: "center",
          fontSize: "46px",
          fontWeight: "bold",
        }}
      >
        Profile
      </Typography>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: "16px",
          margin: "2em auto",
          textAlign: "center",
        }}
      >
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
            sx={{
              padding: "2em",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              direction="column"
              sx={{
                width: "30%",
                margin: "10px",
                position: "relative",
                display: "flex",
                alignItems: "start",
              }}
            >
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
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 0,
                  cursor: "pointer",
                }}
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
            {user && (
              <Box className="imageWrapper">
                {isLoadingImage ? (
                  <CircularProgress />
                ) : (
                  <>
                    <img
                      className="image"
                      alt={user.name}
                      src={formik.values.profilePicture || profileImage}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="profilePicture"
                      className="hiddenInput"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="profilePicture">
                      <CameraAltOutlined className="cameraIcon" />
                    </label>
                  </>
                )}
              </Box>
            )}
            {/* {user && <Box component="img" src={profileImage} alt={user.name} />} */}
            <Stack
              direction="column"
              sx={{
                width: "30%",
                margin: "10px",
                position: "relative",
                display: "flex",
                alignItems: "start",
              }}
            >
              <Typography>Detail</Typography>
              <Typography>Name:</Typography>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
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
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
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
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
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
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 0,
                  cursor: "pointer",
                }}
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
    </Root>
  );
};

export default ProfilePage;
