import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

function SensitiveTextField({...props}) {

  const [show, setShow] = useState(false);

  const handleClickShow = () => {
    setShow(!show);
  };

  return (
    <TextField
      {...props}
      type={ show ? "text" : "password" }
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={ show ? "hide the password" : "display the password"}
                onClick={handleClickShow}
              >
                { show ? <VisibilityOff /> : <Visibility /> }
              </IconButton>    
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SensitiveTextField;
