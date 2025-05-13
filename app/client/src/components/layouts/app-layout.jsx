import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, CircularProgress } from "@mui/material";
import { authorizeUserToken } from "@features/auth/api/authorize-user-token";
import Sidebar from "@components/ui/sidebar";
import Topbar from "@components/ui/topbar";
import Branding from "@components/ui/branding";

function AppLayout() {
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
  
  if (!isAuthorized) return navigate("/login", { replace: true });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "300px auto",
        gridTemplateRows: "fit-content(100px) auto",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          gridColumn: "1 / 2",
          gridRow: "1 / 2",
        }}
      >
        <Branding />
      </Box>
      <Box
        sx={{
          gridColumn: "2 / 3",
          gridRow: "1 / 2",
        }}
      >
        <Topbar />
      </Box>
      <Box
        sx={{
          gridColumn: "1 / 2",
          gridRow: "2 / 3",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          gridColumn: "2 / 3",
          gridRow: "2 / 3",
          p: 2,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
