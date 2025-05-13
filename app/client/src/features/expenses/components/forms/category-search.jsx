import { setCategoriesFilters, clearCategoriesFilters } from "@features/expenses/redux/slice";
import { Box, Button, Card, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";

function CategorySearchForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setCategoriesFilters(values));
    setSubmitting(false);
  };

  const clearFilters = resetForm => {
    resetForm();
    dispatch(clearCategoriesFilters());
  }

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, resetForm, isSubmitting }) => (
          <Box
            component={Form}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
          <TextField
            size="small"
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="disabled"
                type="button"
                disabled={isSubmitting}
                onClick={() => clearFilters(resetForm)}
              >
                Clear
              </Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Apply
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Card>
  );
}

export default CategorySearchForm;
