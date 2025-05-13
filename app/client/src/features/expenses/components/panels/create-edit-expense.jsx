import { Backdrop, Card, Typography } from "@mui/material";
import CreateEditExpenseForm from "../forms/create-edit-expense";

function CreateEditExpensePanel({
  isEdit=false,
  expenseId,
  showCreateEditExpensePanel,
  setShowCreateEditExpensePanel,
  setShowCreateEditCategoryPanel,
}) {
  return (
    <Backdrop aria-hidden="false" open={showCreateEditExpensePanel} sx={{ zIndex: 1000 }}>
      <Card
        sx={{
          p: 2,
          width: "450px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {isEdit ? "Edit" : "Create"} Expense
        </Typography>
        <CreateEditExpenseForm
          isEdit={isEdit}
          expenseId={expenseId}
          setShowCreateEditExpensePanel={setShowCreateEditExpensePanel}
          setShowCreateEditCategoryPanel={setShowCreateEditCategoryPanel}  
        />
      </Card>
    </Backdrop>
  );
}

export default CreateEditExpensePanel;
