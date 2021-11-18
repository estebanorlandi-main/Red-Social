import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import image from "../../images/userCard.png";
import UserCard from "../UserCard/UserCard";
import Tags from "../Tags/Tags";
import { NavLink } from "react-router-dom";
import { getSupport } from "../../Redux/actions/Support";

import {
  commentPost,
  deletePost,
  updatePost,
  likePost,
} from "../../Redux/actions/Post";

import {creatReport} from "../../Redux/actions/Support"

import Comment from "../Comment/Comment";

import styles from "../Post/Post.module.css";

//Icons
import {
  MdFavoriteBorder,
  MdOutlineModeComment,
  MdSend,
  MdFavorite,
} from "react-icons/md";

import { GoTrashcan } from "react-icons/go";

import { BsFillPencilFill } from "react-icons/bs";

import { FaPlay } from "react-icons/fa";

import { BiCommentDetail, BiDotsVerticalRounded } from "react-icons/bi";


// import UserCardAdmin from "../Admin/UserCardAdmin/UserCardAdmin";
import SupportUserCard from "./SupportCard";



function SupportCardMessage({ message,customClass }) {
  const dispatch = useDispatch();
  
  
  return (
    <div >
        {message? message.map(e => {
          return(
            <SupportUserCard
          toRight
          showImage
          showName
          message = {e}
          />
          )
        })
        :""}
        
    </div>
  );
}

export default SupportCardMessage;
