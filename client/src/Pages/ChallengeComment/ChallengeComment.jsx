import axios from "axios";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

import styles from "../../components/Post/Post.module.css";
import popup from "../../components/Post/Popup.module.css";

export default function ChallengeComment(props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [errorTest, setErrorTest] = useState(false);

  const testing = () => {
    setLoading(true);
    axios
      .post("http://localhost:3001/challenge/testing/", {
        code: props.location.value,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res?.data.data?.error) {
          setErrorTest(true);
          setResult(null);
        } else {
          setErrorTest(false);
          setResult(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <CodeMirror
        options={{ theme: "dracula", mode: "js", keyMap: "sublime" }}
        value={props.location.value}
        height="600px"
        width="80%"
      />
      {loading ? (
        <img
          className={styles.icon}
          style={{ float: "left" }}
          src="http://pa1.narvii.com/6892/4d02d3678a8cf722f7a76555d77c45fe32bd5b61r1-200-200_00.gif"
        />
      ) : errorTest ? (
        <img
          className={styles.icon}
          style={{ float: "left" }}
          src="https://img.icons8.com/color/48/000000/fail.png"
        />
      ) : (
        <img
          className={styles.icon}
          style={{ float: "left" }}
          src="https://img.icons8.com/color/48/000000/pass.png"
        />
      )}
      <button className={popup.test} type="submit" onClick={testing}>
        Test
      </button>
      <h2 className={popup.result}>Result: {result}</h2>
    </div>
  );
}
