import AppBar from "../components/Appbar/Appbar";
import BoardBar from "../components/BoardBar/BoardBar";
import Footer from "../components/Footer/Footer";
import SpeechRecognitionComponent from "../components/SpeechRecognition/re";

function DefaultLayout({ children }) {
  return (
    <div>
      <AppBar />
      <BoardBar />
      {children}
      <Footer />
      <SpeechRecognitionComponent />
    </div>
  );
}

export default DefaultLayout;
