import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../core/components/Modal";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/modules/authSlice";
import { useGetAttendanceByLeaderId } from "../../admin/services/attendance.services";
import AddAttendanceItem from "../components/AddAttendanceItem";
import Header from "../../../core/components/Header";
import Loader from "../../../core/components/Loader/Loader";
import NoRecord from "../../admin/component/NoRecord";

const TODAY_DATE = format(new Date(), "yyyy-MM-dd");

const AddAttendance = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const leaderId = currentUser?._id;

  const [showSelectDate, setShowSelectDate] = useState(true);
  const [attendanceDate, setAttendanceDate] = useState({
    value: TODAY_DATE,
    isValid: true,
  });
  const [assignedMembers, setAssignedMembers] = useState([]);

  const { getAttendanceByLeaderId, isLoading } = useGetAttendanceByLeaderId();

  const loadAssignedMembersWithAttendance = async () => {
    if (attendanceDate.value && attendanceDate.isValid) {
      const date = new Date(attendanceDate.value);

      const { data, error } = await getAttendanceByLeaderId(leaderId, {
        date,
      });
      if (!error && Array.isArray(data)) {
        setAssignedMembers(data);
      }
    }
  };

  return (
    <>
      <div className="view__member__page attendance__page">
        <Header />
        <img
          className="background__img"
          src="/images/background__img_2.png"
          alt="background"
        />
        <div className="view__member__wrapper">
          <h2 className="main__title">
            Welcome<span className="name">, {currentUser?.name || ""}</span>
          </h2>
          <div className="contant__wrapper">
            <div className="user__card__wrapper">
              {isLoading ? (
                <Loader />
              ) : !assignedMembers.length ? (
                <NoRecord />
              ) : (
                assignedMembers.map((member) => (
                  <AddAttendanceItem
                    key={member._id}
                    leader={currentUser}
                    member={member}
                    date={attendanceDate.value}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <img className="nagar__img" src="/images/building__img.png" alt="" />
      </div>

      <Modal
        title="Select Date of Attendance"
        isOpen={showSelectDate}
        closeModal={() => navigate(-1)}
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
            <div className="date__filter full">
              <input
                className="date__input"
                type="date"
                value={attendanceDate.value}
                max={format(new Date(), "yyyy-MM-dd")}
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
