import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../core/components/Modal";
import useToast from "../../../core/hooks/useToast";
import { useChangePassword } from "../services/users.services";

const changePassValidation = yup.object().shape({
  password: yup.string().required("Password is required."),
});

const ChangePassModal = ({ changePassId, setChangePassId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(changePassValidation),
  });

  const [showPass, setShowPass] = useState(false);

  const { setToastMessage } = useToast();
  const { changePassword, isLoading: changePassLoader } = useChangePassword();

  const updatePassword = async (passwordData) => {
    const { password } = passwordData;

    const { error } = await changePassword(changePassId, { password });

    if (!error) {
      setToastMessage({
        message: "Password Updated Successfully",
        type: "success",
      });
    } else {
      setToastMessage({ message: "Password Not Updated.", type: "error" });
    }

    setChangePassId(null);
  };

  return (
    <Modal
      isOpen={changePassId}
      onClickCancel={() => setChangePassId(null)}
      onClickSubmit={handleSubmit(updatePassword)}
      submitBtnLoader={changePassLoader}
      title="Change Password"
    >
      <form onSubmit={handleSubmit(updatePassword)}>
        <div>
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
    </Modal>
  );
};

export default ChangePassModal;
