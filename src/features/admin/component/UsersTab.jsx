import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useGetUsers } from "../services/users.services";
import ChangePassModal from "./ChangePassModal";

const UsersTab = ({ activeTab, debouncedSearchVal }) => {
  const [users, setUsers] = useState([]);
  const [filterdUsers, setFilteredUsers] = useState([]);
  const [changePassId, setChangePassId] = useState(null);

  const { getUsers } = useGetUsers();

  const userFullName = (user) => {
    return `${user.firstname || ""} ${user.middlename || ""} ${
      user.lastname || ""
    }`;
  };

  const loadUsers = useCallback(async ({ search = "" } = {}) => {
    const filter = { ...(search && { search }) };

    const { data, error } = await getUsers(filter);
    if (!error && data && Array.isArray(data)) {
      const updatedUsers = data.map((u) => ({
        user_id: u.id,
        username: u.username,
        ...u.userDetails,
      }));

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  /* Search Client Side */
  useEffect(() => {
    const filterdUsers = users.filter((user) => {
      const nameFilter = userFullName(user)
        .toLowerCase()
        .includes(debouncedSearchVal.toLowerCase());

      const attFilter = (`${user.attendance_no || ""}` || "").includes(
        debouncedSearchVal
      );
      const contactFilter = (user.contact || "").includes(debouncedSearchVal);
      const emailFilter = (user.email || "").includes(debouncedSearchVal);

      return nameFilter || attFilter || contactFilter || emailFilter;
    });
    setFilteredUsers(filterdUsers);
  }, [debouncedSearchVal]);

  return (
    <>
      <div
        className={classNames("user__card__wrapper", {
          hidden: activeTab !== "users",
        })}
      >
        {filterdUsers.map((user) => {
          return (
            <div key={user.id} className="user__card__box">
              <div className="inner__wrapper">
                <div className="img__wrapper">
                  <img src="/images/user__img.png" alt="" />
                </div>
                <div className="contact__wrapper__sn">
                  <h4 className="name">{userFullName(user)}</h4>
                  <h5 className="name">username: {user.username}</h5>
                  <button onClick={() => setChangePassId(user.user_id)}>
                    Change Password
                  </button>
                  <p className="attendance__no">
                    <span className="label">Attendance No:</span>
                    <span className="value">{user.attendance_no || "-"}</span>
                  </p>
                  <div className="contact__wrapper phone">
                    <a className="contact__link" href="##">
                      {user.contact || "-"}
                    </a>
                  </div>
                  <div className="contact__wrapper phone">
                    <a className="contact__link" role="button" href="##">
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="assign__tag"></div>
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
    </>
  );
};

export default UsersTab;
