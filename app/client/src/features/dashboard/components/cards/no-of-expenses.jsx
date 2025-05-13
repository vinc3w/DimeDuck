import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCard } from "@mui/icons-material";
import { getNoOfExpenses } from "@features/dashboard/api/get-no-of-expenses";

function NoOfExpensesCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isNoOfExpensesLoading = useSelector(state => state.dashboard.noOfExpenses.isLoading);
  const noOfExpenses = useSelector(state => state.dashboard.noOfExpenses.data);
  const filters = useSelector(state => state.dashboard.filters);

  useEffect(() => {
    dispatch(
      getNoOfExpenses({
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
      <AddCard sx={{ mb: 4 }} />
      <Typography variant="body2" sx={{ mb: 1, color: "var(--disabled)" }}>Expenses Made</Typography>
      {
        isNoOfExpensesLoading ? <Skeleton height={56} width={100} /> : (
          noOfExpenses ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h3">{noOfExpenses}</Typography>
            </Box>
          ) : (
            <Typography variant="h3">0</Typography>
          )
        )
      }
    </Card>
  );
}

export default NoOfExpensesCard;
