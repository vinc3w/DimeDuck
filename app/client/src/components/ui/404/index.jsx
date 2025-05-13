import { DASHBOARD } from "@app/config/routes";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Error404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "150px",
          fontWeight: "bold",
          lineHeight: "100%",
          mb: 1,
        }}
      >
        404
      </Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Button
        component={RouterLink}
        to={DASHBOARD}
        startIcon={<ArrowBack />}
        sx={{ mt: 2 }}
      >
        Back to dashboard
      </Button>
    </Box>
  );
}

export default Error404;
