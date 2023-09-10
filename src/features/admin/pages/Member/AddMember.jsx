import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactSelect from "react-select";
import {
  useAddMember,
  useEditMember,
  useGetMember,
  useGetMembers,
} from "../../services/members.services";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useToast from "../../../../core/hooks/useToast";
import Header from "../../../../core/components/Header";
import Loader from "../../../../core/components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../core/components/Button";
// import { useGetUsersHierarchy } from "../../services/users.services";

const memberValidation = yup.object().shape({
  name: yup.string().required("name is required."),
  attendanceNo: yup
    .number()
    .typeError("Must be a number")
    .required("Attendance No is required."),
  contact: yup.string().required("Phone number is required."),
  email: yup.string().email("Email is not valid.").nullable(),
});

const AddMember = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
  const { getMembers, isLoading: getLeadersLoader } = useGetMembers();
  // const { getUsersHierarchy } = useGetUsersHierarchy();

  const isEditMode = params.id !== "add";

  const assignTo = watch("assignTo");

  const [leaders, setLeaders] = useState([]);

  function flattenedChildren(items) {
    return items.flatMap((item) => {
      const children = item.children || [];
      return [item, ...flattenedChildren(children)];
    });
  }

  const loadLeaderOptions = async () => {
    const { data, error } = await getMembers({ isLeader: true });
    if (!error && Array.isArray(data)) {
      const options = data
        .map((leader) => {
          return { label: leader.name, value: leader._id };
        })
        .filter((l) => l.value !== params.id);

      setLeaders(options);
    }
  };

  // const loadLeaderOptionsWithoutItsChild = async () => {
  //   const { data, error } = await getMembers({ isLeader: true });
  //   if (!error && Array.isArray(data)) {
  //     const allLeaders = data
  //       .map((leader) => {
  //         return { label: leader.name, value: leader._id };
  //       })
  //       .filter((l) => l.value !== params.id);

  //     const res = await getUsersHierarchy({ leaderId: params.id });
  //     if (!res.error && Array.isArray(res.data)) {
  //       const childLeaders = res.data
  //         .flatMap((item) => {
  //           const children = item.children || [];
  //           return [item, ...flattenedChildren(children)];
  //         })
  //         .filter((item) => item.role === "leader")
  //         .map((item) => item._id);

  //       const withOutItsChild = allLeaders.filter(
  //         (item) => !childLeaders.includes(item.value)
  //       );
  //       setLeaders(withOutItsChild);
  //     }
  //   }
  // };

  const loadEditedMember = async () => {
    const { data, error } = await getMember(params.id);

    if (!error && data) {
      reset({
        name: data.name,
        attendanceNo: data.attendanceNo,
        contact: data.contact,
        email: data.email,
        address: data.address,
        assignTo: data.assignTo,
      });

      // if (data.role !== "leader") {
      //   loadLeaderOptions();
      // } else {
      //   loadLeaderOptionsWithoutItsChild();
      // }
    }
  };

  useEffect(() => {
    loadLeaderOptions();
    if (params.id !== "add") {
      loadEditedMember();
    }
    // else {
    //   loadLeaderOptions();
    // }
  }, [isEditMode]);

  const onSubmit = async (formValues) => {
    const formData = { ...formValues, assignTo: assignTo || null };

    if (!isEditMode) {
      const { error } = await addMember(formData);
      if (error) return setToastMessage({ message: error, type: "error" });
    } else {
      const { error } = await editMember(params.id, formData);
      if (error) return setToastMessage({ message: error, type: "error" });
    }

    navigate(`/admin/${location.state?.from || "members"}`);
    setToastMessage({
      message: `Member ${isEditMode ? "Updated" : "Added"} Successfully`,
      type: "success",
    });
  };

  return (
    <div className="login__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="login__form add__member__form">
        {getMembersLoader || getLeadersLoader ? (
          <Loader />
        ) : (
          <>
            <button className="back__btn flex" onClick={() => navigate(-1)}>
              <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
              Back
            </button>
            <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="top__header__form">
                <div className="img__wrapper">
                  <img src="/images/logo.png" alt="SMVS" />
                </div>
                <div className="cn__wrapper">
                  <h1 className="title">
                    {!isEditMode ? "Add User" : "Update User"}{" "}
                  </h1>
                  <p className="text">
                    Please fill up below form in order to{" "}
                    {!isEditMode ? "add" : "update"} user
                  </p>
                </div>
              </div>
              <div className="form__contant">
                {getMembersLoader || getLeadersLoader ? (
                  <Loader />
                ) : (
                  <div className="login__form__body">
                    <div className="double__group">
                      <div className="form__group">
                        <label className="label">Name</label>
                        <input
                          type="text"
                          placeholder="Enter FullName"
                          {...register("name")}
                        />
                        <p className="error">{errors.name?.message}</p>
                      </div>
                      <div className="form__group">
                        <label className="label">Attendance No</label>
                        <input
                          type="number"
                          placeholder="Enter Attendance No."
                          {...register("attendanceNo")}
                        />
                        <p className="error">{errors.attendanceNo?.message}</p>
                      </div>
                    </div>
                    <div className="double__group">
                      <div className="form__group">
                        <label className="label">Email</label>
                        <input
                          type="text"
                          placeholder="Enter your email"
                          {...register("email")}
                        />
                        <p className="error">{errors.email?.message}</p>
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
                    </div>
                    <div className="form__group">
                      <label className="label">Address</label>
                      <input
                        type="text"
                        placeholder="Enter your address"
                        {...register("address")}
                      />
                    </div>
                    <div className="form__group">
                      <label className="label">Assign To</label>

                      <ReactSelect
                        className=""
                        key={getValues("assignTo")}
                        options={leaders}
                        value={leaders.find(
                          (e) => e.value === getValues("assignTo")
                        )}
                        onChange={(e) => setValue("assignTo", e?.value)}
                        isClearable
                        isSearchable
                      />
                    </div>
                    <div className="rem__sub__wrapper">
                      <div className="submit__wrapper">
                        <Button
                          className="submit__btn"
                          type="submit"
                          isLoading={addMemberLoader || editMemberLoader}
                        >
                          {!isEditMode ? "+ Add" : "Update"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </>
        )}
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AddMember;
