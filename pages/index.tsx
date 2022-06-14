import { Alert, Box, Grid, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import List from "../components/homepageComps/List";
import Layout from "../layout/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
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

  return {
    props: { session },
  };
};

export default Home;
