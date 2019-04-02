import { h } from "preact";
import style from "./style.scss";

const WordsMatcher = ({ wordsToMatch }) => {
  return (
    <section>
      <div className={style.container}>
        {wordsToMatch.map((word) => (
          <div
            className={[
              style.box,
              word.matched ? style.found : style.pending,
            ].join(" ")}
          >
            <span>{word.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WordsMatcher;
