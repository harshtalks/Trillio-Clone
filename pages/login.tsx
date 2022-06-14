import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        background: "#E5E7E6",
        width: "100%",
        height: "100vh",
        padding: "4rem 2rem",
      }}
    >
      <Typography
        gutterBottom
        sx={{ fontWeight: "600" }}
        textAlign={"center"}
        variant="h2"
      >
        Thullo
      </Typography>
      <Typography
        gutterBottom
        sx={{ fontWeight: "500" }}
        textAlign={"center"}
        variant="h4"
      >
        Welcome, Please login to continue.
      </Typography>
      <Divider sx={{ margin: "2rem" }} />

      <Box
        sx={{
          background: "#F7F7F2",
          borderRadius: "12px",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          padding: "3rem",
        }}
      >
        <Chip
          sx={{
            borderRadius: "8px",
            padding: "1.5rem",
            fontWeight: "500",
            fontSize: "1rem",
            background: "#1C3041",
            color: "white",
          }}
          onClick={() => {
            signIn("github", { callbackUrl: `${window.location.origin}/` });
          }}
          icon={<GitHubIcon sx={{ fill: "white" }} />}
          label="Signin using Github"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
            gap: "1em",
          }}
        >
          <Box sx={{ width: "20%" }}>
            <Divider />
          </Box>
          <Typography variant="body1">Or continue with</Typography>
          <Box sx={{ width: "20%" }}>
            <Divider />
          </Box>
        </Box>
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Signin using Google">
            <GoogleIcon />
          </Tooltip>
          <Tooltip title="Signin using Facebook">
            <FacebookIcon
              onClick={() =>
                signIn("facebook", {
                  callbackUrl: `${window.location.origin}/`,
                })
              }
            />
          </Tooltip>
          <Tooltip title="Signin using Twitter">
            <TwitterIcon
              onClick={() =>
                signIn("twitter", {
                  callbackUrl: `${window.location.origin}/`,
                })
              }
            />
          </Tooltip>
        </Stack>
        <Typography sx={{ marginTop: "20px" }} variant="body1">
          Made with Love &hearts;
        </Typography>
        <Typography variant="body1">
          &copy; 2022 <a href="https://harshtalkss.netlify.app">Harsh Pareek</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
