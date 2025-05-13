import { Backdrop, Card, Typography } from "@mui/material";
import CreateEditCategoryForm from "@features/expenses/components/forms/create-edit-category";

function CreateEditCategoryPanel({
  isEdit,
  categoryId,
  showCreateEditCategoryPanel,
  setShowCreateEditCategoryPanel,
}) {
  return (
    <Backdrop aria-hidden="false" open={showCreateEditCategoryPanel} sx={{ zIndex: 1000 }}>
      <Card
        sx={{
          p: 2,
          width: "450px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {isEdit ? "Edit" : "Create"} Expense Category
        </Typography>
        <CreateEditCategoryForm
          isEdit={isEdit}
          categoryId={categoryId}
          setShowCreateEditCategoryPanel={setShowCreateEditCategoryPanel}
        />
      </Card>
    </Backdrop>
  );
}

export default CreateEditCategoryPanel;
