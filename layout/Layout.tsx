import { Box } from "@mui/material";
import React from "react";
import Header from "../components/global/Header";
import MemberSection from "../components/global/MemberSection";

type layout = {
  children: React.ReactNode;
};

const Layout = ({ children }: layout) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <MemberSection />
      <Box
        sx={{
          background: "#E5E7E6",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          margin: "1em",
          padding: "1em",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
