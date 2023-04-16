import React, { useEffect, useState } from "react";
import Modal from "../../../core/components/Modal";
import useDebounce from "../../../core/hooks/useDebounce";

const SubMembersModal = ({ leader, leaderId, setLeaderId }) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchVal = useDebounce(searchVal);

  const assignedMembers = leader.assignedMembers;

  const modalTitle = `${leader.name.split(" ")[0]}'s Members`;
  const [filterdMembers, setFilteredMembers] = useState(assignedMembers);

  /* Search Client Side */
  useEffect(() => {
    const filterdMembers = assignedMembers.filter((member) => {
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
    <Modal
      isOpen={leaderId}
      title={modalTitle}
      onClickCancel={() => setLeaderId(null)}
      hasFooter={false}
    >
      <form className="search__wrapper">
        <input
          type="search"
          placeholder="Search members"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button type="button" className="submit__btn">
          <svg
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 500 500"
            style={{ enableBackground: "new 0 0 500 500" }}
          >
            <path
              style={{ fill: "#A47046" }}
              d="M456,495c-8.4-2.6-14.2-8.5-20.1-14.6c-35.6-37.2-71.3-74.2-107-111.3c-1.2-1.3-2.3-2.7-3.5-4.1
								c-53.3,35.3-110.4,45.1-171.3,27c-45.1-13.4-81-40.5-107-79.7C-9.2,227.5,7.2,116.3,85.6,51.1c74.6-62,179.9-60.7,252.7,0.6
								c41.4,34.9,65.3,79.7,70,133.9c4.7,54.1-11.1,102.2-45.4,144.5c2.3,2.4,4.5,4.7,6.7,7c36,37.4,72,74.9,108,112.3
								c11.2,11.7,12.2,27.1,1.5,37.5c-3.7,3.6-9.1,5.4-13.8,8.1C462.3,495,459.1,495,456,495z M211.7,57C131.3,57,65.8,122.4,65.6,202.9
								c-0.2,80.4,66.1,146.7,146.2,146.2c80.8-0.5,145.9-65.7,145.8-146.1C357.6,122.5,292.1,57.1,211.7,57z"
            ></path>
          </svg>
        </button>
      </form>
      <div className="user__card__wrapper">
        {filterdMembers.map((member) => {
          return (
            <div className="user__card__box" key={member._id}>
              <div className="inner__wrapper">
                <div className="img__wrapper">
                  <img src="/images/user__img.png" alt="" />
                </div>
                <div className="contact__wrapper__sn">
                  <h4 className="name">{member.name}</h4>
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
                    <span className="contact__link">{member.email}</span>
                  </div>
                  {member.role === "leader" && member.assignTo && (
                    <div className="assign__tag__text">SubLeader</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SubMembersModal;
