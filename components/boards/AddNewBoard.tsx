import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleAddNewBoardCard } from "../../store/UIReducer";
import AddIcon from "@mui/icons-material/Add";
import { Chip, Input, Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LockIcon from "@mui/icons-material/Lock";

export default function AddNewBoard() {
  const open = useAppSelector((state) => state.ui.addNewBoardCard);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleAddNewBoardCard());
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: "1em 2em", width: "400px" }}>
          <Input
            placeholder="Board name"
            disableUnderline
            fullWidth
            sx={{
              border: "1px solid #E0E0E0",
              padding: "5px 20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
            }}
          />
          <Stack
            sx={{ justifyContent: "space-between", marginTop: "20px" }}
            direction={"row"}
            spacing={1}
          >
            <Chip
              icon={<ImageIcon fontSize="small" />}
              sx={{
                width: "50%",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              label="Cover"
            />
            <Chip
              icon={<LockIcon fontSize="small" />}
              sx={{
                width: "50%",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              label="Private"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: "1em 2em" }}>
          <Button
            sx={{
              color: "black",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              background: "#2F80ED",
              borderRadius: "8px",
              textTransform: "capitalize",
              color: "white",
              "&:hover": {
                background: "#2F80ED",
                opacity: "0.7",
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleClose}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
