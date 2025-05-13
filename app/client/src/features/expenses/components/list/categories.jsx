import { getCategories } from "@features/expenses/api/get-categories";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySearchForm from "../forms/category-search";
import CategoriesTable from "../tables/categories";
import CreateEditCategoryPanel from "../panels/create-edit-category";

function CategoriesList() {
  const dispatch = useDispatch();
  const totalCategories = useSelector(state => state.expenses.categories.total);
  const filters = useSelector(state => state.expenses.filters.categories);
  const user = useSelector(state => state.auth.user);
  const [showCreateCategoryPanel, setShowCreateCategoryPanel] = useState(false);

  const displayCreateExpensePanel = () => {
    setShowCreateCategoryPanel(true);
  }

  useEffect(() => {
    dispatch(
      getCategories({
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
      <CategorySearchForm />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "var(--disabled)" }}>({totalCategories} Results)</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={displayCreateExpensePanel}
        >
          Category
        </Button>
      </Box>
      <CategoriesTable />
      <CreateEditCategoryPanel
        showCreateEditCategoryPanel={showCreateCategoryPanel}
        setShowCreateEditCategoryPanel={setShowCreateCategoryPanel}
      />
    </Box>
  );
}

export default CategoriesList;
