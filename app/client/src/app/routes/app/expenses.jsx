import CategoriesList from "@features/expenses/components/list/categories";
import ExpensesList from "@features/expenses/components/list/expenses";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ExpensesRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get("tab-index")
      ? parseInt(searchParams.get("tab-index"))
      : 0
  );

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    setSearchParams(prev => {
      prev.set("tab-index", newValue);
      return prev;
    });
  }

  const tabs = [
    "Expenses",
    "Categories",
  ];

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleTabChange}>
          {
            tabs.map((t, i) => (
              <Tab label={t} {...a11yProps(i)} key={i} />
            ))
          }
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ExpensesList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CategoriesList />
      </CustomTabPanel>
    </Box>
  );
}

export default ExpensesRoute;
