import { Box } from "@mui/material";
import ListRow from "./ListRow/ListRow";
import { recognition } from "../../../components/SpeechRecognition/re";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { respond } from "../../../components/SpeechRecognition/re";

function BoardContent() {
  const recognizedText = useSelector((state) => state.speech.recognizedText);
  console.log("text", recognizedText);
  console.log("Trang chủ");
  useEffect(() => {
    if (recognizedText.toLocaleLowerCase().includes("tìm kiếm bài hát")) {
      console.log("bug");
    } else if (recognizedText.toLocaleLowerCase().includes("tìm kiếm sách")) {
      console.log("in bug");
    } else if (
      recognizedText.toLocaleLowerCase().includes("xin lỗi" || "yêu cầu")
    ) {
      console.log("in bug1");
    } else if (!recognizedText.trim()) {
      console.log("in bug1");
    } else if (
      recognizedText.toLocaleLowerCase().includes("trở về trang chủ")
    ) {
      console.log("in bug1");
    } else {
      console.log("in void", recognizedText);
      respond("Xin lỗi, bạn có thể lặp lại yêu cầu không ạ");
    }
  }, [recognizedText]);

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
