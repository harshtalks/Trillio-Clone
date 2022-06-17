import { Theme, useMediaQuery } from "@mui/material";
import React from "react";

const useMediaPoints = () => {
  const small = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const medium = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const smallest = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  return { small, medium, smallest };
};

export default useMediaPoints;
