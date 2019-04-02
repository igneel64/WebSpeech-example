import { h, Component, Fragment } from "preact";
import { WebSpeechObject } from "./API";
import WordsInput from "./WordsInput";
import WordsMatcher from "./WordsMatcher";
import Controls from "./Controls";
import Title from "./Title";

export default class WebSpeech extends Component {
  state = {
    speech: "",
    error: false,
    wordsToMatch: [],
  };

  recognition = WebSpeechObject.getInstance();

  setupRecognition() {
    this.recognition.setupHandlers(
      this.handleTextChange,
      this.handleRecognitionError
    );
  }

  startListening = () => {
    this.setState({ isRecording: true });
    this.recognition.start();
  };

  stopListening = () => {
    this.setState({ isRecording: false });
    this.recognition.stop();
  };

  handleTextChange = (transcript) => {
    const { wordsToMatch } = this.state;
    const newWordsToMatch = wordsToMatch.map((word) => {
      const wordInfo = { ...word };
      if (~transcript.indexOf(word.text)) {
        wordInfo.matched = true;
      }
      return wordInfo;
    });

    this.setState((state) => ({
      speech: state.speech + transcript,
      wordsToMatch: newWordsToMatch,
    }));
  };

  handleRecognitionError = ({ error }) => {
    this.setState({ error });
  };

  handleWordListSubmit = (val) => {
    const wordsToMatch = val
      .split(",")
      .map((word) => ({ text: word.toLowerCase(), matched: false }));
    this.setState({
      wordsToMatch,
    });
  };

  handleRecordingReset = () => {
    this.setState({ wordsToMatch: [], isRecording: false }, () => {
      this.recognition.stop();
    });
  };

  componentDidMount() {
    this.setupRecognition();
  }

  render() {
    const { error, wordsToMatch, isRecording } = this.state;
    const wordsAvailable = Boolean(wordsToMatch.length);
    return (
      <div>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <Title />
        {!wordsAvailable ? (
          <WordsInput handleWordListSubmit={this.handleWordListSubmit} />
        ) : (
          <Fragment>
            <WordsMatcher wordsToMatch={wordsToMatch} />
            <Controls
              isRecording={isRecording}
              start={this.startListening}
              stop={this.stopListening}
              recordingReset={this.handleRecordingReset}
            />
          </Fragment>
        )}
      </div>
    );
  }
}
