import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import { createExpense } from "@features/expenses/api/create-expense";
import { editExpense } from "@features/expenses/api/edit-expense";
import { getExpenses } from "@features/expenses/api/get-expenses";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moment from "moment";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name must not be empty!")
    .min(1, "Name must be between 1 and 100 characters long!")
    .max(100, "Name must be between 1 and 100 characters long!"),
  amount: Yup.number()
    .required("Amount must not be empty!")
    .moreThan(0, "Amount must be more than 0!")
    .max(1_000_000, "Amount must less than 1,000,000!"),
  category: Yup.string().required("Category must not be empty!"),
  date: Yup.string().required("Date must not be empty!"),
  note: Yup.string().max(500, "Note must be at most 500 characters long!"),
});

function CreateEditExpenseForm({
  isEdit,
  expenseId,
  setShowCreateEditExpensePanel,
  setShowCreateEditCategoryPanel,
}) {
  const dispatch = useDispatch();
  const [currentDate] = useState(moment());
  const [closeMenu, setCloseMenu] = useState(false);
  const expenses = useSelector((state) => state.expenses.expenses.data);
  const user = useSelector((state) => state.auth.user);
  const isCategoryLoading = useSelector(
    (state) => state.expenses.categories.isLoading
  );
  const categories = useSelector((state) => state.expenses.categories.data);
  const expense = expenses.find(e => e._id === expenseId);

  const hideCreateExpensePanel = () => {
    setShowCreateEditExpensePanel(false);
  };

  const displayCreateCategoryPanel = () => {
    setCloseMenu(false);
    setShowCreateEditCategoryPanel(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, amount, category, date, note } = values;
    await dispatch(
      isEdit ? editExpense({
          userId: user._id,
          categoryId: category,
          expenseId, name, amount, date, note,
        }) : createExpense({
          userId: user._id,
          categoryId: category,
          name, amount, date, note,
        })
    );
    dispatch(
      getExpenses({
        userId: user._id,
      })
    );
    setSubmitting(false);
  };

  return (!isEdit || expense) && (
    <Formik
      enableReinitialize
      initialValues={{
        name: isEdit ? expense.name : "",
        amount: isEdit ? expense.amount : 0,
        category: isEdit ? (expense.category?._id || "none") : "",
        date: isEdit ? moment(expense.date) : currentDate,
        note: isEdit ? expense.note : "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue, touched, errors, isSubmitting }) => (
        <Form>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.name}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={values.amount}
            sx={{ mt: 2 }}
            onChange={(e) => {
              const value = e.target.value;
              if (/\d+/.test(value) && value >= 0) {
                handleChange(e);
              }
            }}
          />
          {touched.amount && errors.amount && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.amount}
            </Typography>
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              label="Category"
              name="category"
              value={values.category}
              onChange={e => {
                // handleChange(e)
                setFieldValue("category", e.target.value);
              }}
              open={closeMenu}
              onOpen={() => setCloseMenu(true)}
              onClose={() => setCloseMenu(false)}
            >
              {
                isCategoryLoading ?
                  <CenteredCircularProgress styles={{ p: 2, pb: 3 }} /> :
                  [
                    categories.map((c, i) => (
                      <MenuItem value={c._id} key={i}>
                        {c.name}
                      </MenuItem>
                    )),
                    <MenuItem value="none">None</MenuItem>,
                    <Divider />,
                  ]
              }
              <Box sx={{ mx: 1, mt: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={displayCreateCategoryPanel}
                >
                  Create category
                </Button>
              </Box>
            </Select>
          </FormControl>
          {touched.category && errors.category && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.category}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Date"
              name="date"
              value={values.date}
              onChange={value => setFieldValue("date", value)}
              sx={{
                mt: 2,
                width: "100%",
              }}
            />
          </LocalizationProvider>
          {touched.date && errors.date && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.date}
            </Typography>
          )}
          <TextField
            fullWidth
            multiline
            minRows={6}
            maxRows={6}
            label="Note"
            name="note"
            value={values.note}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          {touched.note && errors.note && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.note}
            </Typography>
          )}
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
              onClick={hideCreateExpensePanel}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isEdit ? "Edit" : "Create"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default CreateEditExpenseForm;
