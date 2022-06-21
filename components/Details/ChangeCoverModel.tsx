import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeCardCover } from "../../store/UIReducer";
import {
  Alert,
  Avatar,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { LoadingButton } from "@mui/lab";
import Fetcher from "../../lib/fetcher";
import { loadCardData } from "../../store/cardScreenReducer";

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

export default function ChangeCoverModel({ cardId }: { cardId: string }) {
  const dispatch = useAppDispatch();
  const changeCover = useAppSelector((state) => state.ui.cardCover);
  const handleOpen = () => dispatch(changeCardCover(true));
  const handleClose = () => dispatch(changeCardCover(false));
  const [image, setImage] = React.useState([] as any);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [loadSaving, setLoadSaving] = React.useState(false);

  const [selected, setSelected] = React.useState("");
  const [selectImage, setSelectImage] = React.useState("");

  const getImage = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${window.location.origin}/api/getImages`, {
        method: "POST",
        body: JSON.stringify({ query: query }, null, 2),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log(result);
      setImage(result.results);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const changeImage = async () => {
    setLoadSaving(true);

    try {
      const card = await Fetcher("/changeBackground", {
        cardId: cardId,
        image: selectImage,
      });

      if (card.error) {
        throw new Error(card.error);
      }

      setLoadSaving(false);
      dispatch(changeCardCover(false));
      dispatch(loadCardData(cardId));
    } catch (e: any) {
      alert(e.message);
      setLoadSaving(false);
    }
  };

  return (
    <div>
      <Modal
        open={changeCover}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontWeight: "600" }} gutterBottom variant="h6">
            Photo Search
          </Typography>
          <Typography
            sx={{ fontSize: "1.1em", color: "#828282" }}
            gutterBottom
            variant="h6"
          >
            Search for a photo on unsplash to use as your cover photo
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
                if (query === "") {
                  setImage([]);
                }
                setQuery(e.target.value);
              }}
              value={query}
              placeholder="Keywords..."
              disableUnderline
              fullWidth
            />
            <Button
              onClick={() => {
                getImage(query);
              }}
              variant="outlined"
            >
              <SearchIcon />
            </Button>
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
            {query === "" ? (
              <Alert severity="error">Please Enter a keyword.</Alert>
            ) : loading ? (
              <CircularProgress />
            ) : (
              image.map((item: any) => {
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{
                      opacity: 0.7,
                      scale: 1.01,
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      sx={{
                        borderRadius: "8px",
                        height: "75px",
                        width: "75px",
                        opacity: selected === item.id ? "0.2" : 1,
                        transform:
                          selected === item.id ? "scale(1.01)" : "none",
                      }}
                      src={item.urls.small}
                      alt="random"
                      onClick={() => {
                        setSelected(item.id);
                        setSelectImage(item.urls.small);
                      }}
                    />
                  </motion.div>
                );
              })
            )}
          </Box>
          <LoadingButton
            onClick={changeImage}
            disabled={selectImage === ""}
            loading={loadSaving ? true : false}
            size="medium"
            variant="outlined"
          >
            Save
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
