import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";

import { useGetMembers } from "../services/members.services";

import MemberCard from "./MemberCard";
import NoRecord from "./NoRecord";
import Loader from "../../../core/components/Loader/Loader";

const MembersTab = ({ debouncedSearchVal }) => {
  const [members, setMembers] = useState([]);
  const [filterdMembers, setFilteredMembers] = useState([]);

  const { getMembers, isLoading } = useGetMembers();

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
      <div className={classNames("user__card__wrapper")}>
        {isLoading ? (
          <Loader />
        ) : !filterdMembers.length ? (
          <NoRecord />
        ) : (
          filterdMembers.map((member) => (
            <MemberCard
              key={member._id}
              member={member}
              loadMembers={loadMembers}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MembersTab;
