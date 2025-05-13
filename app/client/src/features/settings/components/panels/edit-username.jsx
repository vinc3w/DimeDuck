import { Backdrop, Card, Typography } from "@mui/material";
import EditUsernameForm from "@features/settings/components/forms/edit-username";

function EditUsernamePanel({
  user,
  showEditUsernamePanel,
  setShowEditUsernamePanel,
}) {

  return (
    <Backdrop open={showEditUsernamePanel}>
      <Card
        sx={{
          maxWidth: "400px",
          minWidth: "400px",
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>Edit Username</Typography>
        <EditUsernameForm
          user={user}
          setShowEditUsernamePanel={setShowEditUsernamePanel}
        />
      </Card>
    </Backdrop>
  );
}

export default EditUsernamePanel;
