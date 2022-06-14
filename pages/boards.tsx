import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import AddNewBoard from "../components/boards/AddNewBoard";
import Board from "../components/boards/board";
import Header from "../components/global/Header";
import { useAppDispatch } from "../hooks/redux";
import { toggleAddNewBoardCard } from "../store/UIReducer";

const Boards: NextPage = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ background: "#E5E7E6", minHeight: "100vh" }}>
      <Header />
      <Box
        sx={{
          maxWidth: "1100px",
          margin: "5rem auto",
          padding: "4rem 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2em",
          }}
        >
          <Typography variant="h6">All boards</Typography>
          <Button onClick={() => dispatch(toggleAddNewBoardCard())}>
            Add New
          </Button>
        </Box>
        <Grid sx={{ justifyContent: "center" }} container spacing={4}>
          <Grid item>
            <Board />
          </Grid>
          <Grid item>
            <Board />
          </Grid>
          <Grid item>
            <Board />
          </Grid>
          <Grid item>
            <Board />
          </Grid>
        </Grid>
      </Box>
      <AddNewBoard />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default Boards;
