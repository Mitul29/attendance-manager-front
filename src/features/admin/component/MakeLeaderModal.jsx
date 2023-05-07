import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../core/components/Modal";

import useToast from "../../../core/hooks/useToast";
import { useMakeAsLeader } from "../services/users.services";

const memberValidation = yup.object().shape({
  username: yup.string().required("username is required."),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
});

const MakeLeaderModal = ({ memberId, onClose, loadMembers }) => {
  const [showPass, setShowPass] = useState(false);

  const { makeLeader, isLoading } = useMakeAsLeader();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(memberValidation),
  });

  const { setToastMessage } = useToast();

  const onSubmit = async (formValues) => {
    const { username, password } = formValues;
    const leaderCreds = { username: username.trim(), password };

    const { error } = await makeLeader(memberId, leaderCreds);

    if (error) {
      return setToastMessage({ message: error, type: "error" });
    }

    loadMembers();
    setToastMessage({
      message: "Leader Added sucessfully...",
      type: "success",
    });
    onClose();
  };

  return (
    <Modal
      title="Make as leader"
      wrapperclassName="view__member__modal"
      isOpen
      onClickCancel={onClose}
      submitBtnLoader={isLoading}
      onClickSubmit={handleSubmit(onSubmit)}
    >
      <>
        <form>
          <div className="form__group">
            <label className="label__full">Username</label>
            <input
              placeholder="Enter username"
              type="text"
              {...register("username")}
            />
            <p className="error">{errors.username?.message}</p>
          </div>
          <div className="form__group">
            <label className="label__full">Password</label>
            <div className="view__password">
              <input
                placeholder="Enter password"
                type={showPass ? "text" : "password"}
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
        </form>
      </>
    </Modal>
  );
};

export default MakeLeaderModal;
