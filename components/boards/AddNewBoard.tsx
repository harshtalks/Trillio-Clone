import * as React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleAddNewBoardCard, toggleCoverModel } from "../../store/UIReducer";
import AddIcon from "@mui/icons-material/Add";
import { Alert, AlertTitle, Box, Chip, Input, Stack } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LockIcon from "@mui/icons-material/Lock";
import CoverModel from "../Details/CoverModel";
import {
  addDescription,
  addImage,
  addName,
  clearFields,
  toggleVisibility,
} from "../../store/addNewBoardReducer";
import Image from "next/image";
import ChangeVisibility from "../smallerComps/ChangeVisibility";
import Fetcher from "../../lib/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

export default function AddNewBoard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const open = useAppSelector((state) => state.ui.addNewBoardCard);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const newBoardData = useAppSelector((state) => state.addNewBoard);
  const name = newBoardData.name;
  const isVisible = newBoardData.publiclyVisible;
  const description = newBoardData.description;
  const [feedback, setFeedback] = React.useState(defaultstate as feedbackType);

  const handleClose = () => {
    dispatch(toggleAddNewBoardCard());
  };

  const saveBoardHandler = async () => {
    setLoading(true);
    console.log(session?.user.id);
    try {
      const result = await Fetcher("/saveBoard", {
        name: name,
        description: description,
        image: newBoardData.image,
        publiclyVisible: isVisible,
        userId: session?.user.id,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      console.log(result);
      setFeedback({
        display: true,
        title: "Successfully created",
        content: `Board with name "${result.name}" has been created successfully`,
        severity: "success",
      });
      dispatch(clearFields());
      setLoading(false);
      router.reload();
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ padding: "1em", width: "400px" }}>
          {feedback.display && (
            <Alert
              sx={{ marginBottom: "20px" }}
              severity={feedback.severity}
              action={
                <Button
                  variant="outlined"
                  onClick={() => setFeedback(defaultstate)}
                  sx={{ textTransform: "capitalize" }}
                  color="inherit"
                  size="small"
                >
                  Clear
                </Button>
              }
            >
              <AlertTitle>{feedback.title}</AlertTitle>
              {feedback.content}
            </Alert>
          )}
          {newBoardData.image && (
            <Box sx={{ height: "150px", width: "100%", position: "relative" }}>
              <Image
                src={newBoardData.image}
                alt="image cover"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "8px" }}
              />
            </Box>
          )}
          <Input
            placeholder="Board name"
            disableUnderline
            fullWidth
            value={name}
            onChange={(e) => dispatch(addName(e.target.value))}
            sx={{
              marginTop: "1em",
              border: "1px solid #E0E0E0",
              padding: "5px 20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
            }}
          />
          <Input
            placeholder="Description"
            disableUnderline
            multiline
            minRows={5}
            fullWidth
            value={description}
            onChange={(e) => dispatch(addDescription(e.target.value))}
            sx={{
              marginTop: "1em",
              border: "1px solid #E0E0E0",
              padding: "5px 20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
            }}
          />
          <Stack sx={{ marginTop: "20px" }} direction={"row"} gap={2}>
            <Chip
              icon={
                <ImageIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              }
              sx={{
                padding: "10px",
                borderRadius: "8px",
                background: "#F2F2F2",
                color: "#828282",
                fontSize: "16px",
                fontWeight: "500",
              }}
              label="Cover"
              onClick={() => {
                dispatch(toggleCoverModel());
              }}
            />
            <ChangeVisibility isVisible={isVisible} action={toggleVisibility} />
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
          <LoadingButton
            loading={loading}
            variant="outlined"
            loadingPosition="center"
            disabled={name === "" ? true : false}
            sx={{
              borderRadius: "8px",
              textTransform: "capitalize",
              padding: "5px 25px",
              "&:hover": {
                opacity: "0.7",
              },
            }}
            startIcon={<AddIcon />}
            onClick={saveBoardHandler}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <CoverModel action={addImage} />
    </div>
  );
}
