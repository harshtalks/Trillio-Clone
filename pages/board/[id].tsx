import { Alert, AlertTitle, Box, Grid, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import List from "../../components/homepageComps/List";
import Layout from "../../layout/Layout";
import styles from "../../styles/Home.module.css";
import Details from "../../components/Details";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import prisma from "../../prisma/prisma";
import { BoardProps } from "../../types/types";
import { storeBoard } from "../../store/boardScreenReducer";
import { loadUsers } from "../../store/userReducers";

const Home: NextPage = (props: any) => {
  const boardData: BoardProps | null = props.boardData;
  const error: string | null = props.error;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardData) {
      dispatch(storeBoard(boardData));
    }
  }, []);

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
        <Grid container spacing={4}>
          <Grid item>
            <List show={true} />
          </Grid>
          <Grid item>
            <List show={true} />
          </Grid>
          <Grid item>
            <List show={false} />
          </Grid>
        </Grid>
      )}
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
