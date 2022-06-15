import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";

const Login: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <Box
      sx={{
        background: "#ECE2D0",
        width: "100%",
        minHeight: "100vh",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      {status === "loading" ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              background: "rgba( 255, 255, 255, 0.10 )",
              boxShadow:
                "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
              backdropFilter: "blur( 4px )",
              borderRadius: "12px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              padding: "2rem",
              minHeight: "80vh",
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
            {session && (
              <Box
                sx={{
                  margin: "1em",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5">Recent Logins</Typography>
                <motion.div
                  onClick={() => {
                    router.push("/");
                  }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.1, cursor: "pointer" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    sx={{
                      background: "#F7F7F2",
                      borderRadius: "12px",
                      width: "fit-content",
                      padding: "2em",
                      marginTop: "1em",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "70px",
                        height: "70px",
                        marginBottom: "10px",
                      }}
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <Typography textAlign={"center"} variant="body1">
                      {session.user.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            )}
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                    signIn("github", {
                      callbackUrl: `${window.location.origin}/`,
                    });
                  }}
                  icon={<GitHubIcon sx={{ fill: "white" }} />}
                  label="Signin using Github"
                />
              </motion.div>
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GoogleIcon />
                  </motion.div>
                </Tooltip>
                <Tooltip title="Signin using Facebook">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FacebookIcon
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: `${window.location.origin}/`,
                        })
                      }
                    />
                  </motion.div>
                </Tooltip>
                <Tooltip title="Signin using Twitter">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <TwitterIcon
                      onClick={() =>
                        signIn("twitter", {
                          callbackUrl: `${window.location.origin}/`,
                        })
                      }
                    />
                  </motion.div>
                </Tooltip>
              </Stack>
              <Typography sx={{ marginTop: "20px" }} variant="body1">
                Made with Love &hearts;
              </Typography>
              <Typography variant="body1">
                &copy; 2022{" "}
                <a href="https://harshtalkss.netlify.app">Harsh Pareek</a>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Login;
