import { Box, Divider, Stack, Typography } from "@mui/material";
import DuckPng from "@assets/images/duck.png";

function Branding() {

  return (
    <Stack
      sx={{
        backgroundColor: "var(--card)",
        borderRight: "solid 1px var(--border)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 2,
        }}
      >
        <Box
          component="img"
          alt="duck"
          src={DuckPng}
          sx={{
            height: "30px",
            display: "block",
            mr: 1,
          }}
        />
        <Box sx={{ width: "100%" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            DimeDuck
          </Typography>
          <Typography variant="body2" color="secondary">
            Financial Account
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Stack>
  );
}

export default Branding;
