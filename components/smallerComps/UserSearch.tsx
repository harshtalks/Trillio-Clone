import { Box, Button, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const UserSearch = () => {
  return (
    <Box
      sx={{
        borderRadius: `${8}px`,
        padding: "5px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Input
        sx={{ marginLeft: "10px" }}
        disableUnderline
        placeholder="keywords"
      />
      <Button
        sx={{
          boxShadow: "none",
          borderRadius: `${8}px`,
          textTransform: "capitalize",
        }}
        variant="contained"
        color="info"
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default UserSearch;
