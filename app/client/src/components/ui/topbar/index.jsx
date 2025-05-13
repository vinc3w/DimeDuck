import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BlankPfpPng from "@assets/images/blank-pfp.png";

function Topbar() {
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const pageName = location.pathname.split("/")[1];

  if (!pageName) return <></>;

  const title = pageName[0].toUpperCase() + pageName.slice(1);

  return (
    <Box
      sx={{
        backgroundColor: "var(--card)",
        borderBottom: "solid 1px var(--border)",
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "var(--primary)" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          component="img"
          alt="profile photo"
          src={user.pfp?.url || BlankPfpPng}
          sx={{
            width: "35px",
            borderRadius: "50%",
          }}
        />
      </Box>
    </Box>
  );
}

export default Topbar;
