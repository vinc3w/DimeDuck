import { Box, Card, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import RegisterForm from "@features/auth/components/forms/register";
import DuckPng from "@assets/images/duck.png";
import { LOGIN } from "@app/config/routes";

function RegisterRoute() {

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
          <Typography variant="h6" textAlign="center">Welcome!</Typography>
          <Typography variant="body2" color="secondary" textAlign="center">
            Enter your details to sign up!
          </Typography>
          <Box
            sx={{
              my: 3,
              width: "100%",
            }}
          >
            <RegisterForm />
          </Box>
          <Typography variant="body2">
            Already have an account?
            <Link
              component={RouterLink}
              to={LOGIN}
              underline="none"
              sx={{ ml: 0.5 }}
            >
              Log In
            </Link>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default RegisterRoute;
