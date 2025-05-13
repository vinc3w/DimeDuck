import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Savings } from "@mui/icons-material";
import { getAvailable } from "@features/dashboard/api/get-available";

function AvailableCard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isAvailableLoading = useSelector(state => state.dashboard.available.isLoading);
  const available = useSelector(state => state.dashboard.available.data);
  const currency = useSelector(state => state.settings.currency);

  useEffect(() => {
    dispatch(
      getAvailable({
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
      <Savings sx={{ mb: 4 }} />
      <Typography variant="body2" sx={{ mb: 1, color: "var(--disabled)" }}>Available</Typography>
      {
        isAvailableLoading ? <Skeleton height={56} width={100} /> : (
          available ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h3"
                color={available > 0 ? "success" : "error"}
              >
                {available.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color={available > 0 ? "success" : "error"}
              >
                {currency}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h3">-</Typography>
          )
        )
      }
    </Card>
  );
}

export default AvailableCard;
