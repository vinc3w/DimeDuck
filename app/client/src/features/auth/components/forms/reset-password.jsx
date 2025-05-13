import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { Button, Typography } from "@mui/material";
import SensitiveTextField from "@components/ui/sensitive-text-field";
import * as Yup from "yup";
import { resetUserPassword } from "@features/auth/api/reset-user-password";

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long!")
    .max(50, "Password must be at most 50 characters long!")
    .required("Password must not be empty!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const action = await dispatch(
      resetUserPassword({
        ...values,
        token: searchParams.get("token"),
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
            sx={{ py: 1 }}
          >
            Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPasswordForm;
