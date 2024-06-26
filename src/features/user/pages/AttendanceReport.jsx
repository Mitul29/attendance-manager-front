import _ from "lodash";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

import { selectCurrentUser } from "../../../redux/modules/authSlice";
import { useGetAllAttendance } from "../../admin/services/attendance.services";
import useDebounce from "../../../core/hooks/useDebounce";
import AttendanceReportItem from "../components/AttendanceReportItem";
import Header from "../../../core/components/Header";
import Loader from "../../../core/components/Loader/Loader";
import NoRecord from "../../admin/component/NoRecord";

const TODAY_DATE = format(new Date(), "yyyy-MM-dd");

const AttendanceReport = () => {
  const params = useParams();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const leaderId = params.leaderId || currentUser._id;

  const [search, setSearch] = useState("");
  const debouncedSearchVal = useDebounce(search);

  const [currentFilters, setCurrentFilters] = useState({
    dateFrom: TODAY_DATE,
    dateTo: TODAY_DATE,
    search: debouncedSearchVal,
  });

  useEffect(() => {
    const newFilters = { ...currentFilters, search: debouncedSearchVal };
    setCurrentFilters(newFilters);
    loadAttendance(newFilters);
  }, [debouncedSearchVal]);

  const [allMembers, setAllMembers] = useState([]);

  const filterdDates = useMemo(() => {
    const allDates = allMembers.reduce((prev, curr) => {
      curr.attendance.forEach((at) => {
        const date = new Date(at.date).getTime();
        if (!prev.includes(date)) {
          prev = [...prev, date].sort((a, b) => b - a);
        }
      });
      return prev;
    }, []);
    return allDates.map((d) => new Date(d));
  }, [allMembers]);

  const { getAllAttendance, isLoading } = useGetAllAttendance();

  useEffect(() => {
    if (search) {
      /* Note: resetSearch() Auto load latest members attendance
         due to useEffect depandancy
         so no need to call below code
         
         const filters = { ...currentFilters, search: "" };
         loadAttendance(filters);
      */
      return resetSearch();
    }
    loadAttendance();
  }, [leaderId]);

  async function loadAttendance(filters = currentFilters) {
    const data = { ...filters, leaderId };
    const { data: members, error } = await getAllAttendance(data);

    if (!error && _.isArray(members)) {
      setAllMembers(members);
    }
  }

  const resetSearch = () => {
    setSearch("");
    setCurrentFilters({ ...currentFilters, search: "" });
  };

  const applyFilters = () => loadAttendance();

  return (
    <div className="report__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="back-img"
      />
      <div className="report__page__details__wrapper">
        {params.leaderId && (
          <button className="back__btn flex mb-2" onClick={() => navigate(-1)}>
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            Back
          </button>
        )}
        <div className="report__page__filter">
          <div className="search__wrapper">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {!search && (
              <button type="button" className="submit__btn">
                <FontAwesomeIcon
                  icon={faSearch}
                  color="#A47046"
                  fill="#A47046"
                />
              </button>
            )}
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
              min={format(new Date(currentFilters.dateFrom), "yyyy-MM-dd")}
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
          {isLoading ? (
            <Loader />
          ) : !allMembers.length ? (
            <NoRecord />
          ) : (
            allMembers.map((member) => (
              <AttendanceReportItem
                key={member._id}
                member={member}
                filterdDates={filterdDates}
              />
            ))
          )}
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AttendanceReport;
