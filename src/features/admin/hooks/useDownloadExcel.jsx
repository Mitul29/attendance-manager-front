import * as XLSX from "xlsx";

const useDownloadExcel = () => {
  const downloadFullReport = (allMembers) => {
    const filterdDates = allMembers
      .reduce((prev, curr) => {
        curr.attendance.forEach((at) => {
          const date = new Date(at.date).getTime();
          if (!prev.includes(date)) {
            prev = [...prev, date].sort((a, b) => b - a);
          }
        });
        return prev;
      }, [])
      .map((d) => new Date(d));

    const sheetData = allMembers.map((m) => {
      const presentDates = filterdDates.filter((f) => {
        return m.attendance.find(
          (at) => new Date(at.date).getTime() === new Date(f).getTime()
        )?.present;
      });

      const TotalSabha = filterdDates.length;
      const Present = presentDates.length;
      const Absent = TotalSabha - Present;

      return {
        Name: m.name,
        AttNo: m.attendanceNo,
        MobileNo: m.contact,
        TotalSabha,
        Present,
        Absent,
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Full Report");

    const filename = `Report_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, filename, { bookType: "xlsx" });
  };

  return { downloadFullReport };
};

export default useDownloadExcel;
