import { Backdrop, Card, Typography } from "@mui/material";
import EditPfpForm from "@features/settings/components/forms/edit-pfp";

function EditPfpPanel({
  user,
  showEditPfpPanel,
  setShowEditPfpPanel,
}) {

  return (
    <Backdrop aria-hidden="false" open={showEditPfpPanel}>
      <Card
        sx={{
          maxWidth: "300px",
          minWidth: "300px",
          p: 2,
        }}
      >
        <Typography variant="h6">Edit Photo</Typography>
        <Typography 
          variant="body2"
          color="secondary"
          sx={{
            mb: 3,
            fontSize: 12,
          }}
        >
          Recommended: 1 x 1 size, size under 1MB
        </Typography>
        <EditPfpForm
          user={user}
          setShowEditPfpPanel={setShowEditPfpPanel}
        />
      </Card>
    </Backdrop>
  );
}

export default EditPfpPanel;
