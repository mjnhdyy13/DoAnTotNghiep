import React, { useEffect, useState } from "react";
import { mockData } from "../../apis/mockdata";
import { Link, useNavigate } from "react-router-dom";
import * as BookService from "../../services/BookService";
import * as MusicService from "../../services/MusicService";
import * as googleTTS from "google-tts-api";
import { useDispatch } from "react-redux";
import { setRecognizedText } from "../../redux/slice/speechSlice";
//import * as talkify from "talkify-tts";

let bookdata = [];
let readbook = null;
let musicdata = [];
let playmusic = null;
let recog_data = null;
let speechUtterance = null;

const SpeechRecognitionComponent = () => {
  const [texts, setTexts] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [p, setP] = useState(document.createElement("p"));
  const navigate = useNavigate();
  const [volume, setVolume] = useState(0.5);
  var vole = 0.5;
  const [books, setBooks] = useState([]);
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  const fetchAllBook = async () => {
    const res = await BookService.getAllBook();
    if (res?.status === "OK") {
      console.log("bookdata1", res?.data);
      setBooks(res?.data);
      bookdata = res?.data;
      console.log("bookdata1a", bookdata);
      console.log("bookdata1agưe", books);
    }
  };

  const fetchAllMusic = async () => {
    const res = await MusicService.getAllMusic();
    if (res?.status === "OK") {
      console.log("musicdata1", res?.data);
      setSongs(res?.data);
      musicdata = res?.data;
      console.log("musicdata1a", musicdata);
      console.log("musicdata1agưe", songs);
    }
  };

  console.log("volume", volume);

  var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

  //const [volume, setVolume] = useState(1.0);
  const commands = [
    "dừng đọc",
    "ngừng đọc",
    "tắt",
    "đọc từ đầu",
    "đọc tiếp",
    "tiếp tục",
  ];
  const grammar =
    "#JSGF V1.0; grammar commands; public <command> = " +
    commands.join(" | ") +
    " ;";
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  speechUtterance = null;

  // Hàm để ngừng đọc
  const stopReading = () => {
    if (speechUtterance) {
      speechSynthesis.cancel(); // Hủy bỏ việc đọc hiện tại
    }
  };
  const handleVolume = (value) => {
    setVolume(value);
    vole = 1;
  };

  useEffect(() => {
    console.log("Count has been updated:", books);
    bookdata = books;
  }, [recognition]);

  useEffect(() => {
    fetchAllBook();
    fetchAllMusic();
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance =
      window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

    const recognition = new SpeechRecognition();

    //add grammar

    recognition.grammars = speechRecognitionList;
    recognition.interimResults = true;
    setRecognition(recognition);

    const handleKeyDown = (event) => {
      if (event.key === "d") {
        // console.log("dung doc");
        speechSynthesis.cancel();
        // stopReading();
        //console.log(window.audiocurrent);
        // talkify.config.remoteService.host = "https://talkify.net";
        // talkify.config.remoteService.apiKey =
        //   "d0b2bc47-a39a-4911-b864-d18579eb34f0";
        // talkify.config.ui.audioControls.enabled = true; //<-- Disable to get the browser built in audio controls
        // talkify.config.ui.audioControls.voicepicker.enabled = true;
        // talkify.config.ui.audioControls.container =
        //   document.getElementById("player-and-voices");
        // var player = new talkify.TtsPlayer(); //or new talkify.Html5Player()
        // player.playText("Hello world");
      }

      if (event.key === "g") {
        handleVolume(1);
        //respond("");
      }
      if (event.key === "q") {
        respond("Xin chào bạn");

        // Thiết lập sự điều chỉnh kích thước cho cửa sổ
        // let widthAdjustment = 100; // Điều chỉnh chiều rộng (trong pixels)
        // let heightAdjustment = 100; // Điều chỉnh chiều cao (trong pixels)

        // Thay đổi kích thước của cửa sổ hiện tại
        //window.resizeBy(widthAdjustment, heightAdjustment);
        //window.blur();
        // window.minimize();
      }
      if (event.key === "f") {
        setTexts("đọc chương 2");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      recognition.removeEventListener("result", handleResult);
      recognition.removeEventListener("end", recognition.start);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.addEventListener("result", handleResult);
      recognition.addEventListener("end", recognition.start);
      recognition.start();
    }
  }, [recognition]);

  const handleResult = (e) => {
    setTexts([...texts, p]);
    let text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log("ss", text);

    p.innerText = text;
    if (e.results[0].isFinal) {
      dispatch(setRecognizedText(text));
      if (text.toLocaleLowerCase().includes("tìm kiếm tác giả")) {
        //text = "tìm kiếm tác giả Nhật Ánh";
        console.log("vo match");
        // Sử dụng regular expression để tìm chuỗi đằng sau "tìm kiếm sách"
        const pattern = /tìm kiếm tác giả(.*)/; // Pattern này tìm chuỗi đằng sau "tìm kiếm sách"

        const match = text.match(pattern); // Tìm kết quả khớp với pattern
        console.log("match", match);
        if (match) {
          const result = match[1].trim(); // Lấy chuỗi kết quả và loại bỏ khoảng trắng ở đầu và cuối
          //respond(result);
          console.log("result", result);
          console.log("books", books);
          console.log("bookdata", bookdata);
          let foundBooks = []; // Mảng để lưu các sách tìm thấy

          bookdata.forEach((book) => {
            console.log("sách lap", book);
            // Kiểm tra xem tên cuốn sách có chứa chuỗi tìm kiếm hay không
            if (
              book.author.name
                .toLowerCase()
                .includes(result.toLocaleLowerCase())
            ) {
              // Nếu có, thêm tên cuốn sách đó vào mảng foundBooks
              console.log("sách");
              foundBooks.push(book);
            }
          });

          if (foundBooks.length > 0) {
            const booksString = foundBooks.join(", "); // Nối các tên sách thành một chuỗi
            //respond(booksString); // Trả về chuỗi các tên sách tìm thấy
            console.log("foundBooks", foundBooks);
            navigate("/find-book", {
              state: { bookResult: foundBooks },
            });
          } else {
            console.log("Không có kết quả phù hợp");
            respond("Không có kết quả phù hợp.");
          }
        }
      }
      if (text.toLocaleLowerCase().includes("tìm kiếm sách")) {
        // Sử dụng regular expression để tìm chuỗi đằng sau "tìm kiếm sách"
        const pattern = /tìm kiếm sách(.*)/; // Pattern này tìm chuỗi đằng sau "tìm kiếm sách"
        const match = text.match(pattern); // Tìm kết quả khớp với pattern
        console.log("match", match);
        if (match) {
          const result = match[1].trim(); // Lấy chuỗi kết quả và loại bỏ khoảng trắng ở đầu và cuối
          //respond(result);
          console.log("result", result);
          console.log("books", books);
          console.log("bookdata", bookdata);
          let found = false;
          bookdata.forEach((book) => {
            console.log("sách lap", book);
            // Kiểm tra xem tên cuốn sách có chứa chuỗi tìm kiếm hay không
            if (book.name.toLowerCase().includes(result.toLocaleLowerCase())) {
              // Nếu có, trả về tên cuốn sách đó
              console.log("sách");
              readbook = book;
              respond(book.name);
              found = true;
              navigate(`/book-detail?${book?._id}`);
              // Bạn cũng có thể trả về các thông tin khác của cuốn sách bằng cách thêm vào đây
              // respond(book);
              // hoặc có thể trả về một đoạn text mô tả cuốn sách
              // respond(book.description);
              // hoặc bất kỳ thông tin nào bạn muốn hiển thị
            }
          });
          if (!found) {
            console.log("Không có kết quả phù hợp");
            respond("Không có kết quả phù hợp.");
          }
        }
      }
      if (text.toLocaleLowerCase().includes("tìm kiếm bài hát")) {
        // Sử dụng regular expression để tìm chuỗi đằng sau "tìm kiếm sách"
        const pattern = /tìm kiếm bài hát(.*)/; // Pattern này tìm chuỗi đằng sau "tìm kiếm sách"
        const match = text.toLocaleLowerCase().match(pattern); // Tìm kết quả khớp với pattern
        console.log("pattern", pattern);
        console.log("match", match);
        if (match) {
          const result = match[1].trim(); // Lấy chuỗi kết quả và loại bỏ khoảng trắng ở đầu và cuối
          //respond(result);
          console.log("result", result);
          console.log("songs", songs);
          console.log("musicdata", musicdata);
          let found = false;
          musicdata.forEach((music) => {
            console.log("nhac lap", music);
            // Kiểm tra xem tên cuốn sách có chứa chuỗi tìm kiếm hay không
            if (music.name.toLowerCase().includes(result.toLocaleLowerCase())) {
              // Nếu có, trả về tên cuốn sách đó
              console.log("nhạc");
              playmusic = music;
              respond(music.name);
              found = true;
              navigate(`/music-detail?${music?._id}`);
              // Bạn cũng có thể trả về các thông tin khác của cuốn sách bằng cách thêm vào đây
              // respond(book);
              // hoặc có thể trả về một đoạn text mô tả cuốn sách
              // respond(book.description);
              // hoặc bất kỳ thông tin nào bạn muốn hiển thị
            }
          });
          if (!found) {
            console.log("Không có kết quả phù hợp");
            respond("Không có kết quả phù hợp.");
          }
        }
      }
      if (text.toLowerCase().includes("đọc sách")) {
        if (readbook) {
          navigate("/read-book", {
            state: { bookInfo: readbook, chapterInfo: readbook?.chapter[0] },
          });
        } else {
          respond("Bạn chưa chọn sách để đọc");
        }
        //respond(bookContent);
      }

      if (text.toLowerCase().includes("tăng âm lượng")) {
        vole = 1; // Tăng âm lượng thêm 20%
        if (window.musiccurrent) {
          let newVolume = Math.min(window.musiccurrent.current.volume + 0.3, 1);
          window.musiccurrent.current.volume = newVolume;
          console.log(
            "Increased volume music to:",
            window.musiccurrent.current.volume
          );
        }
        if (window.audiocurrent) {
          let newVolume = Math.min(window.audiocurrent.volume + 0.3, 1);
          window.audiocurrent.volume = newVolume;
          console.log("Increased volume book to:", newVolume);
        }
        respond("Âm lượng đã được tăng lên.");
      }
      if (text.toLowerCase().includes("dừng" || "tắt" || "ngừng")) {
        //console.log(window.audiocurrent);
        speechSynthesis.cancel();
        if (window.musiccurrent) {
          window.musiccurrent.current.pause();
        }
        if (window.audiocurrent) {
          window.audiocurrent.pause();
        }
      }
      if (text.toLowerCase().includes("giảm âm lượng")) {
        vole = 0.2; // Giảm âm lượng đi 20%
        if (window.musiccurrent) {
          window.musiccurrent.current.volume = 0.2;
          console.log(
            "Decreased volume music to:",
            window.musiccurrent.current.volume
          );
        }
        if (window.audiocurrent) {
          window.audiocurrent.volume = 0.2;
          console.log("Decreased volume book to:", window.audiocurrent.volume);
        }
        respond("Âm lượng đã được giảm đi.");
      }
      if (text.toLowerCase().includes("về trang chủ")) {
        navigate(`/`);
        respond("Đã về trang chủ");
      }

      if (text.includes("Đọc tin tức")) {
        window.open("https://www.24h.com.vn/", "_blank");
        fetch("https://www.24h.com.vn/")
          .then((response) => response.text())
          .then((html) => {
            // Phân tích HTML để trích xuất tiêu đề
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Lấy tất cả các tiêu đề trong thẻ h1 và h2
            const headings = doc.querySelectorAll("h3");

            // In ra tiêu đề của mỗi tin tức
            let count = 0;
            headings.forEach((heading) => {
              if (count < 5) {
                console.log(heading.textContent.trim());
                respond(heading.textContent.trim());
                count++;
              } else {
                return; // Đã in ra 5 dòng, thoát khỏi vòng lặp
              }
            });
          })
          .catch((error) => console.error("Fetch error:", error));

        //respond("Đã mở trang tin tức");
      }
      if (text.includes("thoát chương trình")) {
        respond("Chương trình sẽ thoát trong một vài giây.");
        setTimeout(() => {
          window.close(); // Đóng trang web
        }, 2000); // Đợi 2 giây trước khi đóng
      }
      setP(document.createElement("p"));
    }
  };

  const respond = (answer) => {
    const reply = new SpeechSynthesisUtterance(answer);
    reply.lang = "vi-VN";
    reply.volume = vole;
    console.log(vole);
    speechSynthesis.speak(reply);
    // const newP = document.createElement("p");
    // newP.classList.add("replay");
    // newP.innerText = "My Name is Cifar";
    // setTexts([...texts, newP]);
  };

  // return <div className="texts"></div>;
};

export default SpeechRecognitionComponent;
// export const respond = (answer) => {
//   const reply = new SpeechSynthesisUtterance(answer);
//   reply.lang = "vi-VN";
//   reply.rate = 1.5;
//   //reply.volume = vole;
//   //console.log(vole);
//   console.log("in respond", answer);

//   speechSynthesis.speak(reply);
//   // const newP = document.createElement("p");
//   // newP.classList.add("replay");
//   // newP.innerText = "My Name is Cifar";
//   // setTexts([...texts, newP]);
// };
export const respond = (answer) => {
  return new Promise((resolve) => {
    const reply = new SpeechSynthesisUtterance(answer);
    reply.lang = "vi-VN";

    reply.rate = 1;
    console.log("in respond", answer);
    reply.onend = resolve; // Gọi resolve khi việc đọc hoàn tất
    speechSynthesis.speak(reply);
  });
};

export const recognition = () => {
  return recog_data;
};

export const stopRead = () => {
  if (speechUtterance) {
    speechSynthesis.cancel(); // Hủy bỏ việc đọc hiện tại
  }
};
