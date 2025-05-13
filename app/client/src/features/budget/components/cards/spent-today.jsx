import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import { getSpentToday } from "@features/expenses/api/get-spent-today";
import { Paid } from "@mui/icons-material";
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SpentTodayCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isSpentTodayLoading = useSelector(state => state.expenses.spentToday.isLoading);
  const spentToday = useSelector(state => state.expenses.spentToday.data);
  const currency = useSelector(state => state.settings.currency);

  useEffect(() => {
    dispatch(
      getSpentToday({
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
      <Paid sx={{ mb: 4 }} />
      <Typography variant="body2" sx={{ mb: 1, color: "var(--disabled)" }}>Spent Today</Typography>
      {
        isSpentTodayLoading ? <Skeleton height={56} width={100} /> : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h3" color="error">{spentToday.totalAmount.toFixed(2)}</Typography>
            <Typography variant="body2" color="error">{currency}</Typography>
          </Box>
        )
      }
    </Card>
  );
}

export default SpentTodayCard;
