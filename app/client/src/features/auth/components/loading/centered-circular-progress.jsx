import { Box, CircularProgress } from "@mui/material";

function CenteredCircularProgress({ styles }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center",
        ...styles,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default CenteredCircularProgress;
