import AppBar from "../components/Appbar/Appbar";
import Footer from "../components/Footer/Footer";
import SpeechRecognitionComponent from "../components/SpeechRecognition/re";
function DefaultLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
      <SpeechRecognitionComponent />
    </div>
  );
}

export default DefaultLayout;
