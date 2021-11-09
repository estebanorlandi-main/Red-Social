import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import { useState } from "react";

export default function Challenge(props) {
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

  return (
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
  );
}
