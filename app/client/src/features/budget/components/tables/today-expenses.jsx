import CenteredCircularProgress from "@features/auth/components/loading/centered-circular-progress";
import {
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ColorContrastChecker from "color-contrast-checker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Row({ data }) {
  const { name, amount, category, note } = data;
  const ccc = new ColorContrastChecker();
  const [textColor, setTextColor] = useState();

  useEffect(() => {
    if (category) {
      const white = "#FFFFFF";
      const black = "#000000";
      setTextColor(ccc.isLevelAA(category.color, black) ? black : white);
    }
  }, []);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>
        {category ? (
          <Chip
            label={category.name}
            sx={{
              backgroundColor: category.color,
              color: textColor,
            }}
          />
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>{note || "-"}</TableCell>
    </TableRow>
  );
}

function TodayExpensesTable() {
  const currency = useSelector((state) => state.settings.currency);
  const isTodayExpensesLoading = useSelector(
    (state) => state.expenses.todayExpenses.isLoading
  );
  const todayExpenses = useSelector(
    (state) => state.expenses.todayExpenses.data
  );

  return (
    <TableContainer sx={{ maxHeight: "600px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount ({currency})</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isTodayExpensesLoading ? (
            new Array(4).fill(null).map((_, i) => (
              <TableRow key={i}>
                {
                  new Array(4).fill(null).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton sx={{ width: "100%", height: "30px" }} />
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          ) : (
            todayExpenses.map((e, i) => <Row data={e} key={i} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TodayExpensesTable;
