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

import * as MusicService from "../../services/MusicService";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { respond } from "../../components/SpeechRecognition/re";

let play = false;
let musicD = null;

function MusicDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  var bookId = window.location.search.substring(1);
  const [music, setMusic] = useState([]);
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

  useEffect(() => {
    //CheckTimeAudio();
    window.navigation.addEventListener("navigate", stopReading);
    //window.addEventListener("navigate", handleBeforeOut);

    return () => {
      // Remove event listeners on cleanup
      window.navigation.removeEventListener("navigate", stopReading);
    };
  }, []);

  let imageB = "src/assets/image_music.png";

  function handleShowMoreClick() {
    setShowMore(showMore + 3);
  }
  function handleClickMusic() {
    navigate("/play-music", {
      state: { musicInfo: music },
    });
  }
  function handleClickAdd() {}

  const fetchGetDetailsMusic = async () => {
    const id = window.location.search.substring(1);
    if (id) {
      const res = await MusicService.getDetailsMusic(id);
      console.log("fetchdata", res.data);
      if (res?.status === "OK") {
        musicD = res?.data;
        setMusic(res?.data);
      }
    }
  };
  console.log("details");
  useEffect(() => {
    fetchGetDetailsMusic();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (recognizedText.toLocaleLowerCase().includes("phát")) {
      navigate("/play-music", {
        state: { musicInfo: music },
      });
    }
  }, [recognizedText]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log("dsd", id);
    window.addEventListener("keydown", handleKeyDown);
    if (id) {
      fetchGetDetailsMusic(id);
    }
  }, [location]);

  useEffect(() => {
    if (play === false && musicD != null) {
      console.log("musicD", musicD);
      const description_music = `Bài hát ${musicD?.name} của ca sĩ ${musicD?.singer?.name} thuộc thể loại ${musicD?.music_category?.name}. Trạng thái hoàn thành và nguồn từ sưu tập.`;
      console.log("des", description_music);
      respond(description_music);
      play = true;
      console.log("kiểm tra", play);
    }
  }, [musicD]);

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
                  width: "100%",
                  height: "100%",
                }}
              />
            </Grid>
            <Grid mt={1} item xs={12} sm={12} md={6} lg={6}>
              <Box gap={1} display={"flex"} flexDirection={"column"}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {music?.name}
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
                    {music?.music_category?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <b>Ca Sĩ: </b>{" "}
                  <Typography variant="body1">{music?.singer?.name}</Typography>
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
                    onClick={handleClickMusic}
                  >
                    Phát Nhạc
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default MusicDetail;
