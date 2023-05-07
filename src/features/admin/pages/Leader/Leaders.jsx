import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useDebounce from "../../../../core/hooks/useDebounce";
import LeadersTab from "../../component/LeadersTab";
import Header from "../../../../core/components/Header";

const Leaders = () => {
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
          <LeadersTab debouncedSearchVal={debouncedSearchVal} />
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default Leaders;
