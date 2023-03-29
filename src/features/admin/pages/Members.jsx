import classNames from "classnames";
import React, { useState } from "react";
import useDebounce from "../../../core/hooks/useDebounce";
import MembersTab from "../component/MembersTab";
import UsersTab from "../component/UsersTab";

const Members = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [searchVal, setSearchVal] = useState("");

  const debouncedSearchVal = useDebounce(searchVal);

  return (
    <div className="view__member__page">
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="view__member__wrapper">
        <div
          className={classNames("tabs__wrapper", {
            members__active: activeTab === "members",
          })}
        >
          <button
            className={classNames("tab__btn user__btn", {
              active: activeTab === "users",
            })}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={classNames("tab__btn member__btn", {
              active: activeTab === "members",
            })}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </div>
        <div className="contant__wrapper">
          <div className="form__group">
            <label className="label">Search</label>
            <input
              type="text"
              placeholder="Search..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>

          <UsersTab
            activeTab={activeTab}
            debouncedSearchVal={debouncedSearchVal}
          />

          <MembersTab
            activeTab={activeTab}
            debouncedSearchVal={debouncedSearchVal}
          />
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );

  //   return (
  //     <div>
  //       <div>
  //         <label>Search</label>
  //         <input
  //           type="text"
  //           value={searchVal}
  //           onChange={(e) => setSearchVal(e.target.value)}
  //         />
  //       </div>
  //       {filterdMembers.map((member) => (
  //         <div key={member.id}>
  //           <div>#{member.attendance_no}</div>
  //           <div>
  //             Role: {member.role ? "User" : "Member"}
  //             {member.user && (
  //               <button onClick={() => loadAssignedUser(member.user.id)}>
  //                 View Members
  //               </button>
  //             )}
  //           </div>
  //           <div>
  //             <span>{memberFullName(member)}</span>
  //           </div>
  //           {member.contact && <div>Mobile NO: {member.contact}</div>}
  //           {member.email && <div>Email: {member.email}</div>}
  //         </div>
  //       ))}
  //     </div>
  //   );
};

export default Members;
