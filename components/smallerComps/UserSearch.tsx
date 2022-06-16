import { Box, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";

type propSearch = {
  nameQuery: string;
  setNameQuery: React.Dispatch<React.SetStateAction<string>>;
};

const UserSearch = ({ nameQuery, setNameQuery }: propSearch) => {
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
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
        sx={{ marginLeft: "10px" }}
        disableUnderline
        placeholder="keywords"
      />
    </Box>
  );
};

export default UserSearch;
