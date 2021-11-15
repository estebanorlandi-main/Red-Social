import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { useState } from "react";
import axios from "axios";
import styles from "./Challenge.module.css";
import Select from "react-select";
import "./Challenge.css";

export default function Challenge(props) {
  // Game
  const getNewVimTest = () => {
    const vimTest = "                                %\n";
    const emptyLine = "                                 \n";
    const vimTestLine = Math.floor(Math.random() * 10);
    let newVimTest = "";
    for (let i = 0; i < 10; i++) {
      if (i === vimTestLine) {
        newVimTest += vimTest;
      } else {
        newVimTest += emptyLine;
      }
    }
    return newVimTest;
  };

  const initialVimTest = getNewVimTest();
  const [/*vimTest, */ setVimTest] = useState(initialVimTest);
  const [victories, setVictories] = useState(0);
  const [game, setGame] = useState(false);

  // Challenge
  const [code, setCode] = useState("a = 0");
  const [testCases /*, setTestCases*/] = useState([]);
  //const [inputs, setInputs] = useState([]);

  // const submitCode = () => {
  //   axios
  //     .get("http://localhost:3001/challenge/comment/atalesam", {
  //       code,
  //       username: "atalesam",
  //       postid: 1,
  //       description: "asd",
  //     })
  //     .then(({ data }) => setTestCases([data.passOrFail]))
  //     .catch((e) => console.log(e));
  // };

  const submitCode = () => {
    axios
      .get("http://localhost:3001/challenge/comment/atalesam", {
        code,
        username: "atalesam",
        postid: 1,
        description: "asd",
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handleSelect = (e) => {
    if (e.value === "game") setGame(true);
    else setGame(false);
  };

  return (
    <div className={styles.container}>
      {game ? (
        <div className="absolute left-20 right-20 top-20 bottom-20 text-left">
          <div>Move in the editor with 'h/j/k/l' delete with 'x'</div>
          <div>Won {victories} time(s)!</div>
          <CodeMirror
            options={{ theme: "dracula", mode: "js", keyMap: "vim" }}
            value={getNewVimTest()}
            height="200px"
            onChange={(editor, viewUpdate) => {
              if (editor.getValue().includes("%")) {
                console.log("value: ", editor.getValue());
                //
              } else {
                console.log("you won");
                setVimTest(getNewVimTest());
                setVictories(victories + 1);
              }
            }}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div>Create a function that adds two numbers in Python</div>
          {testCases.map((testCase, i) => {
            return (
              <div key={i}>
                <div>{testCase === "True" ? "success" : "failed"}</div>
              </div>
            );
          })}
          <CodeMirror
            className={styles.CodeMirror}
            options={{
              theme: "dracula",
              mode: "xml",
              keyMap: "sublime",
              autoCloseTags: true,
              autoCloseBrackets: true,
            }}
            value={code}
            height="200px"
            width="800px"
            onChange={(editor, viewUpdate) => {
              setCode(editor.getValue());
              console.log(code);
            }}
          />
          <button className={styles.button} onClick={submitCode}>
            Submit
          </button>
          <button
            onClick={() =>
              axios
                .get("http://localhost:3001/challenge/post")
                .then((res) => console.log(res))
            }
          >
            AXIOS
          </button>
        </div>
      )}
      <Select
        onChange={handleSelect}
        options={[
          { value: "challenge", label: "Challenge" },
          { value: "game", label: "Game" },
        ]}
      />
    </div>
  );
}
