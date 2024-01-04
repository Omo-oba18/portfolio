import React, { useEffect, useState } from "react";
import { Page } from "../../../../core/components";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../../assets/javafx.jpg";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Stack,
  Alert,
  Button,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { editSkill } from "../../../../slices/skill/thunk/edit-skill";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingPage } from "../../../LoadingPage";
import { getSkillState, resetState } from "../../../../slices/skill/skillSlice";
import {
  ArrowBackIosOutlined,
  CameraAltOutlined,
  Close,
  Edit,
} from "@mui/icons-material";
import { getSkillById } from "../../../../slices/skill/thunk/getSkillById";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { SkillSchema } from "../../../../utils/validation";

const SkillDetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skillId } = useParams(); // Get skillId from URL parameters using React Router's useParams
  const [isEditing, setIsEditing] = useState(false);
  const { errorMessage, skill, isSuccess, isError, isLoading } =
    useSelector(getSkillState);

  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  // Function to show alert for a certain duration
  const showAlertForDuration = (durationInMillis) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, durationInMillis);
    dispatch(resetState());
  };

  useEffect(() => {
    dispatch(resetState());

    dispatch(getSkillById(skillId));
  }, [dispatch, skillId]);

  useEffect(() => {
    if (isSuccess) {
      showAlertForDuration(3000);
    } else if (isError) {
      showAlertForDuration(5000);
    }
  }, [isSuccess, isError]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && skill) {
      formik.setValues({
        name: skill.name || "",
        proficiency: skill.proficiency || "",
        description: skill.description || "",
      });
    }
  };

  

  const formik = useFormik({
    initialValues: {
      name: skill ? skill.name  : "", // Check if skill exists and has a name
      proficiency: skill ? skill.proficiency  : "", // Check proficiency similarly
      description: skill ? skill.description  : "", // Check description similarly
      image: skill ? skill.image  : null, // Initialize image as null since it will be updated separately
    },
    validationSchema: SkillSchema,
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(editSkill({ skillId, updatedData: values }))
        .unwrap()
        .then(() => {
          dispatch(getSkillById(skillId));

          navigate(`${PATH_DASHBOARD.skill}`);
        })
        .catch((error) => {
          resetForm();
          setSubmitting(false);
          setErrors({
            afterSubmit: errorMessage,
          });
        });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoadingImage(true);
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("image", reader.result);
        dispatch(editSkill({ skillId, updatedData: values }))
          .unwrap()
          .then(() => {
            dispatch(getSkillById(skillId));
            setIsLoadingImage(false);
            dispatch(resetState());
          })
          .catch((error) => {
            setIsLoadingImage(false);
          });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const {
    values,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    dirty,
    isSubmitting,
  } = formik;

  if (isLoading) return <LoadingPage />;

  const isSubmitDisabled =
    !values.name ||
    !values.description ||
    !values.proficiency ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  return (
    <Page className={classes.root} title="Skill Detail | Portfolio">
      <Container maxWidth="lg">
        {isError && showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            {errorMessage}
          </Alert>
        )}
        {isSuccess && showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Skill updated successfully
          </Alert>
        )}

        {isEditing ? (
          <Stack sx={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
              }}
            >
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  background: "#f1f1f1",
                  color: "#13241b",
                  padding: "8px 24px",
                  "&:hover": {
                    background: "#4a8a62",
                  },
                }}
                startIcon={<ArrowBackIosOutlined />}
              >
                Go back
              </Button>
            </span>
            <Typography variant="h3" textAlign="center">
              Edit Skill
            </Typography>
            <span style={{ position: "absolute", right: 0 }}>
              <Button
                sx={{
                  background: "#a6190f",
                  color: "#fff",
                  padding: "8px 24px",
                  "&:hover": {
                    background: "#4f6e42",
                  },
                }}
                endIcon={<Close />}
                onClick={handleEdit}
              >
                Close Edit
              </Button>
            </span>
          </Stack>
        ) : skill ? (
          <Stack sx={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 0,
              }}
            >
              <Button
                sx={{
                  background: "#f1f1f1",
                  color: "#13241b",
                  padding: "8px 24px",
                  "&:hover": {
                    background: "#4a8a62",
                  },
                }}
                startIcon={<ArrowBackIosOutlined />}
              >
                Go back
              </Button>
            </span>

            <Typography variant="h3" textAlign="center">
              {skill.name}
            </Typography>
            <span
              style={{
                position: "absolute",
                right: 0,
              }}
            >
              <Button
                sx={{
                  background: "#4f6f52",
                  color: "#fff",
                  padding: "8px 24px",
                  "&:hover": {
                    background: "#4f6e42",
                  },
                }}
                endIcon={<Edit />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </span>
          </Stack>
        ) : (
          <>nothing fetched</>
        )}
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={handleSubmit} className="form_wrapper">
            {skill && (
              <Box className="imageWrapper">
                {isLoadingImage ? (
                  <CircularProgress />
                ) : (
                  <>
                    <img
                      className="image"
                      alt={skill.name}
                      src={formik.values.image || defaultImage}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="skillImage"
                      className="hiddenInput"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="skillImage">
                      <CameraAltOutlined className="cameraIcon" />
                    </label>
                  </>
                )}
              </Box>
            )}
            {isEditing ? (
              <Stack sx={{ marginTop: "0.6em" }}>
                <Stack
                  flexDirection="row"
                  sx={{ marginTop: "0.2em", marginBottom: "0.2em" }}
                >
                  <TextField
                    type="text"
                    label="Skill Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ marginRight: "0.4em" }}
                  />
                  <TextField
                    type="text"
                    label="Skill Proficiency"
                    {...getFieldProps("proficiency")}
                    error={Boolean(touched.proficiency && errors.proficiency)}
                    helperText={touched.proficiency && errors.proficiency}
                    sx={{ marginLeft: "0.4em" }}
                  />
                </Stack>
                <TextField
                  fullWidth
                  type="text"
                  label="Skill Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  multiline
                  rows={5}
                  sx={{ marginTop: "0.6em", marginBottom: "0.6em" }}
                />
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitDisabled}
                >
                  Update Skill
                </Button>
              </Stack>
            ) : (
              <Stack direction="column">
                {skill ? (
                  <Stack direction="column">
                    <Typography className="form_text">{skill.name}</Typography>
                    <Typography className="form_text">
                      {skill.proficiency}
                    </Typography>
                    <Typography className="form_text">
                      {skill.description}
                    </Typography>
                  </Stack>
                ) : (
                  <>nothing fetched</>
                )}
              </Stack>
            )}
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
};
const useStyles = makeStyles((theme) => ({
  root: { padding: "2em" },
}));

export default SkillDetailPage;
