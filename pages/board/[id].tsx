/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../../layout/Layout";
import Details from "../../components/Details";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import prisma from "../../prisma/prisma";
import { BoardProps } from "../../types/types";
import { storeBoard } from "../../store/boardScreenReducer";
import AddNewList from "../../components/addNewList/Index";
import List from "../../components/homepageComps/List";
import AddNewCard from "../../components/addNewCard";

const Home: NextPage = (props: any) => {
  const data: BoardProps | null = props.boardData;
  const error: string | null = props.error;

  const dispatch = useAppDispatch();

  if (data) {
    dispatch(storeBoard(data));
  }

  const boardData = useAppSelector((state) => state.boardSceen);

  const detailsCardModel = useAppSelector((state) => state.ui.cardDetailsModel);

  return (
    <Layout boardData={boardData}>
      {error && (
        <Alert sx={{ margin: "2em auto" }} severity="error">
          <AlertTitle>Error Occured</AlertTitle>
          {error}
        </Alert>
      )}

      {boardData && (
        <Grid sx={{ flexWrap: "nowrap" }} container spacing={4}>
          {boardData.lists.map((list) => {
            return (
              <Grid key={list.id} item>
                <List show={true} listId={list.id} />
              </Grid>
            );
          })}
          <Grid item>
            <List show={false} />
          </Grid>
        </Grid>
      )}
      <AddNewList />
      <AddNewCard />
      {detailsCardModel && <Details />}
    </Layout>
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

  let board;
  let error;

  try {
    board = await prisma.board.findUnique({
      where: { id: context.query.id },
      include: {
        lists: {
          include: {
            card: {
              include: {
                labels: true,
                members: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        members: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });
  } catch (e: any) {
    error = e.message;
  }

  if (!board) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      boardData: board ? JSON.parse(JSON.stringify(board)) : null,
      error: error ? error : null,
    },
  };
};

export default Home;
