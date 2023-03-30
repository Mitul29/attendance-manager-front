import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../core/components/Modal";
import { useGetAssignedMembersAttendance } from "../../admin/services/users.services";

const TODAY_DATE = format(new Date(), "MM/dd/yyyy");

const AddAttendance = () => {
  const navigate = useNavigate();

  const [showSelectDate, setShowSelectDate] = useState(true);
  const [attendanceDate, setAttendanceDate] = useState({
    value: null,
    isValid: true,
  });
  const [assignedMembers, setAssignedMembers] = useState([]);

  const { getAssignedMembersAttendance, isLoading } =
    useGetAssignedMembersAttendance();

  const loadAssignedMembersWithAttendance = async () => {
    if (attendanceDate.value && attendanceDate.isValid) {
      const date = new Date(attendanceDate.value).setHours(0, 0, 0, 0);

      const { data, error } = await getAssignedMembersAttendance({ date });
      if (!error && Array.isArray(data)) {
        const updatedMembers = data.map((m) => {
          const isPresent = m.attendances[0]?.present;
          return { ...m, isPresent };
        });
        setAssignedMembers(updatedMembers);
      }
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="view__member__page attendance__page">
        <img
          className="background__img"
          src="/images/background__img_2.png"
          alt="background"
        />
        <div className="view__member__wrapper">
          <h2 className="main__title">
            Welcome, <span className="name">Dhruv Patel</span>
          </h2>
          <div className="contant__wrapper">
            <div className="user__card__wrapper">
              {assignedMembers.map((member) => {
                return (
                  <div
                    key={member.id}
                    className="user__card__box attendance__users"
                  >
                    <div className="inner__wrapper">
                      <div className="img__wrapper">
                        <div className="no__img__letter">MJ</div>
                      </div>
                      <div className="contact__wrapper__sn">
                        <h4 className="name">{`${member.firstname || ""} ${
                          member.lastname || ""
                        }`}</h4>
                        <div className="radio__wrapper">
                          <div className="custom__radio">
                            <input
                              id={`${member.id}-p`}
                              type="radio"
                              name={`${member.id + "attendance"}`}
                              //   checked={member.isPresent === true}
                              //   onChange={(e) => {}}
                            />
                            <label className="rc__Label ">Present</label>
                          </div>
                          <div className="custom__radio">
                            <input
                              id={`${member.id}-a`}
                              type="radio"
                              name={`${member.id + "attendance"}`}
                              //   checked={member.isPresent === false}
                              //   onChange={() => {}}
                            />
                            <label className="rc__Label ">Absent</label>
                          </div>
                        </div>
                        <p className="attendance__no">
                          <span className="label">Att. No. </span>
                          <span className="value">1944747</span>
                        </p>
                        <div className="contact__wrapper phone">
                          <a
                            className="contact__link"
                            href="tel:+91 84747 74747"
                          >
                            +91 84747 74747
                          </a>
                        </div>
                      </div>
                      <div className="save__btn__wrapper">
                        <button className="save__btn" type="">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <img className="nagar__img" src="/images/building__img.png" alt="" />
      </div>

      <Modal
        title="Select Date of Attendance"
        isOpen={showSelectDate}
        closeModal={() => navigate("/")}
        showHeaderClose={false}
        onClickSubmit={() => {
          if (!attendanceDate.isValid || !attendanceDate.value) {
            return setAttendanceDate((prev) => ({ ...prev, isValid: false }));
          }
          setShowSelectDate(false);
          loadAssignedMembersWithAttendance();
        }}
      >
        <form>
          <div className="form__group">
            <div className="date__filter">
              <input
                className="date__input"
                type="date"
                onChange={(e) => {
                  setAttendanceDate({ value: e.target.value, isValid: true });
                }}
              />
              {!attendanceDate.isValid && (
                <p className="error">Date is required.</p>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddAttendance;
