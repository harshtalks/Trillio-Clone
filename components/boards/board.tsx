import { Avatar, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Member, User } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import img from "../../assets/jpg/image.jpeg";
import { useAppDispatch } from "../../hooks/redux";
import { storeBoard } from "../../store/boardScreenReducer";
import { BoardProps } from "../../types/types";

const Board = ({ board }: { board: BoardProps }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ cursor: "pointer", scale: 1.02 }}
    >
      <Box
        onClick={() => {
          dispatch(storeBoard(board));
          router.push(`/board/${board.id}`);
        }}
        sx={{
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          background: "white",
          padding: "0.75em",
          minWidth: "243px",
        }}
      >
        {board.image && (
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
              src={board.image}
              alt="img"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </Box>
        )}
        <Typography
          sx={{ marginTop: "5px", marginBottom: "10px" }}
          gutterBottom
          variant="h6"
        >
          {board.name}
        </Typography>
        <Stack
          sx={{ marginTop: "20px", alignItems: "center" }}
          direction="row"
          spacing={1}
        >
          {board.members.length > 3 &&
            board.members.map((member: Member & { user: User }) => {
              return (
                <Avatar
                  key={member.id}
                  src={member.user.image ? member.user.image : ""}
                  sx={{ borderRadius: "8px", width: "24px", height: "24px" }}
                  alt={member.user.name ? member.user.name : "avatar"}
                />
              );
            })}

          <Typography sx={{ color: "#BDBDBD" }} variant="body2">
            +5 more
          </Typography>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default Board;
