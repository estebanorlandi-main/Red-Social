import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import styles from "./Chat.module.css";
import {getUsers} from "../../Redux/actions/Users.js"

export default function Chat() {

  const dispatch = useDispatch()
  let convers = useSelector((state)=> {console.log(state);return state.usersReducer.convers})
  useEffect(()=>{dispatch(getUsers())},[dispatch])


  return (
    <div>
      <ul>
      {convers? convers.map(e=><li><button>{e.username}</button></li>):<></>}
      </ul>
    </div>
  );
}