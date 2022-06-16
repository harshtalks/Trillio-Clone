import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from "@mui/material";

export default function SuccessFeedback({
  successFeedback,
  setSuccessFeedback,
}: {
  successFeedback: boolean;
  setSuccessFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    setSuccessFeedback(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessFeedback(false);
  };

  return (
    <Snackbar
      open={successFeedback}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
      >
        <AlertTitle>Successfully added new list!</AlertTitle>
        Wait for the page reload!
      </Alert>
    </Snackbar>
  );
}
