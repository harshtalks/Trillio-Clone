import { Box, Button, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Fetcher from "../../lib/fetcher";

const UserSearch = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <Box
      sx={{
        borderRadius: `${8}px`,
        padding: "5px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
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
