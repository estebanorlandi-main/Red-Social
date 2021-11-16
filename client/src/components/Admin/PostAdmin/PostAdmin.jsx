import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import image from "../../../images/userCard.svg";

import {
  commentPost,
  deletePost,
  updatePost,
  updatePage,
  likePost,
  banPost,
} from "../../../Redux/actions/Post";

import Comment from "../../Comment/Comment";

import styles from "./PostAdmin.module.css";

//Icons
import {
  MdFavoriteBorder,
  MdOutlineModeComment,
  MdShare,
  MdSend,
  MdFavorite,
} from "react-icons/md";

import { GoTrashcan } from "react-icons/go";

import { BsFillPencilFill } from "react-icons/bs";

import { BiCommentDetail, BiDotsVerticalRounded } from "react-icons/bi";
import validate from "../../../utils/validate";

const parseContent = (text) => {
  const mentions = text && text.match(/@\w+/gi);

  if (!mentions) return [text];

  const parsed = text.split(" ").map((value) => {
    if (mentions.includes(value)) {
      return (
        <Link
          className={styles.mention}
          to={`/profile/${value.slice(1, value.length)}`}
        >
          {value}
        </Link>
      );
    } else return " " + value + " ";
  });

  return parsed;
};

function PostAdmin({ post, customClass, user, admin }) {
  const dispatch = useDispatch();

  const page = useSelector(({ postsReducer: { page } }) => page);
  const session = useSelector((state) => state.adminReducer.user || {});

  const [firstLoad, setFirstLoad] = useState(true);
  const [seeMore, setSeeMore] = useState(false);

  const [newComment, setNewComment] = useState("");

  const [commentError, setCommentError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  const [options, setOptions] = useState(false);

  const [data, setData] = useState({
    title: post.title,
    content: post.content,
    image: post.image,
  });

  const createdAt = new Date(post.updatedAt).getTime();
  const now = new Date().getTime();
  const TimeSpan = Math.round(Math.abs(now - createdAt) / 36e5);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad, setFirstLoad]);

  useEffect(() => {
    setData({
      title: post.title,
      content: post.content,
      image: post.image,
    });
  }, [post]);

  const handleComment = ({ target: { name, value } }) => {
    setNewComment(value);
    setCommentError(validate(name, value));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (commentError) return;
    dispatch(commentPost(post.idPost, newComment, session.username));
  };

  const handleDelete = () => dispatch(deletePost(post.idPost));
  const handleEditMode = (mode) => {
    setData({
      title: post.title,
      content: post.content,
      image: post.image,
    });
    setEditMode(mode);
  };

  const handleLike = async (e) => {
    let obj;
    if (session.username) {
      obj = await dispatch(
        likePost({ postIdPost: post.idPost, userId: session.username })
      );
    }
    dispatch(updatePage(true, obj.payload.posts));
  };

  function handleChange({ target: { name, value } }) {
    if (
      value === "" &&
      ((!data.content && name === "image") ||
        (!data.image && name === "content") ||
        name === "title")
    ) {
      return;
    }
    setData((old) => ({ ...old, [name]: value }));
  }

  const handleOptions = () => setOptions((old) => !old);

  const tags = new Set();
  post.tag.filter((tag) => (!!tag ? tags.add(tag) : false));
  post.tag = Array.from(tags);

  let test;
  if (post.content) test = parseContent(post.content);

  const hanbleBanPost = (e) =>{
    e.preventDefault();
    dispatch(banPost(e.target.value))
  }

  return (
    <div className={styles.container + ` ${customClass}`}>
      {session.username === post.user.username ? (
        <div className={styles.options}>
          <button onClick={handleOptions} className={styles.optionsHandler}>
            <BiDotsVerticalRounded
              style={{ color: "#aaa", width: "2em", height: "2em" }}
            />
          </button>

          {editMode ? (
            <li>
              <button
                onClick={() => {
                  handleEditMode(false);
                }}
              >
                cancel
              </button>
            </li>
          ) : (
            ""
          )}

          <div
            className={`${options ? styles.show : styles.hide} ${
              styles.optionsMenu
            }`}
          >
            <button onClick={() => handleEditMode(true)}>
              <BsFillPencilFill />
              Edit
            </button>
            <button
              className={styles.danger}
              onClick={() => {
                handleDelete();
              }}
            >
              <GoTrashcan style={{ color: "#ff5555" }} />
              Delete
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      
      {post.ban === false?
      <div>
        <ul className={styles.tags}>
        {post.tag.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
      <button value={post.idPost}
        name="Ban Post"
        onClick={(e) => hanbleBanPost(e)}>Ban POST</button>
      <Link
        className={styles.userContainer}
        to={`/profileAdmin/${post.user.username}`}
      >
        <img
          className={styles.avatar}
          src={post.user.image || image}
          alt="avatar"
        />
        <div>
          <span className={styles.username}>{post.user.username}</span>
          <span className={styles.github}>Posted {TimeSpan}hr</span>
        </div>
      </Link>
      <div className={styles.postBody}>
        {editMode ? (
          <input
            value={data.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <h3>{post.title}</h3>
        )}

        {editMode ? (
          <div>
            <textarea
              value={data.content}
              name="content"
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <div
            className={styles.mainContent + ` ${seeMore ? styles.expand : ""}`}
            style={seeMore ? { overflowY: "visible" } : { overflowY: "hidden" }}
          >
            <p
              className={styles.text}
              style={seeMore ? { marginBottom: "1em" } : { marginBottom: "0" }}
            >
              {test && test.map((value) => value)}
            </p>
            <button
              className={styles.seeMore}
              style={seeMore ? { bottom: "-2em" } : { bottom: "0" }}
              onClick={() => setSeeMore((old) => !old)}
            >
              {seeMore ? "...See less" : "...See more"}
            </button>
          </div>
        )}
      </div>
      {post.imageData ? (
        <img
          className={styles.postImage}
          src={`data:${post.imageType};base64, ${post.imageData}`}
          alt={post.imageName}
        />
      ) : (
        ""
      )}
      <div className={styles.actions}>
        <button className={!session.username ? "" : ""} onClick={handleLike}>
          {post.userLikes.filter(
            (user) => user.user.username === session.username
          ).length ? (
            <MdFavorite color="red" />
          ) : (
            <MdFavoriteBorder />
          )}
          {post.userLikes.length} |
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
          <form className={styles.newComment} onSubmit={submitComment}>
            <label className={commentError ? "error" : ""}>
              <div className="input-group">
                <textarea
                  onChange={handleComment}
                  name="comment"
                  type="text"
                  value={newComment}
                  placeholder="New comment..."
                />
              </div>
              <button type="submit">
                <MdSend className={styles.icons} />
              </button>
            </label>
            <span>{commentError}</span>
          </form>
        </div>
      ) : (
        ""
      )}

      {post.comments && post.comments.length ? (
        <ul className={styles.comments}>
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </ul>
      ) : (
        ""
      )} 
      </div>
      : ''}
    </div>
  );
}

export default PostAdmin;
