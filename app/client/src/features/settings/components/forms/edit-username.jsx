import { useDispatch } from "react-redux";
import { editUsername } from "@features/settings/api/edit-username";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  newUsername: Yup.string()
    .min(5, "Username must be between 5 and 20 characters long!")
    .max(20, "Username must be between 5 and 20 characters long!")
    .required("Username must not be empty!"),
});

function EditUsernameForm({
  user,
  setShowEditUsernamePanel,
}) {
  const dispatch = useDispatch();

  const hideEditUsernamePanel = () => {
    setShowEditUsernamePanel(false);
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(
      editUsername({
        userId: user._id,
        newUsername: values.newUsername,
      })
    );
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ newUsername: user.username }}
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
            fullWidth
            variant="outlined"
            type="text"
            name="newUsername"
            label="New Username"
            autoComplete="username"
            value={values.newUsername}
            onChange={handleChange}
          />
          {
            touched.newUsername && errors.newUsername&&
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
            >
              {errors.newUsername}
            </Typography>
          }
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="disabled"
              type="button"
              disabled={isSubmitting}
              onClick={hideEditUsernamePanel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default EditUsernameForm;
