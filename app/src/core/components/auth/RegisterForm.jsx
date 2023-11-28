import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAuthState } from "../../../slices/auth/authSlice";
import { PATH_AUTH } from "../../../routes/paths";
import { registerUser } from "../../../slices/auth/thunk/register";
import { RegisterSchema } from "../../../utils/validation";

export function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(getAuthState);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          resetForm();
          navigate(`${PATH_AUTH.login}`);
        })
        .catch((error) => {
          setSubmitting(false);
          setErrors({
            afterSubmit:
              errorMessage || "Failed to register, you should try again!",
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
    !values.name ||
    !values.phone ||
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
            autoComplete="name"
            type="text"
            label="Full name"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="phone"
            type="phone"
            label="Phone number"
            {...getFieldProps("phone")}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
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

        <Button
          sx={{ my: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isSubmitDisabled}
        >
          Register
        </Button>
      </Form>
    </FormikProvider>
  );
}
