import { useEffect, useState, useRef } from "react";
import React from "react";
import "../../css/playmusic.css";
import ReactAudioPlayer from "react-audio-player";
import { useSelector, useDispatch } from "react-redux";
import { respond } from "../../components/SpeechRecognition/re";
import { useLocation } from "react-router-dom";
import * as MusicService from "../../services/MusicService";

let play = false;

function PlayMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  const location = useLocation();
  const musicInfo = location.state?.musicInfo;
  console.log("musicInfo", musicInfo);
  const audioSrc = "src/assets/music/" + musicInfo.link;

  const audioRef = useRef();

  window.musiccurrent = audioRef;

  let recognizedText = useSelector((state) => state.speech.recognizedText);

  const handleBeforeOut = async (event) => {
    musicInfo.time = audioRef.current.currentTime;

    console.log("currentTime", audioRef.current.currentTime);
    console.log("musicinfo", musicInfo);
    audioRef.current.pause();
    play = false;

    try {
      const res1 = await MusicService.updateProduct(musicInfo._id, musicInfo);
      if (res1?.status === "OK") {
        console.log("hh", res1.data);
      }
    } catch (error) {
      console.error("Failed to update music info", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "d") {
      console.log("dung doc");
      // pauseAudio();
      if (!audioRef.current.paused) {
        console.log(audioRef.current.paused);
        audioRef.current.pause();
        //console.log(audio.paused);
      }
    }
    if (event.key === "s") {
      console.log("test");
      audioRef.current.play();
    }
    if (event.key === "f") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (event.key === "g") {
      console.log(audioRef.current.currentTime);
    }
    if (event.key === "h") {
      handleBeforeOut();
    }
  };

  useEffect(() => {
    if (musicInfo) {
      if (audioRef.current) {
        audioRef.current.addEventListener("loadedmetadata", () => {
          if (
            musicInfo.time > 0 &&
            musicInfo.time < audioRef.current.duration
          ) {
            audioRef.current.currentTime = musicInfo.time;
          } else {
            audioRef.current.currentTime = 0;
          }
        });
      }
      console.log("set lúc đầu");
    }
  }, [musicInfo]);

  useEffect(() => {
    if (play === false) {
      window.scrollTo(0, 0);
      respond("Bạn muốn phát tiếp hay phát lại từ đầu");
      play = true;
      console.log("kiểm tra", play);
    }
  }, []);

  useEffect(() => {
    if (recognizedText.toLocaleLowerCase().includes("phát tiếp tục")) {
      if (audioRef.current) {
        audioRef.current.addEventListener("loadedmetadata", () => {
          if (
            musicInfo.time > 0 &&
            musicInfo.time < audioRef.current.duration
          ) {
            audioRef.current.currentTime = musicInfo.time;
          } else {
            audioRef.current.currentTime = 0;
          }
          audioRef.current.play();
        });
      }
    }
    if (recognizedText.toLocaleLowerCase().includes("phát từ đầu")) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (recognizedText.toLocaleLowerCase().includes("dừng")) {
      console.log("dung doc");
      // pauseAudio();
      if (!audioRef.current.paused) {
        console.log(audioRef.current.paused);
        audioRef.current.pause();
        //console.log(audio.paused);
      }
    }
    if (recognizedText.toLocaleLowerCase().includes("tiếp tục")) {
      console.log("tiếp tục");
      audioRef.current.play();
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
    if (recognizedText.toLocaleLowerCase().includes("chương trước")) {
      let number = getNumberFromString(chapterInfo.name);
      let previousChapter = bookInfo.chapter[number - 2];
      console.log("previousChapter", previousChapter);
      console.log("number", number);
      if (number - 2 >= 0) {
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
    }
  }, [recognizedText]);

  const CheckTimeAudio = () => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        if (musicInfo.time > 0 && musicInfo.time < audioRef.current.duration) {
          audioRef.current.currentTime = musicInfo.time;
        } else {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.play();
      });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
    //CheckTimeAudio();

    window.navigation.addEventListener("navigate", handleBeforeOut);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeOut);
    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("beforeunload", handleBeforeOut);
      window.navigation.removeEventListener("navigate", handleBeforeOut);
    };
  }, []);

  return (
    <div className="contain">
      <div className="container">
        <div className="music-player">
          <div className="cover">
            <img
              src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo.png"
              alt="Album Cover"
            />
          </div>
          <div className="titre">
            <h3>{musicInfo?.singer?.name || "Unknown Singer"}</h3>
            <h1>{musicInfo?.name || "Unknown Song"}</h1>
          </div>
          <div className="lecteur">
            <audio
              ref={audioRef}
              src={audioSrc}
              controls
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayMusic;
