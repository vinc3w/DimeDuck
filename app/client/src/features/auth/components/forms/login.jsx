import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logInUser } from "@features/auth/api/log-in-user";
import { addFlashMessage } from "@features/flash-messages/redux/slice";
import { Form, Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link, TextField, Typography } from "@mui/material";
import SensitiveTextField from "@components/ui/sensitive-text-field";
import * as Yup from "yup";
import { FORGOT_PASSWORD } from "@app/config/routes";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email must not be empty!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Password must be at most 50 characters long!")
    .required("Password must not be empty!"),
});

function LoginForm() {
  const [cookies, setUserToken] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const action = await dispatch(logInUser(values));
    if (!action.error) {
      setUserToken("token", action.payload.token);
      navigate("/dashboard", { replace: true });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form>
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            type="text"
            name="email"
            label="Email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
          {
            touched.email && errors.email &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1 }}
            >
              {errors.email}
            </Typography>
          }
          <SensitiveTextField
            fullWidth
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          {
            touched.password && errors.password &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
            >
              {errors.password}
            </Typography>
          }
          <Link
            component={RouterLink}
            variant="body2"
            sx={{
              display: "block",
              my: 2,
              textAlign: "right",
            }}
            to={FORGOT_PASSWORD}
            underline="none"
          >
            Forgot password?
          </Link>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
