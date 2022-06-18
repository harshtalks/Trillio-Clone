import { LoadingButton } from "@mui/lab";
import { Alert, Avatar, Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Fetcher from "../../lib/fetcher";
import { loadCardData } from "../../store/cardScreenReducer";
import { loadComments } from "../../store/commentsReducer";
import { CardProps } from "../../types/types";

const CommentBox = ({ data }: { data: CardProps }) => {
  const user = useAppSelector((state) => state.boardSceen.user);
  const [commentText, setCommentText] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const dispatch = useAppDispatch();

  const handleSaveComment = async () => {
    if (commentText === "") {
      setError("Please enter a comment");
      return;
    }

    let result;
    setLoading(true);
    try {
      result = await Fetcher("/addComment", {
        userId: user.id,
        cardId: data.id,
        text: commentText,
      });
      setLoading(false);
      setCommentText("");
      dispatch(loadComments(data.id));
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  };
  return (
    <>
      {error !== "" && <Alert sx={{ my: 2 }}>{error}</Alert>}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px 20px",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          sx={{ borderRadius: "8px" }}
          alt={user.name ? user.name : "avatar"}
          src={user.image ? user.image : ""}
        />
        <Input
          disableUnderline
          multiline={true}
          minRows={5}
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            setError("");
          }}
          placeholder="Write the comment..."
          fullWidth
          sx={{
            "&::placeholder": {
              fontWeight: "bold",
            },
          }}
        />
        <LoadingButton
          loading={loading ? true : false}
          sx={{ alignSelf: "flex-end" }}
          onClick={handleSaveComment}
        >
          comment
        </LoadingButton>
      </Box>
    </>
  );
};

export default CommentBox;
