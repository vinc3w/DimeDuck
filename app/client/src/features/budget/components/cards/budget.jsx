import { getBudget } from "@features/budget/api/get-budget";
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetEditBudgetPanel from "../panels/set-edit-budget";
import { Edit, Savings } from "@mui/icons-material";

function BudgetCard({ setShowNoBudgetAlert }) {
  const dispatch = useDispatch();
  const [showEditBudgetPanel, setShowEditBudgetPanel] = useState(false);
  const user = useSelector(state => state.auth.user);
  const isBudgetLoading = useSelector(state => state.budget.budget.isLoading);
  const budget = useSelector(state => state.budget.budget.data);
  const currency = useSelector(state => state.settings.currency);

  const displayShowEditBudgetPanel = () => {
    setShowEditBudgetPanel(true);
  }

  useEffect(() => {
    dispatch(
      getBudget({
        userId: user._id,
      })
    );
  }, []);

  useEffect(() => {
    if (!isBudgetLoading && !budget) {
      setShowNoBudgetAlert(true);
    } else if (!isBudgetLoading && budget) {
      setShowNoBudgetAlert(false);
    }
  }, [isBudgetLoading, budget]);

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
          mb: 4,
        }}
      >
        <Savings />
        {
          budget &&
          <Edit
            sx={{
              cursor: "pointer",
              color: "var(--disabled)"
            }}
            onClick={displayShowEditBudgetPanel}
          />
        }
      </Box>
      <Typography variant="body2" sx={{ mb: 1, color: "var(--disabled)" }}>Budget Set</Typography>
      {
        isBudgetLoading ? <Skeleton height={56} width={100} /> : (
          budget ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h3">{budget.amount.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ color: "var(--disabled)" }}>{currency}</Typography>
            </Box>
          ) : (
            <Typography variant="h3">-</Typography>
          )
        )
      }
      {
        !isBudgetLoading && budget && 
        <SetEditBudgetPanel
          isEdit
          showSetEditBudgetPanel={showEditBudgetPanel}
          setShowSetEditBudgetPanel={setShowEditBudgetPanel}
        />
      }
    </Card>
  );
}

export default BudgetCard;
