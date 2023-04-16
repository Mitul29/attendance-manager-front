import { format, startOfDay } from "date-fns";
import React, { useMemo, useState } from "react";

const AttendanceReportItem = ({ member, allMembers }) => {
  const attendances = member.attendance || [];
  const totalPresent = attendances.filter((att) => att.present).length;

  const [isOpen, setIsOpen] = useState(false);

  const filterdDates = useMemo(() => {
    const allDates = allMembers.reduce((prev, curr) => {
      curr.attendance.forEach((at) => {
        const date = startOfDay(new Date(at.date)).getTime();
        if (!prev.includes(date)) {
          prev = [...prev, date].sort((a, b) => b - a);
        }
      });
      return prev;
    }, []);
    return allDates.map((d) => new Date(d));
  }, [allMembers]);

  const allAttendance = filterdDates.map((date) => {
    const isExist = attendances.find((at) => {
      return (
        startOfDay(new Date(at.date)).getTime() === new Date(date).getTime()
      );
    });

    return {
      present: isExist ? isExist.date : false,
      remark: isExist?.remark ? isExist.remark : "-",
      date: format(new Date(date), "dd-MM-yyyy"),
    };
  });

  return (
    <div className="report__box">
      <div
        className="report__header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h4 className="name">{member.name}</h4>
        <p className="text">
          Attendance {totalPresent}/{allAttendance.length}
        </p>
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
