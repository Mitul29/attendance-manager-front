import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import {
  useGetLeaderWithMembers,
  useRemoveLeader,
} from "../../services/users.services";
import Header from "../../../../core/components/Header";
import useDebounce from "../../../../core/hooks/useDebounce";
import useToast from "../../../../core/hooks/useToast";
import { getProfileImgLetters } from "../../../../helper/commonHelper";
import ChangePassModal from "../../component/ChangePassModal";
import SubMembersModal from "../../component/SubMembersModal";
import Modal from "../../../../core/components/Modal";
import Loader from "../../../../core/components/Loader/Loader";
import NoRecord from "../../component/NoRecord";

const LeadersChild = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leader, setLeader] = useState(null);

  const [searchVal, setSearchVal] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [filterdLeaders, setFilteredLeaders] = useState([]);

  const [changePassId, setChangePassId] = useState(null);
  const [leaderId, setLeaderId] = useState(null);
  const [currentDeleteLead, setCurrentDeleteLead] = useState(null);

  const debouncedSearchVal = useDebounce(searchVal);

  const modalTitle = leader ? `${leader.name.split(" ")[0]}'s Members` : "";

  const { setToastMessage } = useToast();
  const { getLeader, isLoading } = useGetLeaderWithMembers();
  const { removeLeader, isLoading: removeLeadLoader } = useRemoveLeader();

  useEffect(() => {
    loadLeaderWithMembers();
  }, [id]);

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

    setFilteredLeaders(sortLeaderFirst(filterdLeaders));
  }, [debouncedSearchVal]);

  const sortLeaderFirst = (members = []) => {
    const childMembers = [...members];
    childMembers.sort((a, b) => {
      if (a.role !== "leader" && b.role === "leader") {
        return 1;
      }
      if (a.role === "leader" && b.role !== "leader") {
        return -1;
      }
      return 0;
    });
    return childMembers;
  };

  async function loadLeaderWithMembers() {
    const { data, error } = await getLeader(id);

    if (!error && data) {
      if (Array.isArray(data.assignedMembers)) {
        setLeader(data);
        const assignedMembers = sortLeaderFirst(data.assignedMembers);
        setLeaders(assignedMembers);
        setFilteredLeaders(assignedMembers);
      }
    }
  }

  const removeFromLeader = async (leaderId) => {
    const { error } = await removeLeader(leaderId);

    if (error) {
      setCurrentDeleteLead(null);
      return setToastMessage({ message: error, type: "error" });
    }

    setCurrentDeleteLead(null);
    setToastMessage({ message: "Removed Successfully.", type: "success" });
    loadLeaderWithMembers();
  };

  return (
    <div className="view__member__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="view__member__wrapper">
        <button className="back__btn flex" onClick={() => navigate(-1)}>
          <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
          Back
        </button>
        {leader && (
          <div className="view__member__main__title p-2">
            <span className="name">{`${leader.name.split(" ")[0]}'s `}</span>
            Members
          </div>
        )}
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

        <div className="contant__wrapper">
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

                          <>
                            {leader.role === "leader" && (
                              <>
                                <p className="attendance__no">
                                  <span className="label">Username:</span>
                                  <span className="value">
                                    {leader.username}
                                  </span>
                                </p>
                                <p className="attendance__no">
                                  <span className="label">Password:</span>
                                  <span className="value">****** </span>
                                  <button
                                    className="edit__btn"
                                    type="button"
                                    onClick={() => setChangePassId(leader._id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="ml-2"
                                    />
                                  </button>
                                </p>
                              </>
                            )}
                          </>
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
                            <span className="contact__link">
                              {leader.email}
                            </span>
                          </div>

                          {leader.role === "leader" && (
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
                                    navigate(
                                      `/admin/leaders/${leader._id}/child`
                                    )
                                  }
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </div>
                            </div>
                          )}

                          {leader.role === "leader" && (
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
                          )}
                        </div>
                        {leader.role === "leader" && (
                          <div className="assign__tag__text">SubLeader</div>
                        )}
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
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default LeadersChild;
