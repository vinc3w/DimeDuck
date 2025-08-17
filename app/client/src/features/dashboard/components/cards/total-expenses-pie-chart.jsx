import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonetizationOn } from "@mui/icons-material";
import { getTotalExpensesPieChart } from "@features/dashboard/api/get-total-expenses-pie-chart";
import { PieChart } from "@mui/x-charts";

function TotalExpensesPieChartCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isTotalExpensesPieChartLoading = useSelector(state => state.dashboard.totalExpensesPieChart.isLoading);
  const pieChartData = useSelector(state => state.dashboard.totalExpensesPieChart.data);
  const filters = useSelector(state => state.dashboard.filters);

  useEffect(() => {
    dispatch(
      getTotalExpensesPieChart({
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
        gap: 4,
        height: "420px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
        }}
      >
        <MonetizationOn />
        <Typography variant="body2" sx={{ color: "var(--disabled)" }}>Total Expenses by Category</Typography>
      </Box>
      {
        isTotalExpensesPieChartLoading ? <Skeleton height={300} width="100%" /> : (
          <PieChart
            series={[
              {
                data: pieChartData.map((pc, i) => ({
                  id: i,
                  value: pc.totalExpenses,
                  label: pc.name,
                })),
              },
            ]}
            height={300}
          />
        )
      }
    </Card>
  );
}

export default TotalExpensesPieChartCard;
