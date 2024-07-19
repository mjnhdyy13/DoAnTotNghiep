import { useEffect, useState } from "react";
import {
  Rating,
  Box,
  Typography,
  Button,
  Avatar,
  Breadcrumbs,
  Link,
  Grid,
  Stack,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as BookService from "../../services/BookService";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { respond } from "../../components/SpeechRecognition/re";
//test
import { setRecognizedText } from "../../redux/slice/speechSlice";

let play = false;
let bookD = null;

function BookDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  var bookId = window.location.search.substring(1);
  const [book, setBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(3);
  let recognizedText = useSelector((state) => state.speech.recognizedText);

  const handleKeyDown = (event) => {
    if (event.key === "z") {
      //test
      dispatch(setRecognizedText("đọc chương 2"));
      recognizedText = "đọc chương 2";
      console.log("dung doc", recognizedText);
      // pauseAudio();
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
  };

  const SpeechSynthesisUtterance =
    window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

  const resEn = (answer) => {
    const reply = new SpeechSynthesisUtterance(answer);
    reply.lang = "en-US";
    speechSynthesis.speak(reply);
  };

  const resVn = (answer) => {
    const reply = new SpeechSynthesisUtterance(answer);
    reply.lang = "vi-VN";
    speechSynthesis.speak(reply);
  };

  useEffect(() => {
    //CheckTimeAudio();
    window.navigation.addEventListener("navigate", stopReading);
    //window.addEventListener("navigate", handleBeforeOut);

    return () => {
      // Remove event listeners on cleanup
      window.navigation.removeEventListener("navigate", stopReading);
    };
  }, []);

  let imageB = "src/assets/image_book.jpg";

  function handleShowMoreClick() {
    setShowMore(showMore + 3);
  }
  function handleClickView() {}
  function handleClickAdd() {}

  const fetchGetDetailsBook = async () => {
    const id = window.location.search.substring(1);
    if (id) {
      const res = await BookService.getDetailsBook(id);
      console.log("fetchdata", res.data);
      if (res?.status === "OK") {
        bookD = res?.data;
        setBook(res?.data);
      }
    }
  };
  console.log("details");

  useEffect(() => {
    fetchGetDetailsBook();
  }, []);

  useEffect(() => {
    if (play === false && bookD != null) {
      console.log("booD", bookD);
      const description_book = `Cuốn sách ${bookD?.name} thuộc thể loại ${bookD?.book_category?.name}. Trạng thái hoàn thành và nguồn từ sưu tập. Tác giả là `;
      const description_author = bookD?.author?.name;
      resVn(description_book);
      resEn(description_author);
      respond("Mời bạn chọn chương muốn đọc");
      play = true;
      console.log("kiểm tra", play);
    }
  }, [bookD]);

  useEffect(() => {
    if (recognizedText.toLocaleLowerCase().includes("chương")) {
      const pattern = /chương(.*)/;
      const match = recognizedText.match(pattern);
      console.log("match", match);
      if (match) {
        const result = match[1].trim();
        console.log("result", result);
        console.log("book", book);
        let found = false;
        book?.chapter.forEach((chap) => {
          console.log("sách lap", chap);
          if (chap.name.toLowerCase().includes(result.toLocaleLowerCase())) {
            console.log("chap");
            respond(chap.name);
            found = true;
            navigate(`/read-book?${chap?._id}`, {
              state: { bookInfo: book, chapterInfo: chap },
            });
          }
        });
        if (!found) {
          console.log("Không có kết quả phù hợp");
          respond("Không có kết quả phù hợp.");
        }
      }
    } else if (recognizedText.toLocaleLowerCase().includes("tìm kiếm sách")) {
      console.log("in bug");
    } else if (
      recognizedText.toLocaleLowerCase().includes("xin lỗi" || "yêu cầu")
    ) {
      console.log("in bug1");
    } else {
      console.log("in void", recognizedText);
      respond("Xin lỗi, bạn có thể lặp lại yêu cầu không ạ");
    }
  }, [recognizedText]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log("dsd", id);
    window.addEventListener("keydown", handleKeyDown);
    if (id) {
      fetchGetDetailsBook(id);
    }
  }, [location]);

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
            <Typography color="text.primary">Thông tin sách</Typography>
          </Breadcrumbs>
          <Grid container maxWidth="lg" spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <img
                src={imageB}
                style={{
                  objectFit: "contain",
                  borderRadius: "15px",
                  width: "80%",
                  height: "80%",
                }}
              />
            </Grid>
            <Grid mt={1} item xs={12} sm={12} md={6} lg={6}>
              <Box gap={1} display={"flex"} flexDirection={"column"}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {book?.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" color={"blue"}>
                    {"1583 Đánh giá"}
                  </Typography>
                  <Rating
                    name="size-medium"
                    size="large"
                    value={4.5}
                    precision={0.1}
                  />
                  <Typography variant="subtitle2">Your Rating: 5</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <b>Thể loại: </b>{" "}
                  <Typography variant="body1">
                    {book?.book_category?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <b>Tác giả: </b>{" "}
                  <Typography variant="body1">{book?.author?.name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <b>Trạng thái: </b>{" "}
                  <Typography variant="body1">Hoàn Thành</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <b>Nguồn: </b>{" "}
                  <Typography variant="body1">Sưu tầm</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    sx={{
                      color: "white",
                      ":hover": { bgcolor: "gray" },
                      bgcolor: "#EE3B3B",
                    }}
                    onClick={handleClickView}
                  >
                    Đọc từ đầu
                  </Button>
                  <Button
                    sx={{
                      bgcolor: "#1E90FF",
                      color: "white",
                      ":hover": { bgcolor: "gray" },
                    }}
                    onClick={handleClickAdd}
                  >
                    Thêm vào tủ
                  </Button>
                </Box>
                <Typography variant="h5" fontWeight={"bold"}>
                  Mô tả
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ maxHeight: "150em", overflow: "scroll" }}
                >
                  {" "}
                  Sách thường nhằm vào việc giúp người đọc tự phát triển bản
                  thân, vượt qua khó khăn, và đạt được những mục tiêu cá nhân và
                  nghề nghiệp. Đối tượng chính của thể loại này là những người
                  muốn cải thiện một hoặc nhiều khía cạnh của cuộc sống mình,
                  như sức khỏe, tài chính, mối quan hệ, hoặc tinh thần.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2, mt: 2 }}>
            <Typography variant="h6" fontWeight={"bold"}>
              Danh sách các chương
            </Typography>
            <Box>
              <Stack
                spacing={{ xs: 4, sm: 7 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {book?.chapter?.map((chap, index) => (
                  <Link
                    key={index}
                    to={{
                      pathname: "/read-book",
                      state: { bookInfo: book, chapterInfo: chap },
                    }}
                    onClick={() =>
                      navigate(`/read-book?${chap?._id}`, {
                        state: { bookInfo: book, chapterInfo: chap },
                      })
                    }
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button display={"flex"} gap={2} color="inherit">
                      <BookIcon sx={{ color: "#4F4F4F" }} />
                      <Typography variant="body1">{chap.name}</Typography>
                    </Button>
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default BookDetail;
