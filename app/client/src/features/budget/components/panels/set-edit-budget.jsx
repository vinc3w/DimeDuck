import { Backdrop, Card, Typography } from "@mui/material";
import SetEditBudgetForm from "../forms/set-edit-budget";

function SetEditBudgetPanel({
  isEdit,
  showSetEditBudgetPanel,
  setShowSetEditBudgetPanel,
}) {
  return (
    <Backdrop aria-hidden="false" open={showSetEditBudgetPanel} sx={{ zIndex: 1000 }}>
      <Card
        sx={{
          maxWidth: "300px",
          minWidth: "300px",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {isEdit ? "Edit" : "Set"} Budget
        </Typography>
        <SetEditBudgetForm
          isEdit={isEdit}
          setShowSetEditBudgetPanel={setShowSetEditBudgetPanel}
        />
      </Card>
    </Backdrop>
  );
}

export default SetEditBudgetPanel;
