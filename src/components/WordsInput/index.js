/* eslint no-param-reassign: ["error", { "props": false }] */
import { h } from "preact";
import styles from "./style.scss";

const WordsInput = ({ handleWordListSubmit }) => {
  function extractWord(event) {
    event.preventDefault();
    const wordList = event.target.wordlist.value;
    if (!wordList) {
      return;
    }
    event.target.wordlist.value = "";
    handleWordListSubmit(wordList);
  }

  function clear(event) {
    event.target.parentElement.wordlist.value = "";
  }

  return (
    <section>
      <div className={styles.container}>
        <p className={styles.title}>
          Enter the words that you want to be tracked during the session.
        </p>
        <form onSubmit={extractWord}>
          <div className={styles.inputContainer}>
            <input
              aria-label='List of words separated by comma'
              autofill='off'
              autoComplete='off'
              className={styles.input}
              type='text'
              name='wordlist'
              placeholder='Comma-separated ...'
            />
            <button type='submit'>&#10230;</button>
          </div>
          <span
            tabIndex='0'
            role='button'
            onClick={clear}
            onKeyDown={clear}
            className={styles.closeIcon}
          >
            &#10005;
          </span>
        </form>
      </div>
    </section>
  );
};

export default WordsInput;
