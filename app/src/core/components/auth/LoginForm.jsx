import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { getAuthState } from "../../../slices/auth/authSlice";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { loginUser } from "../../../slices/auth/thunk/login";
import { LoginSchema } from "../../../utils/validation";
export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(getAuthState);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(loginUser(values))
        .unwrap()
        .then(() => {
          resetForm();
          navigate(`${PATH_DASHBOARD}`);
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

  const {
    errors,
    touched,
    values,
    handleSubmit,
    getFieldProps,
    dirty,
    isSubmitting,
  } = formik;

  const handleShowPassword = () => setShowPassword((show) => !show);

  const isSubmitDisabled =
    !values.email ||
    !values.password ||
    !dirty ||
    !!Object.keys(errors).length ||
    isSubmitting;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="">
            Forgot password?
          </Link>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitDisabled}
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
