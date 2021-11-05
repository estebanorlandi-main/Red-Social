import {useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getSupport } from "../../Redux/actions/Support";

export default function AdminSupport(){
    const dispatch = useDispatch();
    const message = useSelector((state) => state)
    
    getSupport()
    useEffect(()=>{
        dispatch(getSupport())
    })
   
    console.log(message)
    return(
        <div>
            Welcome support
        </div>
    )
}