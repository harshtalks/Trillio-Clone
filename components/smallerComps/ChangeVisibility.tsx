import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";

import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function ChangeVisibility() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Chip
        label="Public"
        sx={{
          padding: "10px",
          borderRadius: "8px",
          background: "#F2F2F2",
          color: "#828282",
          fontSize: "16px",
          fontWeight: "500",
        }}
        icon={
          <PublicIcon
            sx={{
              width: "16px",
              height: "16px",
            }}
          />
        }
        onClick={handleClickOpen}
      />
      <Dialog
        sx={{
          border: "1px solid #E0E0E0",
        }}
        hideBackdrop={true}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            boxShadow: 0,
            padding: "1em",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6">Visiblility</Typography>
          <Typography sx={{ color: "#828282" }} variant="body1">
            Choose who can see to this board.
          </Typography>
          <Box
            sx={{
              marginTop: "10px",
              borderRadius: "8px",
              padding: "0.5em 1em",
              "&:hover": {
                background: "#F2F2F2",
                cursor: "pointer",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <PublicIcon fontSize="small" />
              <Typography
                sx={{ color: "#4F4F4F", fontWeight: "500" }}
                variant="body1"
              >
                Public
              </Typography>
            </Box>
            <Typography
              sx={{ color: "#828282", margin: "10px 0" }}
              variant="body2"
            >
              Anyone on the internet can see this.
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
              borderRadius: "8px",
              padding: "0.5em 1em",
              "&:hover": {
                background: "#F2F2F2",
                cursor: "pointer",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <LockIcon fontSize="small" />
              <Typography
                sx={{ color: "#4F4F4F", fontWeight: "500" }}
                variant="body1"
              >
                Private
              </Typography>
            </Box>
            <Typography
              sx={{ color: "#828282", margin: "10px 0" }}
              variant="body2"
            >
              Only board members can see this
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
