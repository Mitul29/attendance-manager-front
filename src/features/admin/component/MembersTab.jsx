import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembers } from "../services/members.services";
import MakeLeaderModal from "./MakeLeaderModal";

const MembersTab = ({ activeTab, debouncedSearchVal }) => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [filterdMembers, setFilteredMembers] = useState([]);
  const [makeUserId, setMakeUserId] = useState(null);

  const { getMembers } = useGetMembers();

  const loadMembers = useCallback(async ({ search = "" } = {}) => {
    const filter = { ...(search && { search }), isMember: true };

    const { data, error } = await getMembers(filter);
    if (!error && data && Array.isArray(data)) {
      setMembers(data);
      setFilteredMembers(data);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, []);

  /* Search Client Side */
  useEffect(() => {
    const filterdMembers = members.filter((member) => {
      const nameFilter = member.name
        .toLowerCase()
        .includes(debouncedSearchVal.toLowerCase());

      const attFilter = (`${member.attendanceNo || ""}` || "").includes(
        debouncedSearchVal
      );
      const contactFilter = (member.contact || "").includes(debouncedSearchVal);
      const emailFilter = (member.email || "").includes(debouncedSearchVal);

      return nameFilter || attFilter || contactFilter || emailFilter;
    });
    setFilteredMembers(filterdMembers);
  }, [debouncedSearchVal]);

  return (
    <>
      <div
        className={classNames("user__card__wrapper", {
          hidden: activeTab !== "members",
        })}
      >
        {filterdMembers.map((member) => {
          return (
            <div
              key={member._id}
              className="user__card__box user__card__box__new"
            >
              <div className="inner__wrapper">
                <div className="img__wrapper">
                  <img src="/images/user__img.png" alt="" />
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
                    <span className="contact__link">
                      {member.contact || "-"}
                    </span>
                  </div>
                  <div className="contact__wrapper phone">
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
                        setMakeUserId(member._id);
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
          );
        })}
      </div>
      {makeUserId && (
        <MakeLeaderModal
          key={makeUserId}
          makeUserId={makeUserId}
          setMakeUserId={setMakeUserId}
          loadMembers={loadMembers}
        />
      )}
    </>
  );
};

export default MembersTab;
