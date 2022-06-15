import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LogoutFeedBack from "../components/feedback/LogoutFeedBack";
import Header from "../components/global/Header";
import MemberSection from "../components/global/MemberSection";
import { useAppSelector } from "../hooks/redux";

type layout = {
  children: React.ReactNode;
};

const Layout = ({ children }: layout) => {
  const logoutFeedback = useAppSelector((state) => state.ui.signingOut);
  const signinOut = useAppSelector((state) => state.ui);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header />
      <MemberSection />
      {logoutFeedback && <LogoutFeedBack />}
      <Box
        sx={{
          background: "#f8f9fa",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          margin: "1em",
          padding: "1em",
          minHeight: "70vh",
          overflowX: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
