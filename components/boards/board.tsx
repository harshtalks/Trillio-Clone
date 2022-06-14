import { Avatar, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import img from "../../assets/jpg/image.jpeg";

const Board = () => {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        background: "white",
        padding: "0.75em",
        minWidth: "243px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "130px",
          position: "relative",
          margin: "0 auto",
        }}
      >
        <Image
          style={{ borderRadius: "12px" }}
          src={img}
          alt="img"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Typography
        sx={{ marginTop: "5px", marginBottom: "10px" }}
        gutterBottom
        variant="h6"
      >
        Dev Challenges
      </Typography>
      <Stack
        sx={{ marginTop: "20px", alignItems: "center" }}
        direction="row"
        spacing={1}
      >
        <Avatar
          src="https://i.pravatar.cc/150?img=10"
          sx={{ borderRadius: "8px", width: "24px", height: "24px" }}
          alt="harsh"
        />
        <Avatar
          src="https://i.pravatar.cc/150?img=18"
          sx={{ borderRadius: "8px", width: "24px", height: "24px" }}
          alt="harsh"
        />
        <Avatar
          src="https://i.pravatar.cc/150?img=17"
          sx={{ borderRadius: "8px", width: "24px", height: "24px" }}
          alt="harsh"
        />
        <Typography sx={{ color: "#BDBDBD" }} variant="body2">
          +5 more
        </Typography>
      </Stack>
    </Box>
  );
};

export default Board;
