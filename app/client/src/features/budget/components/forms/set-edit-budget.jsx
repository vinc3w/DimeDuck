import { editBudget } from "@features/budget/api/edit-budget";
import { setBudget } from "@features/budget/api/set-budget";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Form, Formik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount must not be empty!")
    .moreThan(0, "Amount must be more than 0!")
    .max(1_000_000, "Amount must less than 1,000,000!"),
  startDate: Yup.string().required("Date must not be empty!"),
});

function SetEditBudgetForm({
  isEdit,
  setShowSetEditBudgetPanel,
}) {
  const user = useSelector(state => state.auth.user);
  const budget = useSelector(state => state.budget.budget.data);
  const dispatch = useDispatch();


  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(
      isEdit ? 
        editBudget({
          userId: user._id,
          ...values,
        }) :
        setBudget({
          userId: user._id,
          ...values,
        }) 
    );
    setSubmitting(false);
  }

  const hideSetEditBudgetPanel = () => {
    setShowSetEditBudgetPanel(false);
  }

  return (
    <Formik
      initialValues={{
        amount: budget?.amount || 0,
        startDate: budget ? moment(budget.startDate) : moment(),
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, touched, errors, handleChange, isSubmitting }) => (
        <Form>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={values.amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /\d+/.test(value) && value >= 0) {
                handleChange(e);
              }
            }}
          />
          {touched.amount && errors.amount && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.amount}
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              size="small"
              label="Start Date"
              name="startDate"
              value={values.startDate}
              onChange={value => setFieldValue("startDate", value)}
              sx={{
                mt: 2,
                width: "100%",
              }}
            />
          </LocalizationProvider>
          {touched.startDate && errors.startDate && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.startDate}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="disabled"
              type="button"
              disabled={isSubmitting}
              onClick={hideSetEditBudgetPanel}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              {isEdit ? "Edit" : "Set"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default SetEditBudgetForm;
