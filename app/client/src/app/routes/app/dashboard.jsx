import AvailableCard from "@features/dashboard/components/cards/available";
import DayToExpensesLineChart from "@features/dashboard/components/cards/day-to-expenses-line-chart";
import FilterCard from "@features/dashboard/components/cards/filter";
import NoOfExpensesCard from "@features/dashboard/components/cards/no-of-expenses";
import TopExpensesCard from "@features/dashboard/components/cards/top-expenses";
import TotalExpensesCard from "@features/dashboard/components/cards/total-expenses";
import TotalExpensesPieChartCard from "@features/dashboard/components/cards/total-expenses-pie-chart";
import WelcomeCard from "@features/dashboard/components/cards/welcome";
import { Box, Grid } from "@mui/material";

function DashboardRoute() {
  return (
    <Grid container spacing={2}>
      <Grid size={12} mb={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <WelcomeCard />
          <FilterCard />
        </Box>
      </Grid>
      <Grid size={4}>
        <AvailableCard />
      </Grid>
      <Grid size={4}>
        <NoOfExpensesCard />
      </Grid>
      <Grid size={4}>
        <TotalExpensesCard />
      </Grid>
      <Grid size={6}>
        <TotalExpensesPieChartCard />
      </Grid>
      <Grid size={6}>
        <TopExpensesCard />
      </Grid>
      <Grid size={12}>
        <DayToExpensesLineChart />
      </Grid>
    </Grid>
  );
}

export default DashboardRoute;
