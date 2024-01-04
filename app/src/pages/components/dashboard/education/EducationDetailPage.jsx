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
import { getAuthState } from "../../../../slices/auth/authSlice";
import { editEducation } from "../../../../slices/education/thunk/edit-education";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingPage } from "../../../LoadingPage";
import { getEducationState } from "../../../../slices/education/educationSlice";
import {
  ArrowBackIosOutlined,
  CameraAltOutlined,
  Close,
  Edit,
} from "@mui/icons-material";
import { getEducationById } from "../../../../slices/education/thunk/getEducationById";

const EducationDetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(getAuthState);
  const { educationId } = useParams(); // Get educationId from URL parameters using React Router's useParams
  const [isEditing, setIsEditing] = useState(false);
  const { educations, isLoading } = useSelector(getEducationState);

  useEffect(() => {
    dispatch(getEducationById(educationId));
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && educations) {
      formik.setValues({
        degree: educations.degree || "",
        institution: educations.institution || "",
        graduationYear: educations.graduationYear || "",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      institution: "",
      graduationYear: "",
    },
    // validationSchema: EducationSchema,
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(editEducation({ educationId, updatedData: values }))
        .unwrap()
        .then(() => {
          dispatch(getEducationById(educationId));
        })
        .catch((error) => {
          resetForm();
          setSubmitting(false);
          setErrors({
            afterSubmit: errorMessage || "Failed to edit education, try again!",
          });
        });
    },
  });

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
    !values.graduationYear ||
    !values.description ||
    !values.institution ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;
  const alertSeverity = formik.errors.afterSubmit ? "error" : "success";

  return (
    <Page className={classes.root} title="Education Detail | Portfolio">
      <Container maxWidth="lg">
        {formik.errors.afterSubmit && (
          <Alert severity={alertSeverity}>{formik.errors.afterSubmit}</Alert>
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
              Edit Education
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
        ) : educations ? (
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
              {educations.degree}
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
            {isEditing ? (
              <Stack sx={{ marginTop: "0.6em" }}>
                <Stack
                  flexDirection="row"
                  sx={{ marginTop: "0.2em", marginBottom: "0.2em" }}
                >
                  <TextField
                    type="text"
                    label="Degree"
                    {...getFieldProps("degree")}
                    error={Boolean(touched.degree && errors.degree)}
                    helperText={touched.degree && errors.degree}
                    sx={{ marginRight: "0.4em" }}
                  />
                  <TextField
                    type="text"
                    label="Institution name"
                    {...getFieldProps("institution")}
                    error={Boolean(touched.institution && errors.institution)}
                    helperText={touched.institution && errors.institution}
                    sx={{ marginLeft: "0.4em" }}
                  />
                </Stack>
                <TextField
                  fullWidth
                  type="text"
                  label="Graduation year"
                  {...getFieldProps("graduationYear")}
                  error={Boolean(
                    touched.graduationYear && errors.graduationYear
                  )}
                  helperText={touched.graduationYear && errors.graduationYear}
                  sx={{ marginTop: "0.6em", marginBottom: "0.6em" }}
                />
                <Button size="large" type="submit" variant="contained">
                  Update Education
                </Button>
              </Stack>
            ) : (
              <Stack direction="column">
                {educations ? (
                  <Stack direction="column">
                    <Typography className="form_text">
                      {educations.degree}
                    </Typography>
                    <Typography className="form_text">
                      {educations.institution}
                    </Typography>
                    <Typography className="form_text">
                      {educations.graduationYear}
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

export default EducationDetailPage;
