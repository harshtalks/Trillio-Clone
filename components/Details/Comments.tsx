import { Alert, Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Comment, User } from "@prisma/client";
import { format } from "date-fns";
import { LoadingButton } from "@mui/lab";
import Fetcher from "../../lib/fetcher";
import { useAppDispatch } from "../../hooks/redux";
import { toggleDeleteCommentSnackbar } from "../../store/UIReducer";
import { loadComments } from "../../store/commentsReducer";

const Comments = ({
  commentData,
  commentCardId,
}: {
  commentData: Comment & { user: User };
  commentCardId: string;
}) => {
  const date = format(new Date(commentData.createdAt), "MMM dd, yyyy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const deleteCommentHandler = async (id: string) => {
    setError("");
    setLoading(true);

    try {
      const result = await Fetcher("/deleteComment", { commentId: id });

      if (result.error) {
        throw new Error(result.error);
      }

      setLoading(false);
      dispatch(toggleDeleteCommentSnackbar());
      dispatch(loadComments(commentCardId));
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  };
  return (
    <Box sx={{ margin: "20px 0" }}>
      {error !== "" && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar
            sx={{ borderRadius: "8px" }}
            src={commentData.user.image ? commentData.user.image : ""}
            alt="avatar"
          />
          <Box>
            <Typography variant="h6">{commentData.user.name}</Typography>
            <Typography
              sx={{ fontWeight: "500", fontSize: "10px", color: "#BDBDBD" }}
              variant="body2"
            >
              {date}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#828282",
            fontSize: "10px",
          }}
        >
          <motion.div whileHover={{ opacity: "0.5", cursor: "pointer" }}>
            <LoadingButton
              loading={loading ? true : false}
              size="small"
              sx={{ color: "black" }}
              onClick={() => deleteCommentHandler(commentData.id)}
            >
              Delete
            </LoadingButton>
          </motion.div>
        </Box>
      </Box>
      <Typography sx={{ margin: "10px 0" }} variant="body1">
        {commentData.text}
      </Typography>
      <Divider />
    </Box>
  );
};

export default Comments;
