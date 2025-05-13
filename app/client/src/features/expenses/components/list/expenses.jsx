import { exportAllExpenses } from "@features/expenses/api/export-all-expenses";
import { getCategories } from "@features/expenses/api/get-categories";
import { getExpenses } from "@features/expenses/api/get-expenses";
import ExpenseSearchForm from "@features/expenses/components/forms/expense-search";
import CreateEditCategoryPanel from "@features/expenses/components/panels/create-edit-category";
import CreateEditExpensePanel from "@features/expenses/components/panels/create-edit-expense";
import ExpensesTable from "@features/expenses/components/tables/expenses";
import { Add, Download } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ExpensesList() {
  const dispatch = useDispatch();
  const totalExpenses = useSelector(state => state.expenses.expenses.total);
  const filters = useSelector(state => state.expenses.filters.expenses);
  const user = useSelector(state => state.auth.user);
  const [showCreateEditExpensePanel, setShowCreateEditExpensePanel] = useState(false);
  const [showCreateEditCategoryPanel, setShowCreateEditCategoryPanel] = useState(false);

  const displayCreateEditExpensePanel = () => {
    setShowCreateEditExpensePanel(true);
  }

  const exportAll = async () => {
    const action = await dispatch(
      exportAllExpenses({
        userId: user._id,
      })
    );
    const url = window.URL.createObjectURL(new Blob([action.payload]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }

  useEffect(() => {
    dispatch(
      getCategories({
        userId: user._id,
      })
    );
  }, [])

  useEffect(() => {
    dispatch(
      getExpenses({
        userId: user._id,
        ...filters,
      })
    );
  }, [filters])
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ExpenseSearchForm />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "var(--disabled)" }}>({totalExpenses} Results)</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={exportAll}
            sx={{ mr: 1 }}
          >
            Export All
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={displayCreateEditExpensePanel}
          >
            Expense
          </Button>
        </Box>
      </Box>
      <ExpensesTable />
      <CreateEditExpensePanel
        showCreateEditExpensePanel={showCreateEditExpensePanel}
        setShowCreateEditExpensePanel={setShowCreateEditExpensePanel}
        setShowCreateEditCategoryPanel={setShowCreateEditCategoryPanel}
      />
      <CreateEditCategoryPanel
        showCreateEditCategoryPanel={showCreateEditCategoryPanel}
        setShowCreateEditCategoryPanel={setShowCreateEditCategoryPanel}
      />
    </Box>
  );
}

export default ExpensesList;
