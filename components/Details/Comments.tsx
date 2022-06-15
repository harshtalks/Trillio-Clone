import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { motion } from "framer-motion";

const Comments = () => {
  return (
    <Box sx={{ margin: "20px 0" }}>
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
            src="https://i.pravatar.cc/300"
            alt="avatar"
          />
          <Box>
            <Typography variant="h6">Harsh Pareek</Typography>
            <Typography
              sx={{ fontWeight: "500", fontSize: "10px", color: "#BDBDBD" }}
              variant="body2"
            >
              24 August at 4:30
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
          <motion.div whileHover={{ opacity: "0.5", cursor: "poiner" }}>
            <Typography variant="body1">Edit</Typography>
          </motion.div>
          <Typography variant="body1">-</Typography>
          <motion.div whileHover={{ opacity: "0.5", cursor: "poiner" }}>
            <Typography variant="body1">Delete</Typography>
          </motion.div>
        </Box>
      </Box>
      <Typography sx={{ margin: "10px 0" }} variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eius
        qui, aliquam, officia vel aperiam a cupiditate excepturi quaerat nobis
        modi libero, unde assumenda dolores ipsum accusamus necessitatibus
        consequatur iure.
      </Typography>
      <Divider />
    </Box>
  );
};

export default Comments;
