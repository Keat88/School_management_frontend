import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import mockClassrooms from "../../../data/classrooms";
import ClassroomCard from "../../../components/admin/ClassroomCard";

function ClassroomList() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = (classroom) => {
    // Adjust the destination route once a classroom detail page exists.
    navigate(`/classes/${classroom.id}`);
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Classes</h2>
        <span className="text-sm text-gray-500">
          {mockClassrooms.length} classes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockClassrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassroomList;
