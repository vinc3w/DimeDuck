import { EXPENSES } from "@app/config/routes";
import { getTodayExpenses } from "@features/expenses/api/get-today-expenses";
import { ArrowForward, Payment } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import TodayExpensesTable from "../tables/today-expenses";

function TodayExpensesCard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      getTodayExpenses({
        userId: user._id,
      })
    );
  }, []);

  return (
    <Card
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Payment />
          <Typography variant="body2">Today's Expenses</Typography>
        </Box>
        <Link
          component={RouterLink}
          to={EXPENSES}
          underline="none"
          sx={{ color: "var(--disabled)" }}
        >
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Link>
      </Box>
      <TodayExpensesTable />
    </Card>
  );
}

export default TodayExpensesCard;
