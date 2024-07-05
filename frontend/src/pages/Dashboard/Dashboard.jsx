import BoardContent from "./BoardContent/BoardContent";
import { Box } from "@mui/material";
import { respond } from "../../components/SpeechRecognition/re";
import React, { useEffect, useState } from "react";

let play = false;

function Dashboard() {
  useEffect(() => {
    if (play === false) {
      respond(
        "Trang Web đã được khởi động. Bạn muốn tìm kiếm sách hay bài hát gì ạ"
      );
      play = true;
      console.log("khởi động", play);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <BoardContent />
    </Box>
  );
}

export default Dashboard;
