import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@features/auth/api/register-user";
import { Form, Formik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import SensitiveTextField from "@components/ui/sensitive-text-field";
import { getIPInfo } from "@app/api/get-ip-info";
import countries from "@assets/json/countries";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Username must be between 5 and 20 characters long!")
    .max(20, "Username must be between 5 and 20 characters long!")
    .required("Username must not be empty!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email must not be empty!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Password must be at most 50 characters long!")
    .required("Password must not be empty!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const ipInfoAction = await dispatch(getIPInfo());
    const { country } = ipInfoAction.payload;
    const action = await dispatch(
      registerUser({
        ...values,
        currency: countries.find(c => c.countryCode === country).currencyCode,
      })
    );
    if (!action.error) {
      navigate("/login", { replace: true });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            name="username"
            label="Username"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
          />
          {
            touched.username && errors.username &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1 }}
            >
              {errors.username}
            </Typography>
          }
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
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
          />
          {
            touched.password && errors.password &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1 }}
            >
              {errors.password}
            </Typography>
          }
          <SensitiveTextField
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {
            touched.confirmPassword && errors.confirmPassword &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1 }}
            >
              {errors.confirmPassword}
            </Typography>
          }
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
