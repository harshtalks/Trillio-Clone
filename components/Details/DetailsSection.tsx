import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Grid,
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
import { toggleCoverModel, toggleLabelModel } from "../../store/UIReducer";
import LabelModel from "./LabelModel";
import { CardProps } from "../../types/types";
import { loadComments } from "../../store/commentsReducer";

const DetailsSection = ({ data }: { data: CardProps }) => {
  const dispatch = useAppDispatch();
  const listName = useAppSelector((state) => state.ui.currentList);
  const {
    data: comments,
    error,
    status,
  } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(loadComments(data.id));
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
            <Typography>{data.description}</Typography>
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
              onClick={() => dispatch(toggleCoverModel())}
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
    </Box>
  );
};

export default DetailsSection;
