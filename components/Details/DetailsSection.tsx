import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import ImageIcon from "@mui/icons-material/Image";
import LabelIcon from "@mui/icons-material/Label";
import PeopleIcon from "@mui/icons-material/People";
import CommentBox from "./CommentBox";
import Comments from "./Comments";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CoverModel from "./CoverModel";
import { useAppDispatch } from "../../hooks/redux";
import { toggleCoverModel, toggleLabelModel } from "../../store/UIReducer";
import LabelModel from "./LabelModel";

const DetailsSection = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ margin: "1em 0" }}>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: "1.2em" }} variant="body1">
            This is the title of the card
          </Typography>
          <Typography
            sx={{ fontSize: "0.8em", color: "#BDBDBD", fontWeight: "bold" }}
            variant="body2"
          >
            List: <strong style={{ color: "#000" }}>In Progress</strong>
          </Typography>
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
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Description
            </Typography>
            <Chip
              label="Edit"
              icon={<EditIcon fontSize="small" />}
              sx={{
                padding: "10px 15px",
                borderRadius: "8px",
                background: "#F2F2F2",
                marginLeft: "20px",
                fontSize: "0.8em",
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "30px" }}>
            <Typography>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              quis sed maxime libero consequuntur possimus! Quis eveniet,
              doloremque consequatur, nihil dolor assumenda earum facilis beatae
              porro laborum veniam sapiente voluptatum.
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <DescriptionIcon />
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Comments
            </Typography>
          </Box>
          <CommentBox />
          <Comments />
          <Comments />
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <PendingActionsIcon />
            <Typography
              sx={{ fontWeight: "800", fontSize: "0.8em" }}
              variant="body1"
            >
              Actions
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "10px",
              color: "#BDBDBD",
            }}
          >
            <Chip
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Members"
              icon={<PeopleIcon fontSize="small" />}
            />
            <Chip
              icon={<ImageIcon fontSize="small" />}
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Cover"
              onClick={() => dispatch(toggleCoverModel())}
            />
            <Chip
              icon={<LabelIcon fontSize="small" />}
              sx={{
                minWidth: "150px",
                borderRadius: "8px",
                fontWeight: "500",
                color: "#828282",
              }}
              label="Labels"
              onClick={() => dispatch(toggleLabelModel())}
            />
          </Box>
        </Grid>
      </Grid>
      <LabelModel />
      {/* <CoverModel /> */}
    </Box>
  );
};

export default DetailsSection;
