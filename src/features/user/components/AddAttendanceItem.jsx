import React, { useEffect, useRef, useState } from "react";
import { useAddAttendance } from "../../admin/services/attendance.services";
import useToast from "../../../core/hooks/useToast";
import Modal from "../../../core/components/Modal";
import { getProfileImgLetters } from "../../../helper/commonHelper";
import Button from "../../../core/components/Button";

const AddAttendanceItem = ({ member, date }) => {
  const remarkRef = useRef(null);

  const [isOpenRemark, setOpenRemark] = useState(false);
  const [attendance, setAttendance] = useState({ present: null, remark: "" });

  const { setToastMessage } = useToast();
  const { addAttendance, isLoading: addAttLoader } = useAddAttendance();

  useEffect(() => {
    if (member && member.attendance) {
      const { present, remark } = member.attendance;
      setAttendance({ present, remark });
    }
  }, [member]);

  const saveAttendance = async () => {
    const addData = { userId: member._id, date: new Date(date), ...attendance };
    const { error } = await addAttendance(addData);
    if (error) {
      setToastMessage({ message: error, type: "error" });
    }
    setToastMessage({ message: "Updated Successfully", type: "success" });
  };

  return (
    <>
      <div className="user__card__box attendance__users">
        <div className="inner__wrapper">
          <div className="img__wrapper">
            <div className="no__img__letter">
              {getProfileImgLetters(member.name)}
            </div>
          </div>
          <div className="contact__wrapper__sn">
            <h4 className="name">{member.name}</h4>
            <div className="radio__wrapper">
              <div className="custom__radio">
                <input
                  id={`${member._id}-p`}
                  type="radio"
                  name={`${member._id + "attendance"}`}
                  checked={attendance.present === true}
                  onChange={(e) => {
                    setAttendance((prev) => ({
                      ...prev,
                      present: e.target.checked,
                    }));
                  }}
                />
                <label className="rc__Label ">Present</label>
              </div>
              <div className="custom__radio">
                <input
                  id={`${member._id}-a`}
                  type="radio"
                  name={`${member._id + "attendance"}`}
                  checked={attendance.present === false}
                  onChange={(e) => {
                    setAttendance((prev) => ({
                      ...prev,
                      present: false,
                    }));
                  }}
                />
                <label className="rc__Label ">Absent</label>
              </div>
            </div>
            <p className="attendance__no">
              <span className="label">Att. No:</span>
              <span className="value">{member.attendanceNo || "-"}</span>
            </p>

            <p className="attendance__no">
              <span className="label">Remark:</span>
              <span className="value">{attendance.remark}</span>
              <button
                className="make__as__user__btn"
                type="button"
                onClick={() => setOpenRemark(true)}
              >
                {attendance.remark ? "Update" : "Add"} Remark
              </button>
            </p>
          </div>
          <div className="save__btn__wrapper">
            <Button
              className="save__btn"
              isLoading={addAttLoader}
              disabled={attendance.present === null || addAttLoader}
              onClick={saveAttendance}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      {isOpenRemark && (
        <Modal
          isOpen={isOpenRemark}
          cancelBtn={false}
          onClickCancel={() => setOpenRemark(false)}
          onClickSubmit={() => {
            setAttendance((prev) => ({
              ...prev,
              remark: remarkRef.current.value || "",
            }));
            setOpenRemark(false);
          }}
          title="Remark"
          submitBtnText="Update"
        >
          <div className="view__password">
            <textarea
              ref={remarkRef}
              placeholder="Enter Remark"
              defaultValue={attendance.remark}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddAttendanceItem;
