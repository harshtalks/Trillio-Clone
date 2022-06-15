import { Alert, Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const List = ({ show }: { show: boolean }) => {
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
              Backlog
            </Typography>
            <motion.div whileHover={{ opacity: 0.8, cursor: "pointer" }}>
              <MenuIcon sx={{ color: "#828282" }} />
            </motion.div>
          </Box>
          <Box>
            <Card />
            <Card />
            <Alert
              action={
                <AddRoundedIcon sx={{ cursor: "pointer" }} color="info" />
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
              <AddRoundedIcon sx={{ cursor: "pointer" }} color="warning" />
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
