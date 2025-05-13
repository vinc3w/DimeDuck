import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SsidChart } from "@mui/icons-material";
import { getDayToExpensesLineChart } from "@features/dashboard/api/get-day-to-expenses-line-chart";
import { LineChart } from "@mui/x-charts";

function DayToExpensesLineChart() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isDataLoading = useSelector(state => state.dashboard.dayToExpensesLineChart.isLoading);
  const data = useSelector(state => state.dashboard.dayToExpensesLineChart.data);
  const currency = useSelector(state => state.settings.currency);
  const filters = useSelector(state => state.dashboard.filters);

  useEffect(() => {
    dispatch(
      getDayToExpensesLineChart({
        userId: user._id,
        ...filters,
      })
    );
  }, [filters]);

  return (
    <Card
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <SsidChart />
        <Typography variant="body2" sx={{ color: "var(--disabled)" }}>Total Expenses</Typography>
      </Box>
      {
        isDataLoading ? <Skeleton height={300} width="100%" /> : (
          <LineChart
            xAxis={[{
              scaleType: "point",
              data: Object.keys(data),
              tickLabelStyle: {
                fontSize: 12,
              }
            }]}
            yAxis={[{
              label: `Expenses (${currency})`
            }]}
            series={[{ data: Object.values(data) }]}
            height={300}
          />
        )
      }
    </Card>
  );
}

export default DayToExpensesLineChart;
