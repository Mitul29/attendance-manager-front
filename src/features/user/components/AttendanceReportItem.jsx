import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceReportItem = ({
  member,
  filterdDates,
  disableChildReport = false,
}) => {
  const navigate = useNavigate();

  const attendances = member.attendance || [];
  const totalPresent = attendances.filter((att) => att.present).length;

  const [isOpen, setIsOpen] = useState(false);

  const allAttendance = filterdDates.map((date) => {
    const isExist = attendances.find((at) => {
      return new Date(at.date).getTime() === new Date(date).getTime();
    });

    return {
      present: isExist ? isExist.present : false,
      remark: isExist?.remark ? isExist.remark : "-",
      date: format(new Date(date), "dd-MM-yyyy"),
    };
  });

  return (
    <div className="report__box">
      <div
        className="report__header"
        onClick={() => {
          if (allAttendance.length) {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <h4 className="name">
          {member.name} {member.role === "leader" && "(Lead)"}
        </h4>
        <div className="flex mt-1">
          <p className="text mr-5">Total Sabha: {allAttendance.length}</p>
          <p className="text">
            Present/Absent: {totalPresent}/{allAttendance.length - totalPresent}
          </p>
        </div>
        <div className="name mt-2">
          {!disableChildReport && member.role === "leader" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/report/${member._id}`);
              }}
            >
              View Child Report
            </button>
          )}
        </div>
        {/* <p className="text">
          Attendance {totalPresent}/{allAttendance.length}
        </p> */}
      </div>
      {isOpen && (
        <div className="report__body">
          <div className="report__table__wrapper">
            <table className="report__tabel">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attendance</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {allAttendance.map((att, idx) => (
                  <tr key={idx}>
                    <td>{att.date}</td>
                    <td>
                      {att.present ? (
                        <span className="present">Present</span>
                      ) : (
                        <span className="absent">Absent</span>
                      )}
                    </td>
                    <td>
                      <span>{att.remark}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReportItem;
