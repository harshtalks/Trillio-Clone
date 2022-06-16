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
import { Avatar, Box, Chip, Skeleton, Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import UserSearch from "./UserSearch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleAddNewMember } from "../../store/UIReducer";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { loadUsers } from "../../store/userReducers";
import { LoadingButton } from "@mui/lab";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function AddNewMember() {
  const dispatch = useAppDispatch();
  const openNewMeberModel = useAppSelector((state) => state.ui.addNewMember);
  const users = useAppSelector((state) => state.users);
  const [click, setClick] = React.useState("");
  const [nameQuery, setNameQuery] = React.useState("");

  const handleClickOpen = () => {
    dispatch(toggleAddNewMember());
  };
  const handleClose = () => {
    dispatch(toggleAddNewMember());
  };

  React.useEffect(() => {
    dispatch(loadUsers());
  }, []);

  React.useEffect(() => {}, []);

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
          <UserSearch nameQuery={nameQuery} setNameQuery={setNameQuery} />
          <Box
            sx={{
              marginTop: "20px",
              height: "160px",
              overflow: "auto",
              borderRadius: "8px",
              padding: "0.5em 0.5em",
              border: "1px solid #E0E0E0",
            }}
          >
            {users.status === "loading" && (
              <Stack spacing={3}>
                {[1, 2, 3].map((item) => {
                  return (
                    <Stack key={item} direction={"row"} spacing={2}>
                      <Skeleton variant="circular" width={32} height={32} />
                      <Skeleton variant="text" width={150} />
                    </Stack>
                  );
                })}
              </Stack>
            )}
            {users.users &&
              users.users.map((user: User) => {
                return (
                  <motion.div
                    key={user.id}
                    whileHover={{
                      cursor: "pointer",
                      scale: 1.01,
                    }}
                  >
                    <Box
                      onClick={() => setClick(user.id)}
                      sx={{
                        margin: "10px 0",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                        gap: "1em",
                        background: `${click === user.id ? "#e9ecef" : "none"}`,
                        borderRadius: "8px",
                        "&:hover": {
                          background: "#e9ecef",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          borderRadius: "8px",
                          width: "32px",
                          height: "32px",
                        }}
                        alt={user.name ? user.name : "avatar"}
                        src={user.image ? user.image : ""}
                      />
                      <Typography
                        sx={{ color: "#333333", fontWeight: "600" }}
                        variant="body1"
                      >
                        {user.name}
                      </Typography>
                    </Box>
                  </motion.div>
                );
              })}
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              variant="contained"
              size="large"
              loadingPosition="start"
              startIcon={<AddBoxIcon />}
              sx={{
                marginTop: "20px",
                textTransform: "capitalize",
                borderRadius: "8px",
              }}
            >
              Invite
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
