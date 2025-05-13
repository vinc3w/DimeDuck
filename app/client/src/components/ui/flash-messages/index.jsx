import { Alert, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeFlashMessage } from "../../../features/flash-messages/redux/slice";

function FlashMessages() {
  const messages = useSelector(state => state.flashMessages.messages);
  const dispatch = useDispatch();

  return (
    <Stack
      spacing={1}
      sx={theme => ({
        position: "absolute",
        left: 0,
        bottom: 0,
        p: 1,
        zIndex: 10_000,
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      })}
    >
      {
        messages.map(({message, severity, timeout=10_000}, index) => {
          setTimeout(() => dispatch(removeFlashMessage(index)), timeout);
          return (
            <Box key={index}>
              <Alert
                severity={severity}
                variant="filled"
                onClose={() => dispatch(removeFlashMessage(index))}
              >
                {message}
              </Alert>
            </Box>
          );
        })
      }
    </Stack>
  );
}

export default FlashMessages;
