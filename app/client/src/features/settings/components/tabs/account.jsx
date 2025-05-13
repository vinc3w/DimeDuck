import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BlankPfpPng from "@assets/images/blank-pfp.png";
import EditUsernamePanel from "@features/settings/components/panels/edit-username";
import EditPfpPanel from "@features/settings/components/panels/edit-pfp";

function CustomDivider() {
  return (
    <Divider
      sx={{
        gridColumn: "1 / 4",
        width: "100%",
      }}
    />
  );
}

function Label({ children }) {
  return (
    <Typography
      variant="body2"
      sx={{ fontWeight: "bold" }}
    >
      {children}
    </Typography>
  );
}

function TextValue({ children }) {
  return (
    <Typography variant="body2">{children}</Typography>
  );
}

function EditButton({ children, ...props }) {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        width: "fit-content",
        placeSelf: "center end",
        px: 2,
        py: 0.5,
        fontSize: 12,
      }}
      {...props}
    >
      Edit
    </Button>
  );
}

function AccountTab() {
  const user = useSelector(state => state.auth.user);
  const [showEditUsernamePanel, setShowEditUsernamePanel] = useState(false);
  const [showEditPfpPanel, setShowEditPfpPanel] = useState(false);

  const displayEditUsernamePanel = () => {
    setShowEditUsernamePanel(true);
  }

  const displayEditPfpPanel = () => {
    setShowEditPfpPanel(true);
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        placeItems: "center start",
        rowGap: 3,
        mt: 2,
      }}
    >
      <CustomDivider />

      <Label>Id</Label>
      <Typography variant="body2">{user._id}</Typography>

      <CustomDivider />

      <Label>Photo</Label>
      <Box
        component="img"
        alt="profile photo"
        src={user.pfp?.url || BlankPfpPng}
        sx={{ height: "60px" }}
      />
      <EditButton onClick={displayEditPfpPanel} />
      
      <CustomDivider />

      <Label>Username</Label>
      <TextValue>{user.username}</TextValue>
      <EditButton onClick={displayEditUsernamePanel} />
      
      <CustomDivider />
      
      <Label>Email</Label>
      <TextValue>{user.email}</TextValue>
      
      <CustomDivider />

      <EditUsernamePanel
        user={user}
        showEditUsernamePanel={showEditUsernamePanel}
        setShowEditUsernamePanel={setShowEditUsernamePanel}
      />
      <EditPfpPanel
        user={user}
        showEditPfpPanel={showEditPfpPanel}
        setShowEditPfpPanel={setShowEditPfpPanel}
      />
    </Box>
  );
}

export default AccountTab;
