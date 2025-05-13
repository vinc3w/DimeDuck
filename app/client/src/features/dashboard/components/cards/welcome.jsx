import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function WelcomeCard() {
  const user = useSelector(state => state.auth.user);

  return (
    <Box>
      <Typography variant="h5">
        Welcome in, {user.username}!
      </Typography>
    </Box>
  );
}

export default WelcomeCard;
