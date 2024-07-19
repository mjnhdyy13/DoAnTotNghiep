import { useEffect, useState, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom";
import {
  Rating,
  Box,
  Typography,
  Button,
  Avatar,
  Breadcrumbs,
  Link,
  Grid,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { respond } from "../../components/SpeechRecognition/re";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as BookService from "../../services/BookService";
//test
import { setRecognizedText } from "../../redux/slice/speechSlice";
import "../../css/highlight.css";

let play = false;
let utterance = null;
let volumeR = 0.5;

function ReadBook(props) {
  const findChapterById = (bookObject, chapterId) => {
    // Lặp qua mảng 'Chuong'
    for (let i = 0; i < bookObject.chapter.length; i++) {
      console.log("lap", bookObject.chapter[i]);
      // So sánh ID của chương với chapterId cần tìm
      if (bookObject.chapter[i]._id === chapterId) {
        // Nếu tìm thấy, trả về đối tượng chương
        return bookObject.chapter[i];
      }
    }
    // Nếu không tìm thấy, trả về null hoặc thông báo lỗi tùy ý
    return null;
  };

  const navigate = useNavigate();

  let recognizedText = useSelector((state) => state.speech.recognizedText);
  // Truy cập thông tin của chương từ props
  const location = useLocation();

  //const chapterInfo = location.state?.chapterInfo;
  const bookInfo = location.state?.bookInfo;
  const chapterInfo = findChapterById(
    bookInfo,
    window.location.search.substring(1)
  );

  console.log("chuong o readbook", chapterInfo);
  console.log("bookInfo o readbook", bookInfo);

  const [text, setText] = useState(chapterInfo?.content);
  const [page, setPage] = useState(false);

  //Biến cho phần highlight
  const [highlightIndex, setHighlightIndex] = useState(chapterInfo?.time);
  const [isRunning, setIsRunning] = useState(false);
  //const hasRunRef = useRef(false); // Thêm cờ để theo dõi
  const highlightIndexRef = useRef(highlightIndex);

  console.log("is runinig 0", isRunning);

  const SpeechSynthesisUtterance =
    window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

  //Lấy dữ liệu time cho highlight
  useEffect(() => {
    if (chapterInfo) {
      setHighlightIndex(chapterInfo.time);
      console.log("set lúc đầu");
    }
  }, [chapterInfo]);

  // useEffect(() => {
  //   if (page === true) {
  //     window.location.reload();
  //   }
  // }, [page]);

  // Hàm bắt đầu highlight
  const startHighlight = () => {
    setIsRunning(true);
  };

  // Hàm dừng highlight
  const stopHighlight = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    highlightIndexRef.current = highlightIndex;
  }, [highlightIndex]);

  const highlightText = () => {
    console.log("highligh", highlightIndex);
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={index < highlightIndex + 1 ? "highlight" : ""}
      >
        {word}{" "}
      </span>
    ));
  };

  const renderTextWithHighlight = () => {
    return (
      <Typography
        variant="subtitle1"
        fontSize={{ xs: 24, sm: 26, md: 28 }}
        fontFamily={"revert-layer"}
        letterSpacing={1}
        lineHeight={2}
      >
        {highlightText()}
      </Typography>
    );
  };

  console.log("load");

  const handleBeforeOut = async (event) => {
    var chapter = findChapterById(bookInfo, chapterInfo._id);
    console.log("chapter can tim", chapter);
    console.log("highligh in out", highlightIndex);

    chapter.time = highlightIndexRef.current;
    console.log("chapter.time", chapter.time);

    console.log("bookid232", bookInfo);

    play = false;
    setIsRunning(false);
    speechSynthesis.cancel();

    try {
      const res1 = await BookService.updateProduct(bookInfo._id, bookInfo);
      if (res1?.status === "OK") {
        console.log("hh", res1.data);
      }
    } catch (error) {
      console.error("Failed to update book info", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "x") {
      console.log("dung doc");
      stopHighlight();
      speechSynthesis.pause();
    }
    if (event.key === "s") {
      startHighlight();
      speechSynthesis.resume();
    }

    if (event.key === "h") {
      // handleBeforeOut();
      chapterInfo.time = 0;
      setHighlightIndex(0);
      startHighlight();
    }
    if (event.key === "Enter") {
      //test
      startHighlight();
    }
  };

  useEffect(() => {
    window.navigation.addEventListener("navigate", handleBeforeOut);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeOut);

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("beforeunload", handleBeforeOut);
      window.navigation.removeEventListener("navigate", handleBeforeOut);
      window.removeEventListener("keydown", handleKeyDown); // Remove listener
    };
  }, []);
  useEffect(() => {
    if (play === false) {
      window.scrollTo(0, 0);
      respond("Bạn muốn đọc tiếp hay đọc lại từ đầu");
      play = true;
      console.log("kiểm tra", play);
    }
  }, []);

  function getNumberFromString(text) {
    // Tìm số trong chuỗi
    const pattern = /chương\s*(\d+)/i;
    const match = text.match(pattern);

    if (match && match[1]) {
      // Trả về số tìm thấy
      return parseInt(match[1], 10);
    } else {
      // Nếu không tìm thấy số, trả về null hoặc một giá trị mặc định
      return null;
    }
  }

  useEffect(() => {
    if (recognizedText.toLocaleLowerCase().includes("đọc tiếp tục")) {
      startHighlight();
    }
    if (recognizedText.toLocaleLowerCase().includes("đọc từ đầu")) {
      chapterInfo.time = 0;
      setHighlightIndex(0);
      startHighlight();
    }
    if (recognizedText.toLocaleLowerCase().includes("dừng")) {
      console.log("dung doc");
      stopHighlight();
      //speechSynthesis.pause();
      speechSynthesis.cancel();
    }
    if (recognizedText.toLocaleLowerCase().includes("tiếp tục")) {
      console.log("tiếp tục");
      startHighlight();
      //speechSynthesis.resume();
    }
    if (recognizedText.toLocaleLowerCase().includes("tăng âm thanh")) {
      volumeR = 1;
      console.log("tăng âm lượng", volumeR);

      speechSynthesis.cancel();
      respond("Âm thanh đã được tăng");
    }
    if (recognizedText.toLocaleLowerCase().includes("giảm âm thanh")) {
      volumeR = 0.2;
      console.log("giảm âm lượng", volumeR);

      speechSynthesis.cancel();
      respond("Âm thanh đã được giảm");
    }
    if (recognizedText.toLocaleLowerCase().includes("chương tiếp")) {
      let number = getNumberFromString(chapterInfo.name);
      let nextChapter = bookInfo.chapter[number];
      console.log("nextchap", nextChapter);
      console.log("number", number);
      if (number < bookInfo.chapter.length) {
        play = false;
        navigate(`/read-book?${nextChapter?._id}`, {
          state: {
            bookInfo: bookInfo,
            chapterInfo: bookInfo.chapter[number],
          },
        });
      } else {
        respond("Không có chương sau");
      }
    }
    if (recognizedText.toLocaleLowerCase().includes("trước đó")) {
      let number = getNumberFromString(chapterInfo.name);
      let previousChapter = bookInfo.chapter[number - 2];
      console.log("previousChapter", previousChapter);
      console.log("number", number);
      if (number - 2 >= 0) {
        play = false;
        console.log("in readbook");
        navigate(`/read-book?${previousChapter?._id}`, {
          state: {
            bookInfo: bookInfo,
            chapterInfo: bookInfo.chapter[number - 2],
          },
        });
      } else {
        respond("Không có chương trước");
      }
      // } else if (
      //   recognizedText.toLocaleLowerCase().includes("xin lỗi" || "yêu cầu")
      // ) {
      //   console.log("in bug1");
      // } else {
      //   console.log("in void", recognizedText);
      //   respond("Xin lỗi, bạn có thể lặp lại yêu cầu không ạ");
      // }
    }
  }, [recognizedText]);

  // useEffect sử dụng đọc cả bài
  useEffect(() => {
    if (isRunning) {
      //console.log("hasrung", hasRunRef.current);
      console.log("isRunning", isRunning);
      //hasRunRef.current = true;

      if (chapterInfo) {
        setHighlightIndex(chapterInfo.time);
      }

      // Tách văn bản thành mảng các từ
      const words = text.split(" ");

      let textRead = words.slice(highlightIndex + 1).join(" ");
      let wordIndex = highlightIndex;
      console.log("word", wordIndex);
      console.log("Đang chạy ở ngoài", highlightIndex);

      //const utterance = new SpeechSynthesisUtterance(textRead);
      utterance = new SpeechSynthesisUtterance(textRead);
      console.log("âm lượng", volumeR);
      utterance.volume = volumeR;
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setTimeout(() => {
            console.log("Đang chạy", wordIndex);

            setHighlightIndex(wordIndex);
            console.log("Đang chạy 1", highlightIndex);
            wordIndex++;
          }, 1000); // Đặt thời gian trễ phù hợp, ví dụ 100ms
        }
      };

      utterance.onend = () => {
        setHighlightIndex(null);
      };

      speechSynthesis.speak(utterance);
    }
  }, [isRunning, text.length]);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#363636" : "#E6E6FA",
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: "80%" },
            height: "100%",
            overflow: "hidden",
            mt: 2,
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/genre-detail">
              Danh sách
            </Link>
            <Link underline="hover" color="inherit" href="/book-detail">
              Thông tin sách
            </Link>
            <Typography color="text.primary">{chapterInfo?.name}</Typography>
          </Breadcrumbs>
          <Box>
            <Box gap={1} display={"flex"} flexDirection={"column"}>
              <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
                {bookInfo?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                    bgcolor: "#1E90FF",
                  }}
                >
                  Chương trước
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                >
                  Danh sách
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                >
                  Chương tiếp
                </Button>
              </Box>
              <Divider />
              <Box>
                <p>{renderTextWithHighlight()}</p>

                <Typography
                  variant="subtitle1"
                  fontSize={{ xs: 24, sm: 26, md: 28 }}
                  fontFamily={"revert-layer"}
                  letterSpacing={1}
                  lineHeight={2}
                >
                  {chapterInfo?.content}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                    bgcolor: "#1E90FF",
                  }}
                >
                  Chương trước
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                >
                  Danh sách
                </Button>
                <Button
                  sx={{
                    bgcolor: "#1E90FF",
                    color: "white",
                    ":hover": { bgcolor: "gray" },
                  }}
                >
                  Chương tiếp
                </Button>
              </Box>
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="h5" fontWeight={"bold"}>
                Bình luận và đánh giá
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <div></div>
    </div>
  );
}

export default ReadBook;
