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
import { editProject } from "../../../../slices/project/thunk/edit-project";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingPage } from "../../../LoadingPage";
import { getProjectState } from "../../../../slices/project/projectSlice";
import { ArrowBackIosOutlined, Close, Edit } from "@mui/icons-material";
import { getProjectById } from "../../../../slices/project/thunk/getProjectById";

const ProjectDetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(getAuthState);
  const { projectId } = useParams(); // Get projectId from URL parameters using React Router's useParams
  const [isEditing, setIsEditing] = useState(false);
  const { projects, isLoading } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing && projects) {
      formik.setValues({
        title: projects.title || "",
        description: projects.description || "",
        technologies: projects.technologies || "",
        images: projects.images || "",
        githubLink: projects.githubLink || "",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      technologies: "",
      images: "",
      githubLink: "",
    },
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(editProject({ projectId, updatedData: values }))
        .unwrap()
        .then(() => {
          dispatch(getProjectById(projectId));
        })
        .catch((error) => {
          resetForm();
          setSubmitting(false);
          setErrors({
            afterSubmit: errorMessage || "Failed to edit project, try again!",
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
    !values.title ||
    !values.description ||
    !values.technologies ||
    !values.images ||
    !values.githubLink ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;
  const alertSeverity = formik.errors.afterSubmit ? "error" : "success";

  return (
    <Page className={classes.root} title="Project Detail | Portfolio">
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
              Edit Project
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
        ) : projects ? (
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
              {projects.title}
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
                    placeholder="Project name"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    sx={{ marginRight: "0.4em" }}
                  />
                  <TextField
                    type="text"
                    placeholder="Project Github or Gitlab url"
                    {...getFieldProps("githubLink")}
                    error={Boolean(touched.githubLink && errors.githubLink)}
                    helperText={touched.githubLink && errors.githubLink}
                    sx={{ marginLeft: "0.4em" }}
                  />
                </Stack>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Technologies used"
                  {...getFieldProps("technologies")}
                  error={Boolean(touched.technologies && errors.technologies)}
                  helperText={touched.technologies && errors.technologies}
                  sx={{ marginTop: "0.6em", marginBottom: "0.6em" }}
                />
                <Button size="large" type="submit" variant="contained">
                  Update Project
                </Button>
              </Stack>
            ) : (
              <Stack direction="column">
                {projects ? (
                  <Stack direction="column">
                    <Typography className="form_text">
                      {projects.title}
                    </Typography>
                    <Typography className="form_text">
                      {projects.githubLink}
                    </Typography>
                    <Typography className="form_text">
                      {projects.technologies}
                    </Typography>
                    <Typography className="form_text">
                      {projects.description}
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

export default ProjectDetailPage;
