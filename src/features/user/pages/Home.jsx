import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/modules/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      HOme
      <button onClick={() => dispatch(logOut())}>Logout</button>
    </div>
  );
};

export default Home;
