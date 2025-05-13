import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import { setExpensesFilters } from "@features/expenses/redux/slice";
import { ArrowDropDown, ArrowDropUp, MoreVert } from "@mui/icons-material";
import { Box, Chip, IconButton, Menu, MenuItem, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import ColorContrastChecker from "color-contrast-checker";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditExpensePanel from "../panels/create-edit-expense";
import CreateCategoryPanel from "../panels/create-edit-category";
import { deleteExpense } from "@features/expenses/api/delete-expense";
import { getExpenses } from "@features/expenses/api/get-expenses";
import ConfirmationDialog from "@components/ui/confirmation-dialog";

function Header({ name, children }) {
  const filters = useSelector(state => state.expenses.filters.expenses);
  const dispatch = useDispatch();

  const sort = value => {
    dispatch(
      setExpensesFilters({
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

function Row({ setExpenseId, setShowEditExpensePanel, data }) {
  const { _id, name, amount, category, note, date } = data;
  const ccc = new ColorContrastChecker();
  const [textColor, setTextColor] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (category) {
      const white = "#FFFFFF";
      const black = "#000000";
      setTextColor(ccc.isLevelAA(category.color, black) ? black : white);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setExpenseId(_id);
    setShowEditExpensePanel(true);
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    await dispatch(
      deleteExpense({
        userId: user._id,
        expenseId: _id,
      })
    );
    dispatch(
      getExpenses({
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
      <TableCell>{amount}</TableCell>
      <TableCell>
        {
          category ?
            <Chip
              label={category.name}
              sx={{
                backgroundColor: category.color,
                color: textColor,
              }}
            /> :
            "-"
        }
      </TableCell>
      <TableCell>{moment(date).format("DD/MM/YYYY")}</TableCell>
      <TableCell>{note || "-"}</TableCell>
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
          title="Delete Expense"
          description="This action cannot be undo."
          handleClose={hideConfirmationDialog}
          handleAgree={handleDeleteClick}
        />
      </TableCell>
    </TableRow>
  );
}

function ExpensesTable() {
  const expenses = useSelector(state => state.expenses.expenses.data);
  const totalExpenses = useSelector(state => state.expenses.expenses.total);
  const isExpensesLoading = useSelector(state => state.expenses.expenses.isLoading);
  const filters = useSelector(state => state.expenses.filters.expenses);
  const currency = useSelector(state => state.settings.currency);
  const dispatch = useDispatch();
  const [expenseId, setExpenseId] = useState(null);
  const [showEditExpensePanel, setShowEditExpensePanel] = useState(false);
  const [showCreateCategoryPanel, setShowCreateCategoryPanel] = useState(false);

  const handleChangePage = (e, newPage) => {
    dispatch(setExpensesFilters({ page: newPage }));
  }

  const handleChangeRowsPerPage = e => {
    dispatch(
      setExpensesFilters({
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
            <Header name="amount">Amount ({currency})</Header>
            <Header name="category">Category</Header>
            <Header name="date">Date</Header>
            <Header name="note">Note</Header>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isExpensesLoading ?
              new Array(6).fill(null).map((_, i) => (
                <TableRow key={i}>
                  {
                    new Array(5).fill(null).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton sx={{ width: "100%", height: "30px" }} />
                      </TableCell>
                    ))
                  }
                </TableRow>
              )) :
              expenses.map((e, i) => (
                <Row data={e} setExpenseId={setExpenseId} setShowEditExpensePanel={setShowEditExpensePanel} key={i} />
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      component="div"
      rowsPerPageOptions={[25, 50]}
      count={totalExpenses}
      rowsPerPage={filters.rowsPerPage}
      page={filters.page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        p: 0,
        backgroundColor: "var(--card)",
      }}
    />
    <EditExpensePanel
      isEdit
      expenseId={expenseId}
      showCreateEditExpensePanel={showEditExpensePanel}
      setShowCreateEditExpensePanel={setShowEditExpensePanel}
      setShowCreateCategoryPanel={setShowCreateCategoryPanel}
    />
    <CreateCategoryPanel
      showCreateCategoryPanel={showCreateCategoryPanel}
      setShowCreateCategoryPanel={setShowCreateCategoryPanel}
    />
    </>
  );
}

export default ExpensesTable;
