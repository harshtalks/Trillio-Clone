import { Button, Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const Card = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        background: "white",
        padding: "1em",
        position: "relative",
        marginBottom: "1.5em",
      }}
    >
      <Typography gutterBottom variant="h6">
        Add whatever you want to add
      </Typography>
      <Stack direction={"row"} gap={2}>
        <Chip variant="outlined" label="concept" color="success" />
        <Chip variant="outlined" label="concept" color="info" />
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bottom: "0",
          width: "100%",
          marginTop: "2em",
        }}
      >
        <AddBoxRoundedIcon fontSize="large" color="primary" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#BDBDBD",
            }}
          >
            <AttachFileIcon fontSize="small" />
            <Typography variant="body2">1</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "#BDBDBD",
            }}
          >
            <MessageIcon fontSize="small" />
            <Typography variant="body2">1</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
