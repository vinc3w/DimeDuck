import { Chip, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ColorContrastChecker from "color-contrast-checker";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Row({ data }) {
  const { name, amount, category, date } = data;
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
      <TableCell>{moment(date).format("DD/MM/YYYY")}</TableCell>
    </TableRow>
  );
}

function TopExpensesTable() {
  const isLoading = useSelector(state => state.dashboard.topExpenses.isLoading);
  const data = useSelector(state => state.dashboard.topExpenses.data);
  const currency = useSelector(state => state.settings.currency);

  return (
    <TableContainer sx={{ maxHeight: "600px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount ({currency})</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
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
            data.map((e, i) => <Row data={e} key={i} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopExpensesTable;
