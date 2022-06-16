import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleCoverModel, toggleListModel } from "../../store/UIReducer";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { LoadingButton } from "@mui/lab";
import Fetcher from "../../lib/fetcher";
import { useRouter } from "next/router";
import SuccessFeedback from "./SuccessFeedback";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  borderRadius: "12px",
  p: 2,
};

type coverModelAction = {
  action: ActionCreatorWithPayload<string, string>;
};

export default function Index() {
  const dispatch = useAppDispatch();
  const listModel = useAppSelector((state) => state.ui.addNewList);
  const handleClose = () => dispatch(toggleListModel(false));
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const boardName = useAppSelector((state) => state.boardSceen.name);
  const boardID = useAppSelector((state) => state.boardSceen.id);
  const router = useRouter();
  const [successFeedback, setSuccessFeedback] = React.useState(false);

  const handler = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await Fetcher("/createList", {
        name: name,
        boardID: boardID,
      });

      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false);
      setSuccessFeedback(true);
      router.reload();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={listModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontWeight: "600" }} gutterBottom variant="h6">
            Add New List
          </Typography>
          <Typography
            sx={{ fontSize: "1.1em", color: "#828282" }}
            gutterBottom
            variant="h6"
          >
            Add a new list in the board - <strong>{boardName}</strong>
          </Typography>
          {error !== "" && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: "10px 10px",
            }}
          >
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="Keywords..."
              disableUnderline
              fullWidth
            />
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "5px",
              overflow: "auto",
              maxHeight: "240px",
            }}
          >
            <LoadingButton
              startIcon={<AddIcon />}
              loading={loading ? true : false}
              loadingPosition="start"
              disabled={name === "" ? true : false}
              size="large"
              variant="outlined"
              onClick={handler}
            >
              Create
            </LoadingButton>
          </Box>
          {
            <SuccessFeedback
              successFeedback={successFeedback}
              setSuccessFeedback={setSuccessFeedback}
            />
          }
        </Box>
      </Modal>
    </div>
  );
}
