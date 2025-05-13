import { Box, Card, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import ForgotPasswordForm from "@features/auth/components/forms/forgot-password";
import DuckPng from "@assets/images/duck.png";
import { LOGIN } from "@app/config/routes";

function ForgotPasswordRoute() {
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
          <Typography variant="h6" textAlign="center">Forgot Password</Typography>
          <Typography variant="body2" color="secondary" textAlign="center">
          Enter your email address and we'll send you a link to reset your password.
          </Typography>
          <Box
            sx={{
              my: 3,
              width: "100%",
            }}
          >
            <ForgotPasswordForm />
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

export default ForgotPasswordRoute;
