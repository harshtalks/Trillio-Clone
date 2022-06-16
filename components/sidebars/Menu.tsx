import { Chip, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import React from "react";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSideMenu } from "../../store/UIReducer";

const Menu = () => {
  const dispatch = useAppDispatch();
  //
  const open = useAppSelector((state) => state.ui.sideMenu);
  //

  //
  return (
    <Box
      sx={{
        width: "500px",
        height: "90vh",
        zIndex: "100000",
        position: "fixed",
        bottom: "0",
        right: "10px",
        background: "#fff",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        borderRadius: "12px",
        border: "1px solid black",
        padding: "1.5em 1em",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6">
          Devchallenges Board
        </Typography>
        <CloseIcon
          onClick={() => dispatch(toggleSideMenu())}
          sx={{ cursor: "pointer" }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <AccountCircleIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Made by
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "20px 0",
          marginBottom: "30px",
        }}
      >
        <Avatar
          sx={{ borderRadius: "8px" }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Box>
          <Typography
            sx={{ color: "#333333", fontWeight: "600" }}
            variant="body1"
          >
            Harsh Pareek
          </Typography>
          <Typography
            sx={{ color: "#BDBDBD", fontWeight: "600" }}
            variant="body2"
          >
            on 4 July, 2022
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <DescriptionIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Description
        </Typography>
        <Chip
          label="Edit"
          icon={<EditIcon />}
          sx={{
            padding: "10px 15px",
            borderRadius: "8px",
            background: "#F2F2F2",
            fontSize: "16px",
            marginLeft: "20px",
          }}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia quis
          sed maxime libero consequuntur possimus! Quis eveniet, doloremque
          consequatur, nihil dolor assumenda earum facilis beatae porro laborum
          veniam sapiente voluptatum.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "20px 0",
          color: "#BDBDBD",
        }}
      >
        <GroupsIcon />
        <Typography sx={{ fontWeight: "800" }} variant="body1">
          Team
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography
              sx={{ color: "#333333", fontWeight: "600" }}
              variant="body1"
            >
              Harsh Pareek
            </Typography>
          </Box>
          <Chip
            sx={{
              padding: "10px 15px",
              borderRadius: "8px",
              background: "#F2F2F2",
            }}
            label="admin"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography
              sx={{ color: "#333333", fontWeight: "600" }}
              variant="body1"
            >
              Harsh Pareek
            </Typography>
          </Box>
          <Chip
            sx={{
              padding: "10px 15px",
              borderRadius: "8px",
              background: "#F2F2F2",
            }}
            label="admin"
          />
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography
              sx={{ color: "#333333", fontWeight: "600" }}
              variant="body1"
            >
              Harsh Pareek
            </Typography>
          </Box>
          <Chip
            sx={{
              padding: "10px 15px",
              borderRadius: "8px",
              background: "#F2F2F2",
            }}
            label="admin"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
