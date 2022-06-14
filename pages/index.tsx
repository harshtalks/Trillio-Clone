import { Box, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography sx={{ whiteSpace: "nowrap" }} variant="h1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
        dignissimos quidem asperiores impedit in sequi sapiente, deleniti
        obcaecati doloremque tempore vitae cupiditate ad inventore sint modi
        esse saepe eveniet et.
      </Typography>
      <Typography variant="h1">Thillo</Typography>
      <Typography variant="h1">Thillo</Typography>
      <Typography variant="h1">Thillo</Typography>
      <Typography variant="h1">Thillo</Typography>
      <Typography variant="h1">Thillo</Typography>
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
