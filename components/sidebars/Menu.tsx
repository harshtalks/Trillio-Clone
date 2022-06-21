/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleBoardDescription, toggleSideMenu } from "../../store/UIReducer";
import { format } from "date-fns";
import { LoadingButton } from "@mui/lab";
import Fetcher from "../../lib/fetcher";
import { changeDescription } from "../../store/boardScreenReducer";

interface feedbackType {
  display: boolean;
  content: string;
  title: string;
  severity: "success" | "warning" | "error" | "info";
}

const defaultstate: feedbackType = {
  display: false,
  content: "",
  severity: "info",
  title: "",
};

const Menu = () => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = React.useState("");

  //display hooks
  const [feedback, setFeedback] = React.useState(defaultstate as feedbackType);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  //
  const open = useAppSelector((state) => state.ui.sideMenu);
  //
  const boardScreen = useAppSelector((state) => state.boardSceen);
  const editBoardDescription = useAppSelector(
    (state) => state.ui.editBoardDescription
  );

  const handlerChangeDescription = async () => {
    setLoading(true);
    if (boardScreen.description === description) {
      setFeedback({
        display: true,
        content: "There is no change in the description.",
        severity: "warning",
        title: "No changes made",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await Fetcher("/changeDescriptionBoard", {
        boardId: boardScreen.id,
        description,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      setLoading(false);
      dispatch(toggleBoardDescription());
      dispatch(changeDescription(description));
    } catch (error: any) {
      console.error(error);
      setFeedback({
        display: true,
        title: "Error",
        content: error.message,
        severity: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardScreen.description) setDescription(boardScreen.description);
  }, []);

  const date = format(new Date(boardScreen.createdAt), "dd LLLL yyyy");
  //
  return (
    <Box
      sx={{
        width: "500px",
        height: "90vh",
        zIndex: "100000",
        position: "fixed",
        bottom: "0",
        right: "10px",
        background: "#fff",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        borderRadius: "12px",
        border: "1px solid black",
        padding: "1.5em 1em",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6">
          {boardScreen.name}
        </Typography>
        <CloseIcon
          onClick={() => dispatch(toggleSideMenu())}
          sx={{ cursor: "pointer" }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <AccountCircleIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Made by
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "20px 0",
          marginBottom: "30px",
        }}
      >
        <Avatar
          sx={{ borderRadius: "8px" }}
          alt="Remy Sharp"
          src={boardScreen.user.image ? boardScreen.user.image : ""}
        />
        <Box>
          <Typography
            sx={{ color: "#333333", fontWeight: "600" }}
            variant="body1"
          >
            {boardScreen.user.name}
          </Typography>
          <Typography
            sx={{ color: "#BDBDBD", fontWeight: "600" }}
            variant="body2"
          >
            on {date}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <DescriptionIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Description
        </Typography>
        <Chip
          onClick={() => dispatch(toggleBoardDescription())}
          label="Edit"
          icon={<EditIcon />}
          sx={{
            padding: "10px 15px",
            borderRadius: "8px",
            background: "#F2F2F2",
            fontSize: "16px",
            marginLeft: "20px",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {editBoardDescription ? (
          <Box>
            {feedback.display && (
              <Alert
                variant="outlined"
                severity={feedback.severity}
                sx={{ my: 2 }}
              >
                <AlertTitle>{feedback.title}</AlertTitle>
                {feedback.content}
              </Alert>
            )}
            <TextField
              label="Enter Description"
              multiline
              fullWidth
              rows="10"
              defaultValue="Default Value"
              variant="outlined"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setFeedback(defaultstate);
              }}
            />
            <LoadingButton
              loading={loading ? true : false}
              onClick={handlerChangeDescription}
              size="large"
              color="success"
              variant="outlined"
              sx={{ display: "block", marginTop: "10px" }}
            >
              Save
            </LoadingButton>
          </Box>
        ) : (
          <Typography>{boardScreen.description}</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <GroupsIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Team
        </Typography>
      </Box>
      <Box>
        {boardScreen.members
          ? boardScreen.members.map((member) => (
              <Box
                key={member.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Avatar
                    sx={{ borderRadius: "8px" }}
                    alt={member.user.name ? member.user.name : "avatar"}
                    src={member.user.image ? member.user.image : ""}
                  />
                  <Typography
                    sx={{ color: "#333333", fontWeight: "600" }}
                    variant="body1"
                  >
                    {member.user.name}
                  </Typography>
                </Box>
                <Chip
                  sx={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    background: "#F2F2F2",
                  }}
                  label={
                    member.userId === boardScreen.user.id ? "Admin" : "Member"
                  }
                />
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default Menu;
