import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useDebounce from "../../../../core/hooks/useDebounce";
import MembersTab from "../../component/MembersTab";
import Header from "../../../../core/components/Header";
import Button from "../../../../core/components/Button";

const Members = () => {
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState("");

  const debouncedSearchVal = useDebounce(searchVal);

  return (
    <div className="view__member__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="background"
      />
      <div className="view__member__wrapper">
        <div className="flex justify-end pb-2">
          <Button
            className="btn-primary"
            onClick={() => navigate("/admin/members/add")}
          >
            + Add Member
          </Button>
        </div>
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
          <MembersTab debouncedSearchVal={debouncedSearchVal} />
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default Members;
