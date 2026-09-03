import { useEffect, useState } from "react";
import TeacherFilters from "../../../components/admin/Teacherfilters";
import TeacherTable from "../teacher/Teachertable";
import { teacherApi } from "../../../data/TeacherApi";
import { useNavigate } from "react-router-dom";

function TeacherList() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const fetchTeacher = async () => {
    try {
      const response = await teacherApi.getAll();
      // Safely extract the array whether it's response.data.data, response.data, or response
      const result = response.data?.data || response.data || response;
      setTeachers(Array.isArray(result) ? result : []);
    } catch (error) {
      console.log("error", error);
      setTeachers([]);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, []);
  const handleEdit = async (id) => {
    navigate(`/teacher/add/${id}`);
  };
  const handleDelete = async (id) => {
    alert(confirm("Do you want to delete this teacher ?"));
    await teacherApi.delete(id);
    fetchTeacher();
  };
  console.log(teachers);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Teachers</h2>
        <span className="text-sm text-gray-500"></span>
      </div>
      <TeacherFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <TeacherTable
        teachers={teachers}
        onDeleteId={handleDelete}
        onEditId={handleEdit}
      />
    </div>
  );
}

export default TeacherList;
