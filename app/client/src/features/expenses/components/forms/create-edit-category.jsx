import { createCategory } from "@features/expenses/api/create-category";
import { editCategory } from "@features/expenses/api/edit-category";
import { getCategories } from "@features/expenses/api/get-categories";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { MuiColorInput } from "mui-color-input";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name must not be empty!")
    .min(1, "Name must be between 1 and 100 characters long!")
    .max(100, "Name must be between 1 and 100 characters long!"),
  color: Yup.string()
    .required("Color must not be empty!"),
});

function CreateEditCategoryForm({
  isEdit,
  categoryId,
  setShowCreateEditCategoryPanel,
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const categories = useSelector((state) => state.expenses.categories.data);
  const category = categories.find(e => e._id === categoryId);

  const hideCreateEditCategoyPanel = () => {
    setShowCreateEditCategoryPanel(false);
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, color } = values;
    await dispatch(
      isEdit ?
        editCategory({
          userId: user._id,
          categoryId,
          name, color,
        }) :
        createCategory({
          userId: user._id,
          name, color,
        })
    );
    dispatch(
      getCategories({
        userId: user._id,
      })
    );
    setSubmitting(false);
  };

  return (!isEdit || category) && (
    <Formik
      enableReinitialize
      initialValues={{
        name: isEdit ? category.name : "",
        color: isEdit ? category.color : "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {
            touched.name && errors.name &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
            >
              {errors.name}
            </Typography>
          }
          <MuiColorInput
            fullWidth
            label="Color"
            name="color"
            format="hex"
            value={values.color}
            onChange={value => setFieldValue("color", value)}
            sx={{ mt: 2 }}
          />
          {
            touched.color && errors.color &&
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1 }}
            >
              {errors.color}
            </Typography>
          }
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="disabled"
              type="button"
              disabled={isSubmitting}
              onClick={hideCreateEditCategoyPanel}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isEdit ? "Edit" : "Create"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default CreateEditCategoryForm;
