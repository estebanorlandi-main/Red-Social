import {useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getSupport } from "../../Redux/actions/Support";

export default function AdminSupport(){
    const dispatch = useDispatch();
    const message = useSelector((state) => state.supportReducer)
    const [flags, setFlags] = useState(false)
    
   
    useEffect(()=>{
        console.log('flags')
        dispatch(getSupport())
    },[flags])
    
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(getSupport())
        console.log('entra')
        setFlags(true)
    console.log(flags)
        
    }
    console.log(flags)
    console.log(message)
    return(
        <div>
        <button onClick={e => handleClick(e)}>recargar</button>
            Welcome support
        </div>
    )
}