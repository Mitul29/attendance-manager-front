import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUsers } from "../services/users.services";
import ReactSelect from "react-select";
import {
  useAddMember,
  useEditMember,
  useGetMember,
} from "../services/members.services";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../../core/hooks/useToast";

const memberValidation = yup.object().shape({
  firstname: yup.string().required("Firstname is required."),
  attendance_no: yup
    .number()
    .typeError("Must be a number")
    .required("Attendance No is required."),
  contact: yup.string().required("Phone number is required."),
  email: yup.string().email("Email is not valid.").nullable(),
});

const AddMember = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(memberValidation),
  });

  const { setToastMessage } = useToast();

  const { addMember, isLoading: addMemberLoader } = useAddMember();
  const { editMember, isLoading: editMemberLoader } = useEditMember();
  const { getMember, isLoading: getMembersLoader } = useGetMember();
  const { getUsers, isLoading: getUsersLoader } = useGetUsers();

  const isEditMode = params.id !== "new";

  const assign_to = watch("assign_to");
  const [assignUsers, setAssignUsers] = useState([]);

  const loadAssignUsersOptions = async () => {
    const { data, error } = await getUsers();
    if (!error && Array.isArray(data)) {
      const options = data.map((user) => {
        const fname = user.userDetails.firstname || "";
        const lname = user.userDetails.lastname || "";

        return { label: `${fname} ${lname}`, value: user.id };
      });

      setAssignUsers(options);
    }
  };

  const loadEditedMember = async () => {
    const { data, error } = await getMember(params.id);
    if (!error && data) {
      reset({
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        attendance_no: data.attendance_no,
        contact: data.contact,
        email: data.email,
        assign_to: data.assignedUser?.id,
      });
    }
  };

  useEffect(() => {
    loadAssignUsersOptions();
    if (params.id !== "new") {
      loadEditedMember();
    }
  }, [isEditMode]);

  const onSubmit = async (formValues) => {
    const formData = { ...formValues, role: 1 /* Member */ };

    if (!isEditMode) {
      const { error } = await addMember(formData);
      if (error) return setToastMessage({ message: error, type: "error" });
    } else {
      const { error } = await editMember(params.id, formData);
      if (error) return setToastMessage({ message: error, type: "error" });
    }

    navigate("/admin/members");
  };

  if (getMembersLoader || getUsersLoader) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="login__page">
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="logo__wrapper">
        <img src="/images/logo.png" alt="SMVS" />
      </div>
      <div className="login__form">
        <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="top__header__form">
            <div className="img__wrapper">
              <img src="/images/logo.png" alt="SMVS" />
            </div>
            <div className="cn__wrapper">
              <h1 className="title">
                {!isEditMode ? "Add Member" : "Update Member"}{" "}
              </h1>
              <p className="text">
                Please fill up below form in order to{" "}
                {!isEditMode ? "add" : "update"} member
              </p>
            </div>
          </div>
          <div className="form__contant">
            <div className="double__group">
              <div className="form__group">
                <label className="label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstname")}
                />
                <p className="error">{errors.firstname?.message}</p>
              </div>
              <div className="form__group">
                <label className="label">Middle Name</label>
                <input
                  type="text"
                  placeholder="Enter Middle name"
                  {...register("middlename")}
                />
              </div>
              <div className="form__group">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastname")}
                />
              </div>
              <div className="form__group">
                <label className="label">Attendance No</label>
                <input
                  type="number"
                  placeholder="Enter Attendance No."
                  {...register("attendance_no")}
                />
                <p className="error">{errors.attendance_no?.message}</p>
              </div>
            </div>
            <div className="form__group">
              <label className="label">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <div className="form__group">
              <label className="label">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone"
                {...register("contact")}
              />
              <p className="error">{errors.contact?.message}</p>
            </div>
            <div className="form__group">
              <label className="label">Assign To</label>

              <ReactSelect
                className=""
                key={getValues("assign_to")}
                options={assignUsers}
                value={assignUsers.find(
                  (e) => e.value === getValues("assign_to")
                )}
                onChange={(e) => setValue("assign_to", e?.value)}
                isClearable
                isSearchable
              />
            </div>
            <div className="rem__sub__wrapper">
              <div className="submit__wrapper">
                <button
                  className="submit__btn"
                  type="submit"
                  disabled={addMemberLoader || editMemberLoader}
                >
                  {!isEditMode ? "+ Add" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AddMember;
