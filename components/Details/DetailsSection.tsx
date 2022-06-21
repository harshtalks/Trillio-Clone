import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import ImageIcon from "@mui/icons-material/Image";
import LabelIcon from "@mui/icons-material/Label";
import PeopleIcon from "@mui/icons-material/People";
import CommentBox from "./CommentBox";
import Comments from "./Comments";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CoverModel from "./CoverModel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  changeCardCover,
  toggleCardDescription,
  toggleCoverModel,
  toggleLabelModel,
} from "../../store/UIReducer";
import LabelModel from "./LabelModel";
import { CardProps } from "../../types/types";
import { loadComments } from "../../store/commentsReducer";
import { LoadingButton } from "@mui/lab";
import Fetcher from "../../lib/fetcher";
import { loadCardData } from "../../store/cardScreenReducer";
import ChangeCoverModel from "./ChangeCoverModel";

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

const DetailsSection = ({ data }: { data: CardProps }) => {
  const dispatch = useAppDispatch();
  const listName = useAppSelector((state) => state.ui.currentList);
  const editCardDescription = useAppSelector(
    (state) => state.ui.editCardDescription
  );

  const [description, setDescription] = React.useState("");

  //display hooks
  const [feedback, setFeedback] = React.useState(defaultstate as feedbackType);
  const [loading, setLoading] = React.useState(false);

  const {
    data: comments,
    error,
    status,
  } = useAppSelector((state) => state.comments);

  const handlerChangeDescription = async () => {
    setLoading(true);
    if (data.description === description) {
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
      const result = await Fetcher("/changeDescriptionCard", {
        cardId: data.id,
        description,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      setLoading(false);
      dispatch(toggleCardDescription());
      dispatch(loadCardData(data.id));
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
    dispatch(loadComments(data.id));
    if (data.description) {
      setDescription(data.description);
    }
  }, []);

  return (
    <Box sx={{ margin: "1em 0" }}>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: "1.2em" }} variant="body1">
            {data.name}
          </Typography>
          <Typography
            sx={{ fontSize: "0.8em", color: "#BDBDBD", fontWeight: "bold" }}
            variant="body2"
          >
            List: <strong style={{ color: "#000" }}>{listName}</strong>
          </Typography>
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
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Description
            </Typography>
            <Chip
              label="Edit"
              onClick={() => dispatch(toggleCardDescription())}
              icon={<EditIcon fontSize="small" />}
              sx={{
                padding: "10px 15px",
                borderRadius: "8px",
                background: "#F2F2F2",
                marginLeft: "20px",
                fontSize: "0.8em",
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "30px" }}>
            {editCardDescription ? (
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
              <Typography>{data.description}</Typography>
            )}
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <DescriptionIcon />
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Comments
            </Typography>
          </Box>
          <CommentBox data={data} />
          <>
            {status === "succeeded" &&
              (comments.length > 0 ? (
                comments.map((comment) => (
                  <Comments
                    commentCardId={data.id}
                    commentData={comment}
                    key={comment.id}
                  />
                ))
              ) : (
                <Chip
                  sx={{ borderRadius: "8px", margin: "2rem 0" }}
                  variant="outlined"
                  label="No comments available under this post"
                />
              ))}
            {status === "loading" && (
              <CircularProgress sx={{ margin: "2rem 0" }} />
            )}
            {status === "failed" && (
              <Alert sx={{ margin: "2rem 0" }} severity="error">
                {error}
              </Alert>
            )}
          </>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <PendingActionsIcon />
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Actions
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <Chip
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Members"
              icon={<PeopleIcon fontSize="small" />}
            />
            <Chip
              icon={<ImageIcon fontSize="small" />}
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Cover"
              onClick={() => dispatch(changeCardCover(true))}
            />
            <Chip
              icon={<LabelIcon fontSize="small" />}
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Labels"
              onClick={() => dispatch(toggleLabelModel())}
            />
          </Box>
        </Grid>
      </Grid>
      <LabelModel />
      <ChangeCoverModel cardId={data.id} />
    </Box>
  );
};

export default DetailsSection;
