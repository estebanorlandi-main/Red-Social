import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSupport } from "../../Redux/actions/Support";
import SupportCardMessage from "../Support/SupportCardMessage";

export default function AdminSupport() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.supportReducer.messageSupport);

  const [flags, setFlags] = useState(false);

  useEffect(() => {
    dispatch(getSupport());
  }, [dispatch, flags]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getSupport());
    setFlags(true);
  };

  return (
    <div>
      {message.length > 0 ? 
      <SupportCardMessage message={message}/>
      : (
        <div>Welcom support</div>
      )}
      <button onClick={(e) => handleClick(e)}>recargar</button>;
    </div>
  );
}

