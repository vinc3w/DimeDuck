import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import { setExpensesFilters, clearExpensesFilters } from "@features/expenses/redux/slice";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

function ExpenseSearchForm() {
  const categories = useSelector((state) => state.expenses.categories.data);
  const isCategoryLoading = useSelector((state) => state.expenses.categories.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setExpensesFilters(values));
    setSubmitting(false);
  };

  const clearFilters = resetForm => {
    resetForm();
    dispatch(clearExpensesFilters());
  }

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Formik
        initialValues={{
          name: "",
          minAmount: "",
          maxAmount: "",
          categories: [],
          dateStart: null,
          dateEnd: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue, resetForm, isSubmitting }) => (
          <Box
            component={Form}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              // flexWrap: "wrap",
              columnGap: 1,
              rowGap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <TextField
                size="small"
                label="Name"
                name="name"
                onChange={handleChange}
              />
              <TextField
                size="small"
                label="Min Amount"
                name="minAmount"
                type="number"
                value={values.minAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /\d+/.test(value) && value >= 0) {
                    handleChange(e);
                  }
                }}
              />
              <TextField
                size="small"
                label="Max Amount"
                name="maxAmount"
                type="number"
                value={values.maxAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /\d+/.test(value) && value >= 0) {
                    handleChange(e);
                  }
                }}
              />
              <FormControl sx={{ width: "200px" }}>
                <InputLabel id="category-select-label" size="small">Category</InputLabel>
                <Select
                  multiple
                  labelId="category-select-label"
                  label="Category"
                  name="categories"
                  input={<OutlinedInput label="Name" size="small" />}
                  value={values.categories}
                  onChange={e => {
                    const selectedAll = e.target.value.includes("all");
                    if (selectedAll) {
                      if (values.categories.length === categories.length) {
                        setFieldValue("categories", []);
                      } else {
                        setFieldValue("categories", categories.map(i => i._id));
                      }
                    } else {
                      handleChange(e);
                    }
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={categories.find(i => i._id === value).name} />
                      ))}
                    </Box>
                  )}
                >
                  {
                    isCategoryLoading ?
                    <CenteredCircularProgress styles={{ p: 2 }} /> :
                    [
                      <MenuItem value="all" sx={{ px: 2 }}>
                        <Checkbox checked={values.categories.length === categories.length} sx={{ p: 0, pr: 1 }} />
                        <ListItemText primary="All" />
                      </MenuItem>,
                      <Divider />,
                      categories.map((c, i) => (
                        <MenuItem value={c._id} key={i} sx={{ px: 2 }}>
                          <Checkbox checked={values.categories.includes(c._id)} sx={{ p: 0, pr: 1 }} />
                          <ListItemText primary={c.name} />
                        </MenuItem>
                      )),
                    ]
                  }
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  size="small"
                  label="Start"
                  name="dateStart"
                  value={values.dateStart}
                  onChange={value => setFieldValue("dateStart", value)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: "200px" }}
                />
                <DatePicker
                  size="small"
                  label="End"
                  name="dateEnd"
                  value={values.dateEnd}
                  onChange={value => setFieldValue("dateEnd", value)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: "200px" }}
                />
              </LocalizationProvider>
            </Box>
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

export default ExpenseSearchForm;
