import { setDashboardFilters } from "@features/dashboard/redux/slice";
import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Formik, Form } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

function FilterForm() {
  const filters = useSelector(state => state.dashboard.filters);
  const dispatch = useDispatch();

  const setFilters = ({ dateStart, dateEnd }) => {
    dispatch(setDashboardFilters({
      dateStart: moment(dateStart).format("YYYY-MM-DD"),
      dateEnd: moment(dateEnd).format("YYYY-MM-DD"),
    }));
  }

  return (
    <Formik
      initialValues={{
        dateStart: moment(filters.dateStart),
        dateEnd: moment(filters.dateEnd),
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                size="small"
                label="Start"
                name="dateStart"
                value={values.dateStart}
                onChange={value => {
                  setFieldValue("dateStart", value);
                  setFilters({
                    ...values,
                    dateStart: value,
                  });
                }}
                slotProps={{ textField: { size: "small" } }}
                sx={{ width: "200px" }}
              />
              <DatePicker
                size="small"
                label="End"
                name="dateEnd"
                value={values.dateEnd}
                onChange={value => {
                  setFieldValue("dateEnd", value);
                  setFilters({
                    ...values,
                    dateEnd: value,
                  });
                }}
                slotProps={{ textField: { size: "small" } }}
                sx={{ width: "200px" }}
              />
            </LocalizationProvider>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FilterForm;
