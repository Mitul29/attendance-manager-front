import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToast, removeToast } from "../../../redux/modules/toastSlice";

const Toast = (props) => {
  const toastMessage = useSelector(getToast);
  const dispatch = useDispatch();

  return toastMessage.length ? (
    <div>
      {toastMessage.map((toast, index) => (
        <div key={index} className={`${toast.type}`}>
          <p>{toast.message}</p>
          <button onClick={() => dispatch(removeToast({ id: toast.id }))}>
            X
          </button>
        </div>
      ))}
    </div>
  ) : null;
};

export default Toast;
