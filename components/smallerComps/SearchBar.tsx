import { Box, Button, Input } from "@mui/material";
import React from "react";

const SearchBar = () => {
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
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
