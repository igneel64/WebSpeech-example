import "./style.scss";
import { h } from "preact";
import WebSpeech from "./components";

const App = () => {
  if ("SpeechRecognition" in window) {
    return <WebSpeech />;
  }
  return (
    <div>
      <h1>We cannot detect SpeechRecognition!</h1>
    </div>
  );
};

export default App;
