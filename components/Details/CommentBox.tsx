import { Avatar, Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CommentBox = () => {
  return (
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
        alt="avatar"
        src="https://i.pravatar.cc/300"
      />
      <Input
        disableUnderline
        multiline={true}
        minRows={5}
        placeholder="Write the comment..."
        fullWidth
        sx={{
          "&::placeholder": {
            fontWeight: "bold",
          },
        }}
      />
      <Button sx={{ alignSelf: "flex-end" }}>comment</Button>
    </Box>
  );
};

export default CommentBox;
