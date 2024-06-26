import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useToast from "../../../core/hooks/useToast";
import useDebounce from "../../../core/hooks/useDebounce";
import { useRemoveLeader } from "../services/users.services";
import { getProfileImgLetters } from "../../../helper/commonHelper";

import Modal from "../../../core/components/Modal";
import ChangePassModal from "./ChangePassModal";
import SubMemberChildModal from "./SubMemberChildModal";

const SubMembersModal = ({ leader, leaderId, setLeaderId }) => {
  const [searchVal, setSearchVal] = useState("");
  const debouncedSearchVal = useDebounce(searchVal);

  const [subLeaderId, setSubLeaderId] = useState(null);
  const [changePassId, setChangePassId] = useState(null);
  const [currentDeleteLead, setCurrentDeleteLead] = useState(null);

  const { setToastMessage } = useToast();
  const { removeLeader, isLoading: removeLeadLoader } = useRemoveLeader();

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

  const removeFromLeader = async (leaderId) => {
    const { error } = await removeLeader(leaderId);

    if (error) {
      setCurrentDeleteLead(null);
      return setToastMessage({ message: error, type: "error" });
    }

    setCurrentDeleteLead(null);
    setToastMessage({ message: "Removed Successfully.", type: "success" });
    setLeaderId(null);
  };

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
                  <div className="sub__member">
                    <div className="inner__sub__member">
                      <span className="label">SubMembers: </span>
                      <span className="value">
                        {member?.assignedMembers?.length}
                      </span>
                      <button
                        className="view__member__btn"
                        type="button"
                        onClick={() => setSubLeaderId(member._id)}
                      >
                        <svg
                          version="1.1"
                          id="Layer_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 500 500"
                          style={{ enableBackground: "new 0 0 500 500" }}
                        >
                          <path
                            d="M495,253.1c-2.4,3.9-4.3,8.2-7.1,11.7c-34.5,43.2-74.5,80.3-122.6,108c-31.7,18.2-65.4,30.5-102.2,33c-30,2-59-3-87-13.7
													c-42.3-16.1-78.6-41.5-111.8-71.7c-19.5-17.7-37.3-37-53.5-57.8c-7-8.9-7-15.7,0-24.6c34.7-44.1,75.1-81.8,123.9-110
													c38.3-22.1,79.2-35.4,124.1-33.5c30.8,1.4,59.9,9.7,87.5,23.2c57.9,28.4,104.3,70.7,143.9,120.9c2,2.6,3.2,5.8,4.8,8.7
													C495,249.3,495,251.2,495,253.1z M42,249.9c1.8,2.1,3,3.8,4.4,5.2c14.9,15.3,29.1,31.2,44.9,45.6c30.3,27.7,64.1,50.2,103.4,63.6
													c23.5,8,47.6,11.4,72.4,8.7c31.8-3.5,60.6-15.3,87.7-31.5c35.3-21.1,65.5-48.4,92.8-78.9c3.6-4,7-8.1,10.8-12.6
													c-9.4-10.2-18.2-20.2-27.6-29.7c-31.5-32-66.4-59.4-107.9-77.5c-20.7-9-42.3-14.9-65-16c-34.7-1.6-66.7,8.1-97.1,23.8
													c-34,17.6-63.4,41.3-90.2,68.4C60.9,229,51.7,239.5,42,249.9z"
                          ></path>
                          <path
                            d="M347,250.7c-0.4,53.6-44.1,96.9-97.3,96.3c-53.6-0.6-96.4-43.9-96.1-97.1c0.4-53.7,44.1-96.9,97.3-96.3
													C304.5,154.2,347.4,197.5,347,250.7z M314.7,250.5c0.2-35.4-28.4-64.3-64.2-64.7c-35.4-0.4-64.9,29-64.8,64.6
													c0.1,35.5,28.9,64.4,64.4,64.4C285.7,314.9,314.5,286.1,314.7,250.5z"
                          ></path>
                          <g className="hide__line">
                            <path
                              d="M79.8,399.2L79.8,399.2c-6.1-6.1-6.1-16.1,0-22.2L375.5,81.2c6.1-6.1,16.1-6.1,22.2,0l0,0c6.1,6.1,6.1,16.1,0,22.2
														L102.1,399.2C95.9,405.3,86,405.3,79.8,399.2z"
                            ></path>
                            <path
                              style={{ fill: "#A47046" }}
                              d="M102.1,421.4L102.1,421.4c-6.1-6.1-6.1-16.1,0-22.2l295.7-295.7c6.1-6.1,16.1-6.1,22.2,0v0
														c6.1,6.1,6.1,16.1,0,22.2L124.3,421.4C118.2,427.5,108.2,427.5,102.1,421.4z"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </div>
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
      {changePassId && (
        <ChangePassModal
          key={changePassId}
          changePassId={changePassId}
          setChangePassId={setChangePassId}
        />
      )}

      {subLeaderId && (
        <SubMemberChildModal
          key={subLeaderId}
          subLeaderId={subLeaderId}
          setSubLeaderId={setSubLeaderId}
        />
      )}

      {/* Remove Leader Alert */}
      <Modal
        isOpen={currentDeleteLead}
        onClickCancel={() => setCurrentDeleteLead(null)}
        onClickSubmit={() => removeFromLeader(currentDeleteLead._id)}
        title="Are You Sure?"
        submitBtnText="Yes"
      >
        Are you sure you want to remove
        <b> {currentDeleteLead?.name || ""} </b>
        from leader?
      </Modal>
    </Modal>
  );
};

export default SubMembersModal;
