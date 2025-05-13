import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonetizationOn } from "@mui/icons-material";
import { getTotalExpenses } from "@features/dashboard/api/get-total-expenses";

function TotalExpensesCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isTotalExpensesLoading = useSelector(state => state.dashboard.totalExpenses.isLoading);
  const totalExpenses = useSelector(state => state.dashboard.totalExpenses.data);
  const currency = useSelector(state => state.settings.currency);
  const filters = useSelector(state => state.dashboard.filters);

  useEffect(() => {
    dispatch(
      getTotalExpenses({
        userId: user._id,
        ...filters,
      })
    );
  }, [filters]);

  return (
    <Card
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MonetizationOn sx={{ mb: 4 }} />
      <Typography variant="body2" sx={{ mb: 1, color: "var(--disabled)" }}>Total Expenses</Typography>
      {
        isTotalExpensesLoading ? <Skeleton height={56} width={100} /> : (
          totalExpenses ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h3" color="error">{totalExpenses.toFixed(2)}</Typography>
              <Typography variant="body2" color="error">{currency}</Typography>
            </Box>
          ) : (
            <Typography variant="h3">0</Typography>
          )
        )
      }
    </Card>
  );
}

export default TotalExpensesCard;
