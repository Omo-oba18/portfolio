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
import { createSkill } from "../../../../slices/skill/thunk/create-skill";
import { Page } from "../../../../core/components";
import { PATH_DASHBOARD } from "../../../../routes/paths";

import { getAuthState } from "../../../../slices/auth/authSlice";
import { SkillSchema } from "../../../../utils/validation";

const NewSkillPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector(getAuthState);

  const formik = useFormik({
    initialValues: {
      name: "",
      key: "",
      proficiency: "",
      description: "",
    },
    validationSchema: SkillSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(createSkill(values))
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
            afterSubmit: errorMessage || "Failed to create skill, try again!",
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
    !values.name ||
    !values.description ||
    !values.proficiency ||
    !values.key ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  return (
    <Page className={classes.root} title="New Skill | Dashboard">
      <Container>
        <div className={classes.content}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit}</Alert>
              )}

              <Stack spacing={5}>
                <Typography variant="h3">Skill Creator</Typography>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Skill Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Skill Key"
                    {...getFieldProps("key")}
                    error={Boolean(touched.key && errors.key)}
                    helperText={touched.key && errors.key}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Skill proficiency"
                    {...getFieldProps("proficiency")}
                    error={Boolean(touched.proficiency && errors.proficiency)}
                    helperText={touched.proficiency && errors.proficiency}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    label="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    multiline
                    rows={5}
                  />
                </Stack>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitDisabled}
                >
                  Create Skill
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </div>
      </Container>
    </Page>
  );
};

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

export default NewSkillPage;
