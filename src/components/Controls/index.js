import { h } from "preact";
import styles from "./style.scss";

const Controls = ({ start, stop, isRecording, recordingReset }) => (
  <section style={{ flexDirection: "column", alignItems: "center" }}>
    <div>
      {isRecording ? (
        <button type='button' className={styles.control} onClick={stop}>
          Stop session &#8879;
        </button>
      ) : (
        <button type='button' className={styles.control} onClick={start}>
          Press me and start talking &#8875;
        </button>
      )}
    </div>
    <div>
      <span
        tabIndex={0}
        role='button'
        onClick={recordingReset}
        onKeyDown={({ keycode }) => keycode == 13 && recordingReset}
        className={styles.reset}
      >
        &#10005;
      </span>
    </div>
  </section>
);

export default Controls;
