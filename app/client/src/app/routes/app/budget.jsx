import AvailableCard from "@features/budget/components/cards/available";
import BudgetCard from "@features/budget/components/cards/budget";
import SpentTodayCard from "@features/budget/components/cards/spent-today";
import TodayExpensesCard from "@features/budget/components/cards/today-expenses";
import SetEditBudgetPanel from "@features/budget/components/panels/set-edit-budget";
import { ErrorOutline } from "@mui/icons-material";
import { Alert, Box, Button, Collapse, Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

function BudgetsRoute() {
  const [showNoBudgetAlert, setShowNoBudgetAlert] = useState(false);
  const [showSetBudgetPanel, setShowSetBudgetPanel] = useState(false);
  const isBudgetLoading = useSelector(state => state.budget.budget.isLoading);
  const budget = useSelector(state => state.budget.budget.data);
  
  return (
    <Box>
      <Collapse in={showNoBudgetAlert}>
        <Alert
          icon={<ErrorOutline />}
          severity="warning"
          action={
            <Button size="small" onClick={() => setShowSetBudgetPanel(true)}>Set</Button>
          }
          sx={{ mb: 2 }}
        >
          You do not have a budget set.
        </Alert>
      </Collapse>
      <Grid container spacing={2}>
        <Grid size={4}>
          <AvailableCard />
        </Grid>
        <Grid size={4}>
          <BudgetCard setShowNoBudgetAlert={setShowNoBudgetAlert} />
        </Grid>
        <Grid size={4}>
          <SpentTodayCard />
        </Grid>
        <Grid size={12}>
          <TodayExpensesCard />
        </Grid>
      </Grid>
      {
        !isBudgetLoading &&
        <SetEditBudgetPanel
          showSetEditBudgetPanel={showSetBudgetPanel}
          setShowSetEditBudgetPanel={setShowSetBudgetPanel}
        />
      }
    </Box>
  );
}

export default BudgetsRoute;
