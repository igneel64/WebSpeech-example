import { h } from "preact";
import styles from "./style.scss";

const Title = () => (
  <section style={{ display: "block" }}>
    <span className={styles.upper}>How about using me on your Standups?</span>
    <h1>What is said, will be matched!</h1>
  </section>
);

export default Title;
