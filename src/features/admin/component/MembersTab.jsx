import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembers } from "../services/members.services";

const MembersTab = ({ activeTab, debouncedSearchVal }) => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [filterdMembers, setFilteredMembers] = useState([]);

  const { getMembers } = useGetMembers();

  const memberFullName = (member) => {
    return `${member.firstname || ""} ${member.middlename || ""} ${
      member.lastname || ""
    }`;
  };

  const loadMembers = useCallback(async ({ search = "" } = {}) => {
    const filter = { ...(search && { search }) };

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
      const nameFilter = memberFullName(member)
        .toLowerCase()
        .includes(debouncedSearchVal.toLowerCase());

      const attFilter = (`${member.attendance_no || ""}` || "").includes(
        debouncedSearchVal
      );
      const contactFilter = (member.contact || "").includes(debouncedSearchVal);
      const emailFilter = (member.email || "").includes(debouncedSearchVal);

      return nameFilter || attFilter || contactFilter || emailFilter;
    });
    setFilteredMembers(filterdMembers);
  }, [debouncedSearchVal]);

  return (
    <div
      className={classNames("user__card__wrapper", {
        hidden: activeTab !== "members",
      })}
    >
      {filterdMembers.map((member) => {
        return (
          <div key={member.id} className="user__card__box">
            <div className="inner__wrapper">
              <div className="img__wrapper">
                <img src="/images/user__img.png" alt="" />
              </div>
              <div className="contact__wrapper__sn">
                <h4 className="name">{memberFullName(member)}</h4>
                <button onClick={() => navigate(`/admin/members/${member.id}`)}>
                  Edit
                </button>
                <p className="attendance__no">
                  <span className="label">Attendance No:</span>
                  <span className="value">{member.attendance_no || "-"}</span>
                </p>
                <div className="contact__wrapper phone">
                  <a className="contact__link" href="##">
                    {member.contact || "-"}
                  </a>
                </div>
                <div className="contact__wrapper phone">
                  <a className="contact__link" role="button" href="##">
                    {member.email}
                  </a>
                </div>
              </div>
              {member.user && <div className="assign__tag"></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembersTab;
