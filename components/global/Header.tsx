import { Box, Button, Chip, Input, Typography } from "@mui/material";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SearchBar from "../smallerComps/SearchBar";
import Profile from "../smallerComps/Profile";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/redux";

const Header = ({ isBoardPage = false }: { isBoardPage: boolean }) => {
  const router = useRouter();
  const boardData = useAppSelector((state) => state.boardSceen);
  return (
    <Box
      sx={{
        background: "#fff",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {isBoardPage && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography sx={{ fontSize: "18px" }} variant="h6">
              {boardData.name}
            </Typography>
            <Chip
              sx={{
                padding: "10px",
                borderRadius: "8px",
                background: "#F2F2F2",
                color: "#828282",
                fontSize: "12px",
                fontWeight: "500",
              }}
              onClick={() => {
                router.push("/");
              }}
              icon={
                <DragIndicatorIcon
                  sx={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              }
              label="All Boards"
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <SearchBar />
        <Profile />
      </Box>
    </Box>
  );
};

export default Header;
