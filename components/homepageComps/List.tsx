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
  Member,
} from "@prisma/client";

type listprops = ListProps & {
  card: Array<CardProps & { labels: Array<Label>; members: Member }>;
};

const List = ({
  show,
  listId,
  list,
}: {
  show: boolean;
  listId?: string;
  list?: listprops;
}) => {
  const dispatch = useAppDispatch();

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
                return <Card key={card.id} cardData={card} />;
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
