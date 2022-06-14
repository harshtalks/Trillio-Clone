import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar, CircularProgress } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch } from "../../hooks/redux";
import {
  hideSignoutFeedback,
  showSignoutFeedback,
} from "../../store/UIReducer";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return status === "loading" ? (
    <CircularProgress />
  ) : session?.user ? (
    <div>
      <Button
        id="demo-positioned-button"
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="info"
        sx={{ color: "black" }}
      >
        <Avatar
          sx={{
            marginRight: "10px",
            borderRadius: "8px",
            width: "32px",
            height: "32px",
          }}
          alt="Remy Sharp"
          src={session?.user.image}
        />
        {session?.user.name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(showSignoutFeedback());
            signOut({ callbackUrl: `${window.location.origin}/login` });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  ) : null;
}
