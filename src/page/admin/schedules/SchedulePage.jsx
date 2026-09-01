import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { days, mockSchedules } from "../../../data/schedules";
import ScheduleFilters from "../../../components/admin/ScheduleFilters";
import ScheduleGrid from "../../../components/admin/ScheduleGrid";

function SchedulePage() {
  const { currentUser } = useAuth();

  const [classFilter, setClassFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");

  const classOptions = useMemo(
    () => [...new Set(mockSchedules.map((s) => s.class))].sort(),
    [],
  );

  const filteredSchedules = useMemo(() => {
    return mockSchedules.filter((schedule) => {
      const matchesClass =
        classFilter === "all" || schedule.class === classFilter;
      const matchesDay = dayFilter === "all" || schedule.day === dayFilter;
      return matchesClass && matchesDay;
    });
  }, [classFilter, dayFilter]);

  const classes = useMemo(
    () => [...new Set(filteredSchedules.map((s) => s.class))].sort(),
    [filteredSchedules],
  );

  const schedulesByClass = useMemo(() => {
    const map = {};
    filteredSchedules.forEach((schedule) => {
      if (!map[schedule.class]) map[schedule.class] = {};
      if (!map[schedule.class][schedule.day]) {
        map[schedule.class][schedule.day] = [];
      }
      map[schedule.class][schedule.day].push(schedule);
    });
    return map;
  }, [filteredSchedules]);

  const handleAddSchedule = () => {
    // Hook this up to a modal / form / route once the add-schedule flow exists.
    console.log("Add Schedule clicked");
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Schedule</h2>
        <span className="text-sm text-gray-500">
          {filteredSchedules.length} scheduled periods
        </span>
      </div>

      <ScheduleFilters
        classFilter={classFilter}
        onClassChange={setClassFilter}
        dayFilter={dayFilter}
        onDayChange={setDayFilter}
        classOptions={classOptions}
        dayOptions={days}
        onAddSchedule={handleAddSchedule}
      />

      <ScheduleGrid
        classes={classes}
        schedulesByClass={schedulesByClass}
        emptyMessage="No schedules match your filters."
      />
    </div>
  );
}

export default SchedulePage;
