import _ from "lodash";
import { format, parse, startOfDay } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/modules/authSlice";
import { useGetAllAttendance } from "../../admin/services/attendance.services";
import useDebounce from "../../../core/hooks/useDebounce";
import AttendanceReportItem from "./AttendanceReportItem";

const TODAY_DATE = format(new Date(), "yyyy-MM-dd");

const AttendanceReport = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [search, setSearch] = useState("");
  const debouncedSearchVal = useDebounce(search);

  const [currentFilters, setCurrentFilters] = useState({
    dateFrom: TODAY_DATE,
    dateTo: TODAY_DATE,
    search: debouncedSearchVal,
  });

  useEffect(() => {
    setCurrentFilters((prev) => ({ ...prev, search: debouncedSearchVal }));
  }, [debouncedSearchVal]);

  const [allMembers, setAllMembers] = useState([]);

  const { getAllAttendance, isLoading } = useGetAllAttendance();

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance(filters = currentFilters) {
    const leaderId = currentUser._id;
    const params = { ...filters, leaderId };
    const { data, error } = await getAllAttendance(params);

    if (!error && _.isArray(data)) {
      setAllMembers(data);
    }
  }

  const applyFilters = () => loadAttendance();

  return (
    <div className="report__page">
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="back-img"
      />
      <div className="report__page__details__wrapper">
        <div className="report__page__filter">
          <div className="search__wrapper">
            <input
              type="search"
              placeholder="Search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="submit__btn">
              <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 500 500"
                style={{ enableBackground: "new 0 0 500 500" }}
              >
                <path
                  style={{ fill: "#A47046" }}
                  d="M456,495c-8.4-2.6-14.2-8.5-20.1-14.6c-35.6-37.2-71.3-74.2-107-111.3c-1.2-1.3-2.3-2.7-3.5-4.1
            c-53.3,35.3-110.4,45.1-171.3,27c-45.1-13.4-81-40.5-107-79.7C-9.2,227.5,7.2,116.3,85.6,51.1c74.6-62,179.9-60.7,252.7,0.6
            c41.4,34.9,65.3,79.7,70,133.9c4.7,54.1-11.1,102.2-45.4,144.5c2.3,2.4,4.5,4.7,6.7,7c36,37.4,72,74.9,108,112.3
            c11.2,11.7,12.2,27.1,1.5,37.5c-3.7,3.6-9.1,5.4-13.8,8.1C462.3,495,459.1,495,456,495z M211.7,57C131.3,57,65.8,122.4,65.6,202.9
            c-0.2,80.4,66.1,146.7,146.2,146.2c80.8-0.5,145.9-65.7,145.8-146.1C357.6,122.5,292.1,57.1,211.7,57z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="date__filter">
            <input
              className="date__input"
              type="date"
              value={currentFilters.dateFrom}
              max={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => {
                setCurrentFilters((prev) => ({
                  ...prev,
                  dateFrom: e.target.value,
                }));
              }}
            />
            <input
              className="date__input"
              type="date"
              value={currentFilters.dateTo}
              max={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => {
                setCurrentFilters((prev) => ({
                  ...prev,
                  dateTo: e.target.value,
                }));
              }}
            />
            <button className="apply__btn" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
        <div className="inner__cn">
          {allMembers.map((member) => (
            <AttendanceReportItem
              key={member._id}
              member={member}
              allMembers={allMembers}
            />
          ))}
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AttendanceReport;
