const { useState } = require("react");

function FormComment(props) {
  const [comment, setComment] = useState("");

  const handleComment = (e) => setComment((old) => e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(comment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={handleComment} name="text" value={comment} />
      <button type="submit"> Submit </button>
    </form>
  );
}

export default FormComment;
