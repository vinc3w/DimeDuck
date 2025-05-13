import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import { setCategoriesFilters } from "@features/expenses/redux/slice";
import { ArrowDropDown, ArrowDropUp, MoreVert } from "@mui/icons-material";
import { Box, Chip, IconButton, Menu, MenuItem, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditCategoryPanel from "../panels/create-edit-category";
import { getCategories } from "@features/expenses/api/get-categories";
import { deleteCategory } from "@features/expenses/api/delete-category";
import ConfirmationDialog from "@components/ui/confirmation-dialog";

function Header({ name, children }) {
  const filters = useSelector(state => state.expenses.filters.categories);
  const dispatch = useDispatch();

  const sort = value => {
    dispatch(
      setCategoriesFilters({
        sortBy: value,
        order: filters.sortBy === value ? filters.order === "asc" ? "desc" : "asc" : "asc",
      })
    );
  }

  return (
    <TableCell onClick={() => sort(name)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {children}
        {
          filters.sortBy === name && (
            filters.order === "asc"
              ? <ArrowDropDown />
              : <ArrowDropUp />
          )
        }
      </Box>
    </TableCell>
  );
}

function Row({ setCategoryId, setShowEditCategoryPanel, data }) {
  const { _id, name, color, createdAt } = data;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setCategoryId(_id);
    setShowEditCategoryPanel(true);
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    await dispatch(
      deleteCategory({
        userId: user._id,
        categoryId: _id,
      })
    );
    dispatch(
      getCategories({
        userId: user._id,
      })
    );
    setAnchorEl(null);
  };

  const displayConfirmationDialog = () => {
    setShowDeleteConfirmation(true);
    setAnchorEl(null);
  }

  const hideConfirmationDialog = () => {
    setShowDeleteConfirmation(false);
  }

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Chip
          sx={{
            backgroundColor: color,
            width: "60px",
          }}
        />
      </TableCell>
      <TableCell>{moment(createdAt).format("DD/MM/YYYY")}</TableCell>
      <TableCell align="right" sx={{ width: 0 }}>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={displayConfirmationDialog} sx={{ color: "red" }}>Delete</MenuItem>
        </Menu>
        <ConfirmationDialog
          open={showDeleteConfirmation}
          title="Delete Category"
          description="This action cannot be undo."
          handleClose={hideConfirmationDialog}
          handleAgree={handleDeleteClick}
        /> 
      </TableCell>
    </TableRow>
  );
}

function CategoriesTable() {
  const categories = useSelector(state => state.expenses.categories.data);
  const totalCategories = useSelector(state => state.expenses.categories.total);
  const isCategoriesLoading = useSelector(state => state.expenses.categories.isLoading);
  const filters = useSelector(state => state.expenses.filters.categories);
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(null);
  const [showEditCategoryPanel, setShowEditCategoryPanel] = useState(false);

  const handleChangePage = (e, newPage) => {
    dispatch(setCategoriesFilters({ page: newPage }));
  }

  const handleChangeRowsPerPage = e => {
    dispatch(
      setCategoriesFilters({
        rowsPerPage: e.target.value,
        page: 0,
      })
    );
  }

  return (
    <>
    <TableContainer sx={{ maxHeight: "600px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <Header name="name">Name</Header>
            <Header name="color">Color</Header>
            <Header name="createdAt">Date Created</Header>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isCategoriesLoading ?
              new Array(3).fill(null).map((_, i) => (
                <TableRow key={i}>
                  {
                    new Array(4).fill(null).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton sx={{ width: "100%", height: "30px" }} />
                      </TableCell>
                    ))
                  }
                </TableRow>
              )) :
              categories.map((e, i) => (
                <Row
                  key={i}
                  data={e}
                  setCategoryId={setCategoryId}
                  setShowEditCategoryPanel={setShowEditCategoryPanel}
                />
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      rowsPerPageOptions={[25, 50]}
      count={totalCategories}
      rowsPerPage={filters.rowsPerPage}
      page={filters.page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        p: 0,
        backgroundColor: "var(--card)",
      }}
    />
    <EditCategoryPanel
      isEdit
      categoryId={categoryId}
      showCreateEditCategoryPanel={showEditCategoryPanel}
      setShowCreateEditCategoryPanel={setShowEditCategoryPanel}
    />
    </>
  );
}

export default CategoriesTable;
