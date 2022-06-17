import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import AddNewBoard from "../components/boards/AddNewBoard";
import Header from "../components/global/Header";
import useGetItems from "../hooks/getBoards";
import { useAppDispatch } from "../hooks/redux";
import { toggleAddNewBoardCard } from "../store/UIReducer";
import { Board as BoardType } from "@prisma/client";
import Board from "../components/boards/board";
import BoardLoaderScreen from "../components/boards/BoardLoaderScreen";
import { BoardProps } from "../types/types";
import useMediaPoints from "../hooks/useMediaPoints";

const Boards: NextPage = (props: any) => {
  const dispatch = useAppDispatch();
  const { boards, error, loading } = useGetItems();
  const { small, smallest, medium } = useMediaPoints();

  return (
    <Box sx={{ background: "#E5E7E6", minHeight: "100vh" }}>
      <Header isBoardPage={false} />
      <Box
        sx={{
          maxWidth: "1100px",
          width: "90%",
          margin: small ? "2rem auto" : "5rem auto",
          padding: small ? "1rem auto" : "4rem 0",
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
          {loading ? (
            [1, 2, 3, 4].map((el) => {
              return <BoardLoaderScreen key={el} />;
            })
          ) : error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          ) : (
            boards.map((board: BoardProps) => {
              return (
                <Grid key={board.id} item>
                  <Board board={board} />
                </Grid>
              );
            })
          )}
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
    props: {
      session,
    },
  };
};
export default Boards;
