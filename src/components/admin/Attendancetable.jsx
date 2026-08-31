import AttendanceStatusBadge from "./Attendancestatusbadge";

function initials(name = "") {
  return name.charAt(0).toUpperCase();
}

function AttendanceTable({ records = [] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60">
              <th className="px-4 py-3 font-medium text-gray-500">Student</th>
              <th className="px-4 py-3 font-medium text-gray-500">Class</th>
              <th className="px-4 py-3 font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 font-medium text-gray-500">
                Check-in
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No attendance records match your filters.
                </td>
              </tr>
            )}

            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold shrink-0">
                      {initials(record.studentName)}
                    </div>
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {record.studentName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {record.class}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {record.date}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {record.checkInTime || "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <AttendanceStatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;