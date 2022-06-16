import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const BoardLoaderScreen = () => {
  return (
    <Grid item>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={200} height={150} />
        <Skeleton variant="text" />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={50} />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default BoardLoaderScreen;
