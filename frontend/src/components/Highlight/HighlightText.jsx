import React, { useState, useEffect, useRef } from "react";
import "../../css/highlight.css"; // Import CSS để styling

const HighlightText = () => {
  const [text, setText] = useState(
    "Đây là đoạn văn bản cần được highlight theo thời gian."
  );
  const [highlightIndex, setHighlightIndex] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Hàm bắt đầu highlight
  const startHighlight = () => {
    setIsRunning(true);
  };

  // Hàm dừng highlight
  const stopHighlight = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // useEffect để quản lý interval khi isRunning thay đổi
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setHighlightIndex((prevIndex) => {
          if (prevIndex < text.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(intervalRef.current);
            return prevIndex;
          }
        });
      }, 500); // Highlight mỗi 500ms, bạn có thể thay đổi thời gian này
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, text.length]);

  // Hàm để render văn bản với highlight
  const renderTextWithHighlight = () => {
    return (
      <span>
        <span className="highlight">{text.substring(0, highlightIndex)}</span>
        <span>{text.substring(highlightIndex)}</span>
      </span>
    );
  };

  return (
    <div>
      <p>{renderTextWithHighlight()}</p>
      <button onClick={startHighlight}>Bắt đầu</button>
      <button onClick={stopHighlight}>Dừng</button>
    </div>
  );
};

export default HighlightText;
