import axios from "axios";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

export default function ChallengeComment(props) {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState();

  useEffect(() => {
    if (loading) {
      // axios
      //   .get(`http://localhost:3001/comments/${props.id}`)
      //   .then((res) => console.log(res));
      console.log(props.location.value);
      setLoading(false);
    }
  });

  return (
    <div>
      <CodeMirror
        options={{ theme: "dracula", mode: "js", keyMap: "vim" }}
        value={props.location.value}
        height="600px"
        width="80%"
      />
    </div>
  );
}
