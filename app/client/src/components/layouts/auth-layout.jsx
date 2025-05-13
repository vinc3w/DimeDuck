import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authorizeUserToken } from "../../features/auth/api/authorize-user-token";
import { useCookies } from "react-cookie";
import { Box, CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorizeToken = async () => {
    const action = await dispatch(authorizeUserToken(cookies));
    setIsAuthorized(action.payload.authorized);
    setIsLoading(false);
  }

  useEffect(() => {
    authorizeToken();
  }, []);

  if (isLoading || isAuthorized === null) return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
  
  if (isAuthorized) return navigate("/dashboard", { replace: true });

  return <Outlet />;
}

export default AuthLayout;
