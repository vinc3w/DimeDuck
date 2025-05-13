import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import { sendUserPasswordResetEmail } from "@features/auth/api/send-user-password-reset-email";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email must not be empty!"),
});

function ForgotPasswordForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(sendUserPasswordResetEmail(values));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
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
            sx={{ mb: 2 }}
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
              sx={{ mb: 2 }}
            >
              {errors.email}
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
            Request Email
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
