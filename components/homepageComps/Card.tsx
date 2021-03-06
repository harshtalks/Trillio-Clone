import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../hooks/redux";
import {
  setCurrentList,
  toggleAddNewMember,
  toggleCardDetailsModel,
} from "../../store/UIReducer";
import { Card } from "@prisma/client";
import Image from "next/image";
import AddNewMember from "../smallerComps/AddNewMember";
import { loadCardData } from "../../store/cardScreenReducer";

const Card = ({
  cardData,
  listName,
}: {
  cardData: Card;
  listName?: string;
}) => {
  const dispatch = useAppDispatch();
  return (
    <motion.div whileHover={{ cursor: "pointer", scale: 1.01 }}>
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
        <Box
          onClick={() => {
            dispatch(toggleCardDetailsModel());
            dispatch(loadCardData(cardData.id));
            dispatch(setCurrentList(listName));
          }}
        >
          {cardData.image && (
            <Box
              sx={{
                width: "100%",
                height: "150px",
                position: "relative",
                margin: "0 auto",
                marginBottom: "10px",
              }}
            >
              <Image
                style={{ borderRadius: "12px" }}
                src={cardData.image}
                alt="img"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </Box>
          )}
          <Typography gutterBottom variant="h6">
            {cardData.name}
          </Typography>
          <Stack direction={"row"} gap={2}>
            <Chip variant="outlined" label="concept" color="success" />
            <Chip variant="outlined" label="concept" color="info" />
          </Stack>
        </Box>
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
          <Tooltip title="Add member">
            <AddNewMember addType="card" cardId={cardData.id} />
          </Tooltip>
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
    </motion.div>
  );
};

export default Card;
