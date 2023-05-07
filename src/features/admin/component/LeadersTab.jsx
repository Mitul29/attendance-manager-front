import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../core/components/Modal";
import ChangePassModal from "./ChangePassModal";
import SubMembersModal from "./SubMembersModal";
import {
  useGetLeadersWithMembers,
  useRemoveLeader,
} from "../services/users.services";
import useToast from "../../../core/hooks/useToast";

import { getProfileImgLetters } from "../../../helper/commonHelper";
import Loader from "../../../core/components/Loader/Loader";
import NoRecord from "./NoRecord";

const LeadersTab = ({ debouncedSearchVal }) => {
  const navigate = useNavigate();

  const [leaders, setLeaders] = useState([]);
  const [filterdLeaders, setFilteredLeaders] = useState([]);

  const [changePassId, setChangePassId] = useState(null);
  const [leaderId, setLeaderId] = useState(null);
  const [currentDeleteLead, setCurrentDeleteLead] = useState(null);

  const { setToastMessage } = useToast();
  const { getLeaders, isLoading } = useGetLeadersWithMembers();

  const { removeLeader, isLoading: removeLeadLoader } = useRemoveLeader();

  const loadLeaders = useCallback(async ({ search = "" } = {}) => {
    const filter = { ...(search && { search }) };

    const { data, error } = await getLeaders(filter);
    if (!error && data && Array.isArray(data)) {
      const mainLeaders = data.filter((d) => d.assignTo === null);

      setLeaders(mainLeaders);
      setFilteredLeaders(mainLeaders);
    }
  }, []);

  const removeFromLeader = async (leaderId) => {
    const { error } = await removeLeader(leaderId);

    if (error) {
      setCurrentDeleteLead(null);
      return setToastMessage({ message: error, type: "error" });
    }

    setCurrentDeleteLead(null);
    setToastMessage({ message: "Removed Successfully.", type: "success" });
    loadLeaders();
  };

  useEffect(() => {
    loadLeaders();
  }, []);

  /* Search Client Side */
  useEffect(() => {
    const filterdLeaders = leaders.filter((leader) => {
      const nameFilter = leader.name
        .toLowerCase()
        .includes(debouncedSearchVal.toLowerCase());

      const attFilter = (`${leader.attendanceNo || ""}` || "").includes(
        debouncedSearchVal
      );
      const contactFilter = (leader.contact || "").includes(debouncedSearchVal);
      const emailFilter = (leader.email || "").includes(debouncedSearchVal);

      return nameFilter || attFilter || contactFilter || emailFilter;
    });
    setFilteredLeaders(filterdLeaders);
  }, [debouncedSearchVal]);

  return (
    <>
      <div className={classNames("user__card__wrapper")}>
        {isLoading ? (
          <Loader />
        ) : !filterdLeaders.length ? (
          <NoRecord />
        ) : (
          filterdLeaders.map((leader) => {
            return (
              <div
                key={leader._id}
                className="user__card__box user__card__box__new"
              >
                <div className="inner__wrapper">
                  <div className="img__wrapper">
                    <div className="no__img__letter">
                      {getProfileImgLetters(leader.name)}
                    </div>
                  </div>
                  <div className="contact__wrapper__sn">
                    <h4 className="name">
                      <span className="name__text">{leader.name}</span>
                      <button
                        className="edit__btn"
                        type="button"
                        onClick={() =>
                          navigate(`/admin/members/${leader._id}`, {
                            state: { from: "leaders" },
                          })
                        }
                      >
                        <img src="/images/edit__icon.png" alt="" />
                      </button>
                    </h4>

                    <p className="attendance__no">
                      <span className="label">Username:</span>
                      <span className="value">{leader.username}</span>
                    </p>
                    <p className="attendance__no">
                      <span className="label">Password:</span>
                      <span className="value">****** </span>
                      <button
                        className="edit__btn"
                        type="button"
                        onClick={() => setChangePassId(leader._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="ml-2" />
                      </button>
                    </p>
                    <p className="attendance__no">
                      <span className="label">Attendance No:</span>
                      <span className="value">
                        {leader.attendanceNo || "-"}
                      </span>
                    </p>
                    <div className="contact__wrapper phone">
                      <span className="contact__link">
                        {leader.contact || "-"}
                      </span>
                    </div>
                    <div className="contact__wrapper email">
                      <span className="contact__link">{leader.email}</span>
                    </div>
                    <div className="sub__member">
                      <div className="inner__sub__member">
                        <span className="label">SubMembers: </span>
                        <span className="value">
                          {leader.assignedMembers.length}
                        </span>
                        <button
                          className="view__member__btn"
                          type="button"
                          onClick={() =>
                            navigate(`/admin/leaders/${leader._id}/child`)
                          }
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </div>

                    <button
                      className={`make__as__user__btn`}
                      type="button"
                      onClick={() => navigate(`/report/${leader._id}`)}
                    >
                      View Report
                    </button>
                    <button
                      className={`make__as__user__btn ${
                        !leader.assignTo ? "opacity-0" : ""
                      }`}
                      type="button"
                      disabled={removeLeadLoader}
                      onClick={() => {
                        if (leader.assignTo) {
                          setCurrentDeleteLead(leader);
                        }
                      }}
                    >
                      Remove leader
                    </button>
                  </div>
                  <div className="assign__tag__text">
                    {leader.assignTo ? "SubLeader" : "Leader"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {changePassId && (
        <ChangePassModal
          key={changePassId}
          changePassId={changePassId}
          setChangePassId={setChangePassId}
        />
      )}

      {leaderId && (
        <SubMembersModal
          key={leaderId}
          leader={leaders.find((l) => l._id === leaderId)}
          leaderId={leaderId}
          setLeaderId={setLeaderId}
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
    </>
  );
};

export default LeadersTab;
