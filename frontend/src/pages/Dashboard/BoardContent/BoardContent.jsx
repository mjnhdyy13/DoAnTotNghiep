import { Box } from "@mui/material";
import ListRow from "./ListRow/ListRow";
import { recognition } from "../../../components/SpeechRecognition/re";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BoardContent() {
  const recognizedText = useSelector((state) => state.speech.recognizedText);
  console.log("text", recognizedText);
  console.log("Trang chủ");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#363636" : "#E8E8E8",
        overflowX: "hidden",
      }}
    >
      <ListRow />
    </Box>
  );
}

export default BoardContent;
