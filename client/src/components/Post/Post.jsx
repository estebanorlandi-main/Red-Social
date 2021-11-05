import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { commentPost, deletePost, updatePost,getPosts, updatePage } from "../../Redux/actions/Post";

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

function Post({ post, customClass, user }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});

  const [firstLoad, setFirstLoad] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [modo, setModo] = useState(false)
  const [data, setData] = useState({
    title: post.title,
    content: post.content,
    image: post.image
  })
  const createdAt = new Date(post.createdAt).getTime();
  const now = new Date().getTime();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad, setFirstLoad]);

  useEffect(() => {
    setData({
      title: post.title,
      content: post.content,
      image: post.image
    })
    setModo(false)
  }, [post])
  console.log(data, post)
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

  async function borrar(){
    let hola = await dispatch(deletePost(post.idPost));
    dispatch(updatePage(true, hola.payload.posts))
  }
  //console.log(post)
  async function editar(){
    let obj;
    setModo(old=>!old)
    if (modo === true) {
      if ((post.title !== data.title && data.title) || (post.content !== data.content && data.content)) {
        console.log("ifif")
        obj = await dispatch(updatePost(post.idPost, {
          ...post,
          title:data.title,
          content: data.content,
          image: data.image
        }))
        dispatch(updatePage(true, obj.payload.posts))
      }
    }
  }

  function cancel(){
    setModo((old)=> !old)
    setData({
      title: post.title,
      content: post.content,
      image: post.image
    })
  }
  function handleChange(e){
    if (e.target.value === "" && (((!data.content && e.target.name === "image") || (!data.image && e.target.name === "content")) || e.target.name === "title")) {
      return
    }
    setData(old=>({
      ...old,
      [e.target.name]:e.target.value
    }))
  }
  const tags = new Set();
  post.tag.filter((tag) => (!!tag ? tags.add(tag) : false));
  post.tag = Array.from(tags);
  return (
    <div className={styles.container + ` ${customClass}`}>
      <ul className={styles.tags}>
        {post.tag.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
        { /*session.username === post.user.username ?
        <div>
        <li>
        <button onClick={()=>editar()}>editar</button>
      </li>
      <li>
        <button onClick={()=>{borrar()}}>borrar</button>
      </li>
        </div>
           :"" */}
        <li>
          <button onClick={()=>editar()}>{modo?"guardar":"editar"}</button>
        </li>
        <li>
          <button onClick={()=>{borrar()}}>borrar</button>
        </li>
        {modo ?
          <li>
            <button onClick={()=>{cancel()}}>cancel</button>
          </li>
          :""}

      </ul>

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
      <div className={styles.postBody}>
        {modo ? <input value={data.title} name="title" onChange={(e)=>handleChange(e)}/> : <h3>{post.title}</h3>}

        {modo ? <div><textarea value={data.content} name="content" onChange={(e)=>handleChange(e)} /></div> :
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
      }
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
