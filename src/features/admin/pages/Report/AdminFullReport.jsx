import _ from "lodash";
import { format } from "date-fns";

import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";

import useDebounce from "../../../../core/hooks/useDebounce";
import { useGetAllAttendance } from "../../services/attendance.services";

import AttendanceReportItem from "../../../user/components/AttendanceReportItem";
import Header from "../../../../core/components/Header";
import Loader from "../../../../core/components/Loader/Loader";
import NoRecord from "../../component/NoRecord";
import useDownloadExcel from "../../hooks/useDownloadExcel";
import Button from "../../../../core/components/Button";

const TODAY_DATE = format(new Date(), "yyyy-MM-dd");

const AdminFullReport = () => {
  const [search, setSearch] = useState("");
  const debouncedSearchVal = useDebounce(search);
  const { downloadFullReport } = useDownloadExcel();

  const [currentFilters, setCurrentFilters] = useState({
    dateFrom: TODAY_DATE,
    dateTo: TODAY_DATE,
    search: debouncedSearchVal,
  });

  useEffect(() => {
    const newFilters = { ...currentFilters, search: debouncedSearchVal };
    setCurrentFilters(newFilters);
    loadFullAttendance(newFilters);
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
    loadFullAttendance();
  }, []);

  async function loadFullAttendance(filters = currentFilters) {
    const data = { ...filters };
    const { data: members, error } = await getAllAttendance(data);

    if (!error && _.isArray(members)) {
      setAllMembers(members);
    }
  }

  const applyFilters = () => loadFullAttendance();

  const downloadReport = () => downloadFullReport(allMembers);

  return (
    <div className="report__page">
      <Header />
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="back-img"
      />
      <div className="report__page__details__wrapper">
        <div className="flex pb-2">
          <Button
            className="btn-primary"
            icon={<FontAwesomeIcon icon={faDownload} />}
            onClick={downloadReport}
          >
            Download Report
          </Button>
        </div>
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
                disableChildReport
              />
            ))
          )}
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AdminFullReport;
