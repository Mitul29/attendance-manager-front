import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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

  const { setToastMessage } = useToast();
  const { changePassword } = useChangePassword();

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
    >
      <div className="form__group">
        <label className="label">Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>
      </div>
    </Modal>
  );
};

export default ChangePassModal;
