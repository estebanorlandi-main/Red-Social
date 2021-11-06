import {useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getSupport } from "../../Redux/actions/Support";

export default function AdminSupport(){
    const dispatch = useDispatch();
    const message = useSelector((state) => state.supportReducer.messageSupport)
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
    console.log(message)
    return(
        <div>
        { message.length > 0 ? message.map(e =>
            <div>
                <h3>{e.title}</h3>
                <p>{e.content}</p>

            </div>): true}
        {/* <button onClick={e => handleClick(e)}>recargar</button> */}
            Welcom support
       
        </div>
    )
}