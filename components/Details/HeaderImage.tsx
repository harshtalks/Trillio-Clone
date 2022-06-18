import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import img from "../../assets/jpg/image.jpeg";

const HeaderImage = ({ image }: { image: string | null }) => {
  return (
    <Box sx={{ height: "150px", position: "relative" }}>
      <Image
        src={image || img}
        alt="cover"
        layout="fill"
        objectFit="cover"
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

export default HeaderImage;
