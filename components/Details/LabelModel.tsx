import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LabelIcon from "@mui/icons-material/Label";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleCoverModel, toggleLabelModel } from "../../store/UIReducer";
import {
  Alert,
  Avatar,
  Chip,
  CircularProgress,
  Input,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  borderRadius: "12px",
  p: 2,
};

export default function LabelModel() {
  const dispatch = useAppDispatch();
  const labelModel = useAppSelector((state) => state.ui.labelModel);
  const handleOpen = () => dispatch(toggleLabelModel());
  const handleClose = () => dispatch(toggleLabelModel());
  const [labelName, setLabelName] = React.useState("");
  const theme = useTheme();

  return (
    <div>
      <Modal
        open={labelModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontWeight: "600" }} gutterBottom variant="h6">
            Select Label
          </Typography>
          <Typography
            sx={{ fontSize: "1.1em", color: "#828282" }}
            gutterBottom
            variant="h6"
          >
            Select a name and a color for the label.
          </Typography>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: "10px 10px",
            }}
          >
            <Input
              onChange={(e) => {
                setLabelName(e.target.value);
              }}
              value={labelName}
              placeholder="Label..."
              disableUnderline
              fullWidth
            />
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: "5px",
              overflow: "auto",
              maxHeight: "240px",
            }}
          >
            <Box
              sx={{
                width: "75px",
                height: "50px",
                background: "red",
                borderRadius: "8px",
              }}
            >
              {" "}
            </Box>
            <Box
              sx={{
                width: "75px",
                height: "50px",
                background: "yellow",
                borderRadius: "8px",
              }}
            >
              {" "}
            </Box>
            <Box
              sx={{
                width: "75px",
                height: "50px",
                background: theme.palette.secondary.light,
                borderRadius: "8px",
              }}
            >
              {" "}
            </Box>
            <Box
              sx={{
                width: "75px",
                height: "50px",
                background: "red",
                borderRadius: "8px",
              }}
            >
              {" "}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                color: "#BDBDBD",
              }}
            >
              <LabelIcon />
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                Availables
              </Typography>
            </Box>
            <Stack sx={{ my: 1 }} flexWrap={"wrap"} direction={"row"} gap={1}>
              <Chip variant="outlined" label="Label 1" />
              <Chip variant="outlined" label="Label 2" />
              <Chip variant="outlined" label="Label 3" />
              <Chip variant="outlined" label="Label 4" />
              <Chip variant="outlined" label="Label 5" />
            </Stack>
          </Box>
          <Box sx={{ my: 1, textAlign: "center" }}>
            <Button
              sx={{
                textTransform: "Capitalize",
                fontWeight: "bold",
                px: 7,
                "&:hover": {
                  boxShadow: 0,
                },
              }}
              size="large"
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
