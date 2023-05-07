import _ from "lodash";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAssignedMembers } from "../../admin/services/users.services";
import { selectCurrentUser } from "../../../redux/modules/authSlice";
import useDebounce from "../../../core/hooks/useDebounce";
import Header from "../../../core/components/Header";
import { getProfileImgLetters } from "../../../helper/commonHelper";
import Loader from "../../../core/components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NoRecord from "../../admin/component/NoRecord";

const AssignedMembers = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [searchVal, setSearchVal] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [filterdMembers, setFilteredMembers] = useState([]);

  const debouncedSearchVal = useDebounce(searchVal);

  const { getAssignedMembers, isLoading } = useGetAssignedMembers();

  useEffect(() => {
    loadAssignedMembers();
  }, []);

  /* Search Client Side */
  useEffect(() => {
    const filterdMembers = allMembers.filter((member) => {
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

  async function loadAssignedMembers() {
    const leaderId = currentUser._id;
    const { data, error } = await getAssignedMembers(leaderId);
    if (!error && _.isArray(data)) {
      setAllMembers(data);
      setFilteredMembers(data);
    }
  }

  return (
    <div className="view__member__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="view__member__wrapper">
        <>
          <h2 className="view__member__main__title">
            Welcome<span className="name">, {currentUser?.name || ""}</span>
          </h2>
          <div className="search__wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {!searchVal && (
              <button type="button" className="submit__btn">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#A47046"
                  fill="#A47046"
                />
              </button>
            )}
          </div>

          <div className="contant__wrapper">
            <div className={classNames("user__card__wrapper")}>
              {isLoading ? (
                <Loader />
              ) : filterdMembers.length ? (
                <>
                  {filterdMembers.map((member) => {
                    return (
                      <div
                        key={member._id}
                        className="user__card__box user__card__box__new"
                      >
                        <div className="inner__wrapper">
                          <div className="img__wrapper">
                            <div className="no__img__letter">
                              {getProfileImgLetters(member.name)}
                            </div>
                          </div>
                          <div className="contact__wrapper__sn">
                            <h4 className="name">
                              <span className="name__text">{member.name}</span>
                            </h4>
                            <p className="attendance__no">
                              <span className="label">Attendance No:</span>
                              <span className="value">
                                {member.attendanceNo || "-"}
                              </span>
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
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <NoRecord />
              )}
            </div>
          </div>
        </>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AssignedMembers;
