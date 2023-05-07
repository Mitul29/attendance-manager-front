import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSignIn } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLogin } from "../services/auth.service";
import { setCredentials } from "../../../redux/modules/authSlice";

import useToast from "../../../core/hooks/useToast";
import Button from "../../../core/components/Button";

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
  const { login, isLoading } = useLogin();

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (formValues) => {
    const { username, password } = formValues;
    const loginData = { username: username.trim(), password };

    const { data, error } = await login(loginData);
    if (error) return setToastMessage({ message: error, type: "error" });

    const { user, token } = data;
    dispatch(setCredentials({ user, accessToken: token }));
    setToastMessage({ message: "Login Success", type: "success" });
  };

  return (
    <>
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
                  Please enter your username and password to continue
                </p>
              </div>
            </div>
            <div className="form__contant">
              <div className="login__form__body">
                <div className="form__group">
                  <label className="label">Username*</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                  <p className="error">{errors.username?.message}</p>
                </div>
                <div className="form__group">
                  <label className="label">Password*</label>
                  <div className="view__password">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <button
                      className="view__btn show"
                      type="button"
                      onClick={() => setShowPass((prev) => !prev)}
                    >
                      <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <p className="error">{errors.password?.message}</p>
                </div>
              </div>
              <div className="login__form__footer">
                <div className="rem__sub__wrapper">
                  <div className="submit__wrapper">
                    <Button
                      className="submit__btn"
                      isLoading={isLoading}
                      icon={<FontAwesomeIcon icon={faSignIn} />}
                    >
                      Login
                    </Button>
                  </div>
                  <div className="custom__checkbox">
                    <input type="checkbox" name="remember" />
                    <label className="rc__Label ">Remember me</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <img className="nagar__img" src="images/building__img.png" alt="" />
      </div>
    </>
  );
};

export default Login;
