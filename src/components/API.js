window.SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

window.SpeechGrammarList =
  window.webkitSpeechGrammarList || window.SpeechGrammarList;

const WebSpeechObject = (function constructWebSpeech() {
  let recognitionInstance;
  let interimTranscript = "";

  function init() {
    recognitionInstance = new window.SpeechRecognition();
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 10;
    recognitionInstance.continuous = true;

    return {
      setupHandlers(handleChange, handleError) {
        recognitionInstance.onerror = (event) => {
          handleError(event);
        };

        recognitionInstance.onresult = ({ resultIndex, results }) => {
          for (let i = resultIndex; i < results.length; i += 1) {
            const { transcript } = results[i][0];
            if (results[i].isFinal) {
              handleChange(transcript);
            } else {
              interimTranscript += transcript;
            }
          }
        };
      },
      start() {
        recognitionInstance.start();
      },
      stop() {
        return recognitionInstance.stop();
      },
      kill() {
        recognitionInstance.abort();
      },
    };
  }

  return {
    getInstance() {
      return recognitionInstance || init();
    },
  };
})();

export { WebSpeechObject };
