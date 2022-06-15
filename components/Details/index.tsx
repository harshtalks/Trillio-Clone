import { Box } from "@mui/material";
import React from "react";
import DetailsSection from "./DetailsSection";
import HeaderImage from "./HeaderImage";
import { motion } from "framer-motion";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../hooks/redux";
import { toggleCardDetailsModel } from "../../store/UIReducer";

const Index = () => {
  const dispatch = useAppDispatch();
  return (
    <motion.div animate={{ opacity: 1 }}>
      <Box
        sx={{
          width: "70%",
          maxHeight: "90vh",
          overflow: "auto",
          background: "#faf9f9",
          position: "absolute",
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%",
          boxShadow: "rgba(3, 122, 14, 0.6) 0px 0px 0px 3px",
          borderRadius: "12px",
          padding: "1em",
        }}
      >
        <HeaderImage />
        <DetailsSection />
        <motion.div whileHover={{ cursor: "pointer" }}>
          <CancelIcon
            onClick={() => {
              dispatch(toggleCardDetailsModel());
            }}
            color="primary"
            fontSize="large"
            sx={{ position: "absolute", right: "10px", top: "0" }}
          />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Index;
