import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileImgLetters } from "../../../helper/commonHelper";
import MakeLeaderModal from "./MakeLeaderModal";

const MemberCard = ({ member, loadMembers }) => {
  const navigate = useNavigate();
  const [openMakeLeader, setOpenMakeLeader] = useState(false);

  return (
    <>
      <div key={member._id} className="user__card__box user__card__box__new">
        <div className="inner__wrapper">
          <div className="img__wrapper">
            <div className="no__img__letter">
              {getProfileImgLetters(member.name)}
            </div>
          </div>
          <div className="contact__wrapper__sn">
            <h4 className="name">
              <span className="name__text">{member.name}</span>
              <button
                className="edit__btn"
                type="button"
                onClick={() => navigate(`/admin/members/${member._id}`)}
              >
                <img src="/images/edit__icon.png" alt="" />
              </button>
            </h4>
            <p className="attendance__no">
              <span className="label">Attendance No:</span>
              <span className="value">{member.attendanceNo || "-"}</span>
            </p>
            <div className="contact__wrapper phone">
              <span className="contact__link">{member.contact || "-"}</span>
            </div>
            <div className="contact__wrapper email">
              <span className="contact__link" role="button">
                {member.email}
              </span>
            </div>
            <button
              className={`make__as__user__btn ${
                member.role === "leader" ? "opacity-0" : ""
              }`}
              type="button"
              onClick={() => {
                if (member.role !== "leader") {
                  setOpenMakeLeader(true);
                }
              }}
            >
              Make as leader
            </button>
          </div>

          {!member.assignTo && member.role !== "leader" && (
            <div className="assign__tag__text">Not Assigned</div>
          )}
        </div>
      </div>

      {/* Create leader */}
      {openMakeLeader && (
        <MakeLeaderModal
          memberId={member._id}
          onClose={() => setOpenMakeLeader(false)}
          loadMembers={loadMembers}
        />
      )}
    </>
  );
};

export default MemberCard;
