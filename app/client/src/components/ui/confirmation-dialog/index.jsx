import { Backdrop, Box, Button, Card, Dialog, DialogTitle, Typography } from "@mui/material";

function ConfirmationDialog({
  open,
  title,
  description,
  handleClose,
  handleAgree,
}) {
  return (
    <Backdrop onClose={handleClose} open={open} sx={{ zIndex: 1000 }}>
      <Card
        sx={{
          width: "350px",
          p: 3,
        }}
      >
        <Typography variant="h5">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--disabled)" }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="disabled"
            onClick={handleClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleAgree}
            fullWidth
          >
            Agree
          </Button>
        </Box>
      </Card>
    </Backdrop>
  );
}

export default ConfirmationDialog;
