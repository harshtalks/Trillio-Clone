import { Avatar, Box, Chip, Stack } from "@mui/material";
import React from "react";
import AddNewMember from "../smallerComps/AddNewMember";
import ChangeVisibility from "../smallerComps/ChangeVisibility";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../sidebars/Menu";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSideMenu } from "../../store/UIReducer";
import { motion } from "framer-motion";
import { changeVisibilityAction } from "../../store/boardScreenReducer";

const MemberSection = () => {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };
  const sideMenu = useAppSelector((state) => state.ui.sideMenu);
  const dispatch = useAppDispatch();
  const publiclyVisible = useAppSelector(
    (state) => state.boardSceen.publiclyVisible
  );
  const boardMembers = useAppSelector((state) => state.boardSceen.members);
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
          <ChangeVisibility
            isVisible={publiclyVisible}
            action={changeVisibilityAction}
          />
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
            {boardMembers &&
              boardMembers.map((member) => (
                <Avatar
                  key={member.id}
                  sx={{ borderRadius: "8px" }}
                  alt={member.user.name ? member.user.name : "user"}
                  src={member.user.image ? member.user.image : ""}
                />
              ))}
            <AddNewMember addType="board" />
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
      {sideMenu ? (
        <motion.div
          transition={{ duration: 0.5 }}
          animate={sideMenu ? "open" : "closed"}
          variants={variants}
        >
          <Menu />
        </motion.div>
      ) : null}
    </>
  );
};

export default MemberSection;
