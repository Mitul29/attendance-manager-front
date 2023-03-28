import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLogin } from "../services/auth.service";

import { setCredentials } from "../../../redux/modules/authSlice";
import useToast from "../../../core/hooks/useToast";

const loginValidation = yup.object().shape({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const { setToastMessage } = useToast();
  const { login } = useLogin();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (formValues) => {
    const { data, error } = await login(formValues);

    if (error) return setToastMessage({ message: error, type: "error" });

    const { user, token } = data;
    dispatch(setCredentials({ user, accessToken: token }));
  };

  return (
    <div className="login__page">
      <img
        className="background__img"
        src="images/background__img_2.png"
        alt="backgroud"
      />
      <div className="logo__wrapper">
        <img src="images/logo.png" alt="SMVS" />
      </div>
      <div className="login__form">
        <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="top__header__form">
            <div className="img__wrapper">
              <img src="images/logo.png" alt="SMVS" />
            </div>
            <div className="cn__wrapper">
              <h1 className="title">Login</h1>
              <p className="text">
                please enter your username And password in order to continue
              </p>
            </div>
          </div>
          <div className="form__contant">
            <div className="form__group">
              <label className="label">Username*</label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("username")}
              />
              <p>{errors.username?.message}</p>
            </div>
            <div className="form__group">
              <label className="label">Password*</label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? "hide" : "show"}
              </button>
              <p>{errors.password?.message}</p>
            </div>
            <div className="rem__sub__wrapper">
              <div className="submit__wrapper">
                <input
                  className="submit__btn"
                  type="submit"
                  name=""
                  value="Login"
                />
              </div>
              <div className="custom__checkbox">
                <input type="checkbox" name="remember" />
                <label className="rc__Label ">Remember me</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <img className="nagar__img" src="images/building__img.png" alt="" />
    </div>
  );
};

export default Login;
