import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PublicIcon from "@mui/icons-material/Public";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LockIcon from "@mui/icons-material/Lock";

import Typography from "@mui/material/Typography";
import { Avatar, Box, Chip } from "@mui/material";
import SearchBar from "./SearchBar";
import UserSearch from "./UserSearch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleAddNewMember } from "../../store/UIReducer";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function AddNewMember() {
  const dispatch = useAppDispatch();
  const openNewMeberModel = useAppSelector((state) => state.ui.addNewMember);

  const handleClickOpen = () => {
    dispatch(toggleAddNewMember());
  };
  const handleClose = () => {
    dispatch(toggleAddNewMember());
  };

  return (
    <div>
      <AddBoxIcon
        sx={{
          width: "2em",
          height: "2em",
          marginTop: "5px",
          transition: "all 0.25s ease-in-out",
          "&:hover": {
            opacity: "0.8",
            cursor: "pointer",
          },
        }}
        color="primary"
        onClick={handleClickOpen}
      />
      <Dialog
        sx={{
          border: "1px solid #E0E0E0",
        }}
        hideBackdrop={true}
        open={openNewMeberModel}
        onClose={handleClose}
      >
        <Box
          sx={{
            boxShadow: 0,
            padding: "1em",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6">Invite to Board</Typography>
          <Typography
            sx={{ color: "#828282", marginBottom: "10px" }}
            variant="body1"
          >
            Search users you want to invite to
          </Typography>
          <UserSearch />
          <Box
            sx={{
              marginTop: "20px",
              height: "160px",
              overflow: "auto",
              borderRadius: "8px",
              padding: "0.5em 1em",
              border: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                sx={{ borderRadius: "8px", width: "32px", height: "32px" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Typography
                sx={{ color: "#333333", fontWeight: "600" }}
                variant="body1"
              >
                Harsh Pareek
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                sx={{ borderRadius: "8px", width: "32px", height: "32px" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Typography
                sx={{ color: "#333333", fontWeight: "600" }}
                variant="body1"
              >
                Harsh Pareek
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                sx={{ borderRadius: "8px", width: "32px", height: "32px" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Typography
                sx={{ color: "#333333", fontWeight: "600" }}
                variant="body1"
              >
                Harsh Pareek
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                sx={{ borderRadius: "8px", width: "32px", height: "32px" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Typography
                sx={{ color: "#333333", fontWeight: "600" }}
                variant="body1"
              >
                Harsh Pareek
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Avatar
                sx={{ borderRadius: "8px", width: "32px", height: "32px" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Typography
                sx={{ color: "#333333", fontWeight: "600" }}
                variant="body1"
              >
                Harsh Pareek
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                marginTop: "20px",
                textTransform: "capitalize",
                borderRadius: "8px",
              }}
            >
              Invite
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
