import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../../../slices/project/thunk/create-project";
import { Page } from "../../../../core/components";
import { PATH_DASHBOARD } from "../../../../routes/paths";

import { getAuthState } from "../../../../slices/auth/authSlice";
import { ProjectSchema } from "../../../../utils/validation";
import TechnologySelector from "../../../../core/components/TechnologySelector";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const Content = styled(Page)(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
const Root = styled(Page)(({ theme }) => ({
  textAlign: "center",
  paddingBottom: theme.spacing(5),
  backgroundImage: `linear-gradient(180deg, ${alpha(
    theme.palette.grey[300],
    0
  )} 40%, ${theme.palette.grey[300]} 100%)`,
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));
const NewProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector(getAuthState);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      images: [],
    },
    validationSchema: ProjectSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        // Create a JSON object to send to the backend
        const projectData = {
          title: values.title,
          description: values.description,
          technologies: values.technologies,
          githubLink: values.githubLink,
          images: values.images,
        };

        // Dispatch the createProject action with the projectData object
        dispatch(createProject(projectData))
          .unwrap()
          .then(() => {
            resetForm();
            navigate(`${PATH_DASHBOARD.project}`);
            setSelectedTechnologies([]);
          })
          .catch((error) => {
            resetForm();
            setSubmitting(false);
            setErrors({
              afterSubmit:
                errorMessage?.code || "Failed to create project, try again!",
            });
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleTechnologySelectChange = (selectedTechnologies) => {
    formik.setFieldValue(
      "technologies",
      selectedTechnologies.map((tech) => tech.label)
    );
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const base64Images = [];

    // Iterate through selected files and convert to base64
    for (const file of files) {
      const reader = new FileReader();

      // Read file as data URL (base64)
      reader.readAsDataURL(file);

      // Wait for the reader to load the file
      await new Promise((resolve) => {
        reader.onload = () => {
          base64Images.push(reader.result); // Push the base64-encoded image to the array
          resolve();
        };
      });
    }

    formik.setFieldValue("images", base64Images);
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

  const isSubmitDisabled =
    !values.title ||
    !values.description ||
    !values.githubLink ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  return (
    <Root title="New Project | Dashboard">
      <Container>
        <Content>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit}</Alert>
              )}

              <Stack spacing={5}>
                <Typography variant="h3">Project Creator</Typography>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Project name"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Project Github or Gitlab URL"
                    {...getFieldProps("githubLink")}
                    error={Boolean(touched.githubLink && errors.githubLink)}
                    helperText={touched.githubLink && errors.githubLink}
                  />
                  <TechnologySelector
                    onTechnologySelectChange={handleTechnologySelectChange}
                    selectedTechnologies={selectedTechnologies}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Brief description..."
                    rows={5}
                    multiline
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </Stack>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitDisabled}
                >
                  Create Project
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Content>
      </Container>
    </Root>
  );
};

export default NewProjectPage;
