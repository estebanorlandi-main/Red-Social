import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { commentPost } from "../../Redux/actions/Post";

import Comment from "../Comment/Comment";

import styles from "./Post.module.css";

//Icons
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineModeComment,
  MdShare,
  MdSend,
} from "react-icons/md";

function Post({ post }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});

  const [firstLoad, setFirstLoad] = useState(true);

  const [seeMore, setSeeMore] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad, setFirstLoad]);

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = (comment) => {
      if (comment.length < 3) {
        setError("Minimo 3 letras");
        return false;
      }

      if (comment.length > 1000) {
        setError("Maximo 1000 letras");
        return false;
      }

      setError("");
      return true;
    };

    if (isValid(newComment))
      dispatch(
        commentPost(post.idPost, newComment, {
          username: session.username,
          avatar:
            "https://robohash.org/reiciendisquisnemo.png?size=50x50&set=set1",
        })
      );
  };

  const handleLike = (e) => {
    //if (session.username) dispatch(likePost(post.idPost, session.username));
  };

  const tags = new Set();
  post.tag.filter((tag) => (!!tag ? tags.add(tag) : false));
  post.tag = Array.from(tags);

  return (
    <div className={styles.container}>
      <ul className={styles.tags}>
        {post.tag.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      {post.user ? (
        <Link
          className={styles.userContainer}
          to={`/profile/${post.user.username}`}
        >
          <img className={styles.avatar} src={post.user.image} alt="avatar" />
          <div>
            <span className={styles.username}>{post.user.username}</span>
            <span className={styles.github}>{post.user.username}</span>
          </div>
        </Link>
      ) : (
        ""
      )}

      <div className={styles.postBody}>
        <h3>{post.title}</h3>

        <div
          className={styles.mainContent + ` ${seeMore ? styles.expand : ""}`}
          style={seeMore ? { overflowY: "visible" } : { overflowY: "hidden" }}
        >
          <p
            className={styles.text}
            style={seeMore ? { marginBottom: "1em" } : { marginBottom: "0" }}
          >
            {post.content}
          </p>
          <button
            className={styles.seeMore}
            style={seeMore ? { bottom: "-2em" } : { bottom: "0" }}
            onClick={() => setSeeMore((old) => !old)}
          >
            {seeMore ? "...See less" : "...See more"}
          </button>
        </div>
      </div>
      {post.image ? (
        <img className={styles.postImage} src={post.image} alt="Not found" />
      ) : (
        ""
      )}
      <div className={styles.options}>
        <button
          className={!session.username ? styles.disabled : ""}
          onClick={handleLike}
        >
          {/* {post.likes.filter((user) => user === session.username).length ? (
            <MdFavorite color="red" />
          ) : (
            <MdFavoriteBorder />
          )} */}
          <MdFavoriteBorder />
          {post.likes} |
          {/* <span>
            {post.likes[post.likes.length - 1]},{" "}
            {post.likes[post.likes.length - 2]}
          </span> */}
        </button>
        <button>
          <MdOutlineModeComment /> {post.comments && post.comments.length}
        </button>
        <button>
          <MdShare /> Share
        </button>
      </div>

      {session.username ? (
        <div className={styles.newCommentContainer}>
          <span className={styles.maxLength}>{newComment.length} / 1000</span>
          <form className={styles.newComment} onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              onChange={handleComment}
              name="text"
              value={newComment}
              placeholder="New comment..."
            />
            <button type="submit">
              <MdSend className={styles.icons} />
            </button>
          </form>
          {error ? <span className={styles.error}>{error}</span> : ""}
        </div>
      ) : (
        ""
      )}

      {post.comments && post.comments.length ? (
        <Comment comment={post.comments[post.comments.length - 1]} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
