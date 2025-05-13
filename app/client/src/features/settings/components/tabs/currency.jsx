import { Autocomplete, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import countries from "@assets/json/countries";
import { useState } from "react";
import { editCurrency } from "@features/settings/api/edit-currency";

function CustomDivider() {
  return (
    <Divider
      sx={{
        gridColumn: "1 / 4",
        width: "100%",
      }}
    />
  );
}

function CurrencyTab() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const currentCurrencyCode = useSelector(state => state.settings.currency);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(currentCurrencyCode);

  const save = () => {
    dispatch(
      editCurrency({
        userId: user._id,
        currency: selectedCurrencyCode,
      })
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        placeItems: "center start",
        rowGap: 3,
        mt: 2,
      }}
    >
      <CustomDivider />

      <Typography
        variant="body2"
        sx={{ fontWeight: "bold" }}
      >
        Currency
      </Typography>
      <Autocomplete
        disablePortal
        disableClearable
        options={[...new Set(countries.map(c => c.currencyCode))]}
        value={selectedCurrencyCode}
        sx={{ width: "170px" }}
        size="small"
        renderInput={(params) => (
          <TextField
            label="Currency"
            onChange={e => setSelectedCurrencyCode(e.target.value)}
            {...params}
          />
        )}
      />
      <Button
        variant="outlined"
        color="inherit"
        sx={{
          width: "fit-content",
          placeSelf: "center end",
          px: 2,
          py: 0.5,
          fontSize: 12,
        }}
        onClick={save}
      >
        Save
      </Button>
      
      <CustomDivider />
    </Box>
  );
}

export default CurrencyTab;
