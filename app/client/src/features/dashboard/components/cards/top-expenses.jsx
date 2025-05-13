import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmojiEvents } from "@mui/icons-material";
import { getTopExpenses } from "@features/dashboard/api/get-top-expenses";
import TopExpensesTable from "../tables/top-expenses";

function TopExpensesCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isTopExpensesLoading = useSelector(state => state.dashboard.topExpenses.isLoading);
  const filters = useSelector(state => state.dashboard.filters);

  useEffect(() => {
    dispatch(
      getTopExpenses({
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
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EmojiEvents />
        <Typography variant="body2" sx={{ color: "var(--disabled)" }}>Top Expenses</Typography>
      </Box>
      {
        isTopExpensesLoading ? <Skeleton height={56} width={100} /> : (
          <TopExpensesTable />
        )
      }
    </Card>
  );
}

export default TopExpensesCard;
