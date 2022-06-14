import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  hideSignoutFeedback,
  showSignoutFeedback,
} from "../../store/UIReducer";
import { Alert } from "@mui/material";

export default function LogoutFeedBack() {
  const open = useAppSelector((state) => state.ui.signingOut);
  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    hideSignoutFeedback();
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Signing out
        </Alert>
      </Snackbar>
    </div>
  );
}
