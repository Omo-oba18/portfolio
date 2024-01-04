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
import { createSkill } from "../../../../slices/skill/thunk/create-skill";
import { Page } from "../../../../core/components";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { SkillSchema } from "../../../../utils/validation";
import { getSkillState, resetState } from "../../../../slices/skill/skillSlice";
import { useEffect, useState } from "react";
import { LoadingPage } from "../../../LoadingPage";
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

const NewSkillPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, isSuccess, isError, isLoading } =
    useSelector(getSkillState);
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
    if (isSuccess) {
      showAlertForDuration(3000);
    } else if (isError) {
      showAlertForDuration(5000);
    }
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      proficiency: "",
      description: "",
    },
    validationSchema: SkillSchema,
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(createSkill(values))
        .unwrap()
        .then(() => {
          resetForm();

          navigate(`${PATH_DASHBOARD}`);
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
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;

  if (isLoading) return <LoadingPage />;
  return (
    <Root title="New Skill | Dashboard">
      <Container>
        <Content>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {isError && showAlert && (
                <Alert severity="error" onClose={() => setShowAlert(false)}>
                  {errorMessage}
                </Alert>
              )}
              {isSuccess && showAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)}>
                  Skill saved successfully
                </Alert>
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
        </Content>
      </Container>
    </Root>
  );
};

export default NewSkillPage;
