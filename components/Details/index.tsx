import { Alert, Box, CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import DetailsSection from "./DetailsSection";
import HeaderImage from "./HeaderImage";
import { motion } from "framer-motion";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleCardDetailsModel } from "../../store/UIReducer";
import { loadCardData } from "../../store/cardScreenReducer";

const Index = () => {
  const dispatch = useAppDispatch();
  const { data, error, status } = useAppSelector((state) => state.cardScreen);

  return (
    <motion.div animate={{ opacity: 1 }}>
      <Box
        sx={{
          width: "70%",
          height: "90vh",
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
        {status === "loading" && (
          <>
            <LinearProgress color="secondary" sx={{ margin: "2rem auto" }} />
          </>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {status === "succeeded" && (
          <>
            <HeaderImage image={data.image} />
            <DetailsSection data={data} />
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
          </>
        )}
      </Box>
    </motion.div>
  );
};

export default Index;
