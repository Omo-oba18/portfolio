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
import { makeStyles } from "@mui/styles";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createEducation } from "../../../../slices/education/thunk/create-education";
import { Page } from "../../../../core/components";
import { PATH_DASHBOARD } from "../../../../routes/paths";

import { getAuthState } from "../../../../slices/auth/authSlice";
import { EducationSchema } from "../../../../utils/validation";

export default function NewEducationPage() {
  const classes = useStyles();
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
          setSubmitting(true);
          navigate(`${PATH_DASHBOARD}`);
        })
        .catch((error) => {
          resetForm();
          setSubmitting(false);
          setErrors({
            afterSubmit:
              errorMessage || "Failed to create education, try again!",
          });
        });
    },
  });
  // const handleUpdateItems = (updatedItems) => {
  //   formik.setFieldValue("proficiency", updatedItems);
  // };

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
    !values.institution ||
    !values.graduationYear ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  return (
    <Page className={classes.root} title="New Education | Dashboard">
      <Container>
        <div className={classes.content}>
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
                    label="Education Degree"
                    {...getFieldProps("degree")}
                    error={Boolean(touched.degree && errors.degree)}
                    helperText={touched.degree && errors.degree}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Education institution"
                    {...getFieldProps("institution")}
                    error={Boolean(touched.institution && errors.institution)}
                    helperText={touched.institution && errors.institution}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Education graduation year"
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
        </div>
      </Container>
    </Page>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingBottom: theme.spacing(5),
    backgroundImage: `linear-gradient(180deg, ${alpha(
      theme.palette.grey[300],
      0
    )} 40%, ${theme.palette.grey[300]} 100%)`,
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  content: {
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  },
  infoBar: {
    marginBottom: theme.spacing(3),
  },
}));
