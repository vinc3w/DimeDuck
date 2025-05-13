import { Box, Card, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import DuckPng from "@assets/images/duck.png";
import { LOGIN } from "@app/config/routes";
import ResetPasswordForm from "@features/auth/components/forms/reset-password";

function ResetPasswordRoute() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          component="img"
          alt="duck"
          src={DuckPng}
          sx={{
            height: "30px",
            display: "block",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            ml: 1,
          }}
        >
          DimeDuck
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Card
          sx={{
            p: 4,
            width: "90%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" textAlign="center">Reset Password</Typography>
          <Typography variant="body2" color="secondary" textAlign="center">
            Set a new password to regain access to your account.
          </Typography>
          <Box
            sx={{
              my: 3,
              width: "100%",
            }}
          >
            <ResetPasswordForm />
          </Box>
          <Typography variant="body2">
            Back to
            <Link
              component={RouterLink}
              to={LOGIN}
              underline="none"
              sx={{ ml: 0.5 }}
            >
              Login
            </Link>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default ResetPasswordRoute;
