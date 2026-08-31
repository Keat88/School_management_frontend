import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import TeacherFilters from "../../../components/admin/Teacherfilters";
import TeacherTable from "../teacher/Teachertable";

// Replace with real API data once available.
const mockTeachers = [
  {
    id: 1,
    name: "Sokha Chan",
    code: "T-2001",
    qualification: "M.Ed Mathematics",
    phone: "012 345 678",
    subject: "Mathematics",
  },
  {
    id: 2,
    name: "Reth Vong",
    code: "T-2002",
    qualification: "B.Sc Physics",
    phone: "017 223 981",
    subject: "Physics",
  },
  {
    id: 3,
    name: "Malis Ouk",
    code: "T-2003",
    qualification: "M.A English Literature",
    phone: "010 556 442",
    subject: "English",
  },
  {
    id: 4,
    name: "Dara Pich",
    code: "T-2004",
    qualification: "B.Ed Chemistry",
    phone: "011 789 300",
    subject: "Chemistry",
  },
  {
    id: 5,
    name: "Sreynich Long",
    code: "T-2005",
    qualification: "M.Sc Biology",
    phone: "096 402 118",
    subject: "Biology",
  },
  {
    id: 6,
    name: "Vibol Heng",
    code: "T-2006",
    qualification: "B.A History",
    phone: "015 991 274",
    subject: "History",
  },
];

function TeacherList() {
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const filteredTeachers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return mockTeachers;

    return mockTeachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(query) ||
        teacher.code.toLowerCase().includes(query) ||
        teacher.subject.toLowerCase().includes(query),
    );
  }, [searchValue]);

  const handleAddTeacher = () => {
    // Hook this up to a modal / form / route once the add-teacher flow exists.
    console.log("Add Teacher clicked");
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Teachers</h2>
        <span className="text-sm text-gray-500">
          {filteredTeachers.length} of {mockTeachers.length} teachers
        </span>
      </div>

      <TeacherFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onAddTeacher={handleAddTeacher}
      />

      <TeacherTable teachers={filteredTeachers} />
    </div>
  );
}

export default TeacherList;
