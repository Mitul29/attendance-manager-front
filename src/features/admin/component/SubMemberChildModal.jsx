import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../core/components/Modal";
import useDebounce from "../../../core/hooks/useDebounce";
import { getProfileImgLetters } from "../../../helper/commonHelper";
import { useGetLeaderWithMembers } from "../services/users.services";

const SubMemberChildModal = ({ leaderId, setLeaderId }) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchVal = useDebounce(searchVal);

  const [leader, setLeader] = useState(null);
  const assignedMembers = leader?.assignedMembers || [];
  const [filterdMembers, setFilteredMembers] = useState(assignedMembers);

  const { getLeader, isLoading } = useGetLeaderWithMembers();

  const modalTitle = `${leader?.name.split(" ")[0]}'s Members`;

  useEffect(() => {
    loadLeaderWithMembers();
  }, [leaderId]);

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

  async function loadLeaderWithMembers() {
    const { data, error } = await getLeader(leaderId);

    if (!error && data) {
      setLeader(data);
    }
  }

  return (
    <Modal
      isOpen={leaderId}
      title={modalTitle}
      onClickCancel={() => setLeaderId(null)}
      hasFooter={false}
    >
      <div className="search__wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        {!searchVal && (
          <button type="button" className="submit__btn">
            <FontAwesomeIcon icon={faSearch} color="#A47046" fill="#A47046" />
          </button>
        )}
      </div>
      <div className="user__card__wrapper">
        {filterdMembers.map((member) => {
          return (
            <div className="user__card__box" key={member._id}>
              <div className="inner__wrapper">
                <div className="img__wrapper">
                  <div className="no__img__letter">
                    {getProfileImgLetters(member.name)}
                  </div>
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
                  <div className="contact__wrapper email">
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

export default SubMemberChildModal;
