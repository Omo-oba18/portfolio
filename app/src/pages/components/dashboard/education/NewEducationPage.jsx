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
import { createEducation } from "../../../../slices/education/thunk/create-education";
import { Page } from "../../../../core/components";
import { PATH_DASHBOARD } from "../../../../routes/paths";

import { getAuthState } from "../../../../slices/auth/authSlice";
import { EducationSchema } from "../../../../utils/validation";
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

const NewEducationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector(getAuthState);

  const formik = useFormik({
    initialValues: {
      degree: "",
      institution: "",
      graduationYear: "",
    },
    validationSchema: EducationSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(createEducation(values))
        .unwrap()
        .then(() => {
          resetForm();
          navigate(`${PATH_DASHBOARD}`);
        })
        .catch((error) => {
          resetForm();
          setSubmitting(false);
          setErrors({
            afterSubmit:
              errorMessage?.code || "Failed to create education, try again!",
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

  const isSubmitDisabled =
    !values.degree ||
    !values.graduationYear ||
    !values.institution ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  return (
    <Root title="New Education | Dashboard">
      <Container>
        <Content>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit}</Alert>
              )}

              <Stack spacing={5}>
                <Typography variant="h3">Education Creator</Typography>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Degree"
                    {...getFieldProps("degree")}
                    error={Boolean(touched.degree && errors.degree)}
                    helperText={touched.degree && errors.degree}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Institution name"
                    {...getFieldProps("institution")}
                    error={Boolean(touched.institution && errors.institution)}
                    helperText={touched.institution && errors.institution}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Graduation year"
                    {...getFieldProps("graduationYear")}
                    error={Boolean(
                      touched.graduationYear && errors.graduationYear
                    )}
                    helperText={touched.graduationYear && errors.graduationYear}
                  />
                </Stack>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitDisabled}
                >
                  Create Education
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </Content>
      </Container>
    </Root>
  );
};

export default NewEducationPage;
