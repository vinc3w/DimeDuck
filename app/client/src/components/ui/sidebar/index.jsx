import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Box,
  ButtonBase,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  KeyboardArrowRight,
  Logout,
  Payment,
  Savings,
  Settings,
} from "@mui/icons-material";
import { logOutUser } from "@features/auth/api/log-out-user";
import { BUDGET, DASHBOARD, EXPENSES, SETTINGS } from "@app/config/routes";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cookies, setToken, removeToken] = useCookies(["token"]);
  const menuLinks = [
    {
      label: "Dashboard",
      href: DASHBOARD,
      icon: <Dashboard sx={{ height: "25px" }} />,
    },
    {
      label: "Budget",
      href: BUDGET,
      icon: <Savings sx={{ height: "25px" }} />,
    },
    {
      label: "Expenses",
      href: EXPENSES,
      icon: <Payment sx={{ height: "25px" }} />,
    },
  ];
  const accountLinks = [
    {
      label: "Settings",
      href: SETTINGS,
      icon: <Settings sx={{ height: "25px" }} />,
    },
  ];

  const logoutUser = () => {
    removeToken("token");
    navigate("/login", { replace: true });
    dispatch(logOutUser(cookies));
  }

  return (
    <Stack
      sx={{
        backgroundColor: "var(--card)",
        borderRight: "solid 1px var(--border)",
        height: "100%",
      }}
    >
      <Stack
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            mb: 2,
          }}
        >
          MENU
        </Typography>
        {menuLinks.map((link, index) => {
          const isCurrentPage = location.pathname.startsWith(link.href);
          return (
            <ButtonBase sx={{ borderRadius: 3 }} key={index}>
              <Link
                component={RouterLink}
                to={link.href}
                underline="none"
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: `var(--${
                    isCurrentPage ? "primary" : "card"
                  })`,
                  color: `var(--${
                    isCurrentPage ? "button-text" : "text-secondary"
                  })`,
                }}
              >
                <Box sx={{ mr: 1.5 }}>{link.icon}</Box>
                <Typography variant="body2">{link.label}</Typography>
                {isCurrentPage && (
                  <Box sx={{ ml: "auto" }}>
                    <KeyboardArrowRight />
                  </Box>
                )}
              </Link>
            </ButtonBase>
          );
        })}
      </Stack>
      <Divider />
      <Stack
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            mb: 2,
          }}
        >
          ACCOUNT
        </Typography>
        {accountLinks.map((link, index) => {
          const isCurrentPage = location.pathname.startsWith(link.href);
          return (
            <ButtonBase sx={{ borderRadius: 3 }} key={index}>
              <Link
                component={RouterLink}
                to={link.href}
                underline="none"
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: `var(--${
                    isCurrentPage ? "primary" : "card"
                  })`,
                  color: `var(--${
                    isCurrentPage ? "button-text" : "text-secondary"
                  })`,
                }}
              >
                <Box sx={{ mr: 1.5 }}>{link.icon}</Box>
                <Typography variant="body2">{link.label}</Typography>
                {isCurrentPage && (
                  <Box sx={{ ml: "auto" }}>
                    <KeyboardArrowRight />
                  </Box>
                )}
              </Link>
            </ButtonBase>
          );
        })}
        <ButtonBase
          onClick={logoutUser}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            px: 1.5,
            py: 1.5,
            borderRadius: 3,
            color: "var(--text-secondary)",
          }}
        >
          <Box sx={{ mr: 1.5 }}>
            <Logout sx={{ height: "20px" }} />
          </Box>
          <Typography variant="body2">Logout</Typography>
        </ButtonBase>
      </Stack>
    </Stack>
  );
}

export default Sidebar;
