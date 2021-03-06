import { Alert, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import React, { useEffect } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  saveListId,
  toggleListModel,
  toggleNewCard,
} from "../../store/UIReducer";
import {
  Card as CardProps,
  Label,
  List as ListProps,
  MemberCard,
} from "@prisma/client";
import { listProps } from "../../types/types";

const List = ({ show, listId }: { show: boolean; listId?: string }) => {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) =>
    state.boardSceen.lists.find((list) => list.id === listId)
  );

  return (
    <Box sx={{ width: "300px" }}>
      {show ? (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <Typography fontWeight={500} variant="body1">
              {list?.name}
            </Typography>
            <motion.div whileHover={{ opacity: 0.8, cursor: "pointer" }}>
              <MenuIcon sx={{ color: "#828282" }} />
            </motion.div>
          </Box>
          <Box>
            {list &&
              list.card &&
              list.card.map((card: CardProps) => {
                return (
                  <Card key={card.id} cardData={card} listName={list!.name} />
                );
              })}
            <Alert
              action={
                <Button
                  onClick={() => {
                    dispatch(saveListId(list?.id));
                    dispatch(toggleNewCard(true));
                  }}
                >
                  <AddRoundedIcon sx={{ cursor: "pointer" }} color="info" />
                </Button>
              }
              severity="info"
            >
              Add new card
            </Alert>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            margin: "20px 0",
          }}
        >
          <Alert
            action={
              <Button onClick={() => dispatch(toggleListModel(true))}>
                <AddRoundedIcon sx={{ cursor: "pointer" }} color="warning" />
              </Button>
            }
            color="warning"
            severity="info"
          >
            Add new list
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default List;
