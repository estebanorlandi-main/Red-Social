import axios from "axios";
import { io } from "socket.io-client";
import { ERROR } from "./Errors";

export const SET_STATE = "SET_STATE";



export function setUntrackMessages(data) {
  return {
    type:SET_STATE, 
    payload: data
  } 
}
