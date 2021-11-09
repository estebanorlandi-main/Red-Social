import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import "codemirror/keymap/sublime";
import { useState } from "react";
import "../../App.css";
import axios from "axios";

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
  const [vimTest, setVimTest] = useState(initialVimTest);
  const [victories, setVictories] = useState(0);
  const [game, setGame] = useState(false);

  // Challenge
  const [code, setCode] = useState("a = 0");
  const [testCases, setTestCases] = useState([]);

  const submitCode = () => {
    axios
      .post("http://localhost:3001/python", { code })
      .then(({ data }) => setTestCases([data.passOrFail]));
  };

  return (
    <div className="App">
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
        <div className="absolute left-20 right-20 top-20 bottom-20 text-left">
          <div>Create a function that adds two numbers in Python</div>
          {testCases.map((testCase, i) => {
            return (
              <div key={i}>
                <div>{testCase === "True" ? "success" : "failed"}</div>
              </div>
            );
          })}
          <CodeMirror
            options={{ theme: "dracula", mode: "python", keyMap: "sublime" }}
            value={code}
            height="200px"
            width="800px"
            onChange={(editor, viewUpdate) => {
              setCode(editor.getValue());
              console.log(code);
            }}
          />
          <div onClick={submitCode}>Submit</div>
        </div>
      )}
    </div>
  );
}
