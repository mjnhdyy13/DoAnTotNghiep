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
  //const audioRef = new Audio("src/assets/audio/book1.mp3");
  const location = useLocation();
  const musicInfo = location.state?.musicInfo;
  console.log("musicInfo", musicInfo);
  const audioSrc = "src/assets/music/" + musicInfo.link;

  //const audioRef = useRef(new Audio(audioSrc));
  const audioRef = useRef();

  window.musiccurrent = audioRef;

  let recognizedText = useSelector((state) => state.speech.recognizedText);

  const handleBeforeOut = async (event) => {
    musicInfo.time = audioRef.current.currentTime;
    // chapter.Time_Chuong = 0;
    //console.log("chapter.Time_Chuong", chapter.Time_Chuong);
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
      console.log("set time");
      audioRef.current.currentTime = 100;
    }
    if (event.key === "g") {
      console.log(audioRef.current.currentTime);
    }
    if (event.key === "h") {
      handleBeforeOut();
    }
  };

  // useEffect(() => {
  //   if (play === false) {
  //     window.scrollTo(0, 0);
  //     respond("Bạn muốn phát nhạc tiếp hay phát lại từ đầu");
  //     play = true;
  //     console.log("kiểm tra", play);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (recognizedText.toLocaleLowerCase().includes("phát tiếp tục")) {
  //     audioRef.current.addEventListener("loadedmetadata", () => {
  //       if (musicInfo.time > 0 && musicInfo.time < audioRef.current.duration) {
  //         audioRef.current.currentTime = musicInfo.time;
  //       } else {
  //         audioRef.current.currentTime = 0;
  //       }
  //       audioRef.current.play();
  //     });
  //   }
  //   if (recognizedText.toLocaleLowerCase().includes("phát từ đầu")) {
  //     audioRef.current.addEventListener("loadedmetadata", () => {
  //       audioRef.current.currentTime = 0;
  //       audioRef.current.play();
  //     });
  //   }
  //   if (recognizedText.toLocaleLowerCase().includes("dừng")) {
  //     console.log("dừng");
  //     if (!audioRef.current.paused) {
  //       console.log(audioRef.current.paused);
  //       audioRef.current.pause();
  //       //console.log(audio.paused);
  //     }
  //   }
  //   if (recognizedText.toLocaleLowerCase().includes("tiếp tục")) {
  //     audioRef.current.play();
  //   }
  //   if (recognizedText.toLocaleLowerCase().includes("tăng âm lượng phát ")) {
  //     utterance.volume = 2;
  //     respond("Âm lượng đã được tăng");
  //   }
  //   if (recognizedText.toLocaleLowerCase().includes("giảm âm lượng phát")) {
  //     utterance.volume = 0.5;
  //     respond("Âm lượng đã được giảm");
  //   }
  // }, [recognizedText]);

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
    //audio.play();
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
    CheckTimeAudio();
    //respond(text);
    //tts(text);
    //window.addEventListener("hashchange", handleBeforeOut);
    //window.onhashchange = TestFunction();
    // window.navigation.addEventListener("navigate", (event) => {
    //   console.log("location changed!");
    // });
    window.navigation.addEventListener("navigate", handleBeforeOut);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeOut);
    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("beforeunload", handleBeforeOut);
      window.navigation.removeEventListener("navigate", handleBeforeOut);
    };
    //window.onbeforeunload = handleBeforeOut;
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeOut);
    // };
    // return () => {
    //   window.removeEventListener("keydown", handleKeyDown);
    // };
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
