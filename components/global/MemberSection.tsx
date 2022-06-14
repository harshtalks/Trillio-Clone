import { Avatar, Box, Chip, Stack } from "@mui/material";
import React from "react";
import AddNewMember from "../smallerComps/AddNewMember";
import ChangeVisibility from "../smallerComps/ChangeVisibility";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../sidebars/Menu";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSideMenu } from "../../store/UIReducer";

const MemberSection = () => {
  const sideMenu = useAppSelector((state) => state.ui.sideMenu);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box
        sx={{
          padding: "2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "2em",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "2em" }}>
          <ChangeVisibility />
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              sx={{ borderRadius: "8px" }}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
            <AddNewMember />
          </Stack>
        </Box>
        <Chip
          sx={{
            padding: "10px",
            borderRadius: "8px",
            background: "#F2F2F2",
            color: "#828282",
            fontSize: "12px",
            fontWeight: "500",
          }}
          icon={<MenuIcon />}
          label="Show Menu"
          onClick={() => dispatch(toggleSideMenu())}
        />
      </Box>
      {sideMenu ? <Menu /> : null}
    </>
  );
};

export default MemberSection;
