import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import StudentFilters from "../../../components/admin/Studentfilters";
import StudentTable from "../../../components/admin/Studenttable";
import mockStudents from "../../../data/Students";

function StudentList() {
  const { currentUser } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  const classOptions = useMemo(
    () => [...new Set(mockStudents.map((s) => s.class))].sort(),
    [],
  );

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
      const matchesClass =
        classFilter === "all" || student.class === classFilter;
      const matchesGender =
        genderFilter === "all" || student.gender === genderFilter;
      return matchesSearch && matchesClass && matchesGender;
    });
  }, [searchValue, classFilter, genderFilter]);

  const handleAddStudent = () => {
    // Hook this up to a modal / form / route once the add-student flow exists.
    console.log("Add Student clicked");
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
        <span className="text-sm text-gray-500">
          {filteredStudents.length} of {mockStudents.length} students
        </span>
      </div>

      <StudentFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        classFilter={classFilter}
        onClassChange={setClassFilter}
        genderFilter={genderFilter}
        onGenderChange={setGenderFilter}
        classOptions={classOptions}
        onAddStudent={handleAddStudent}
      />

      <StudentTable students={filteredStudents} />
    </div>
  );
}

export default StudentList;
