import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import notices from "../../../data/notices";
import NoticeStats from "../../../components/admin/NoticeStats";
import NoticeFilters from "../../../components/admin/NoticeFilters";
import NoticeList from "../../../components/admin/NoticeList";

function NoticePage() {
  const { currentUser } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");

  const filteredNotices = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(query) ||
        notice.content.toLowerCase().includes(query);
      const matchesAudience =
        audienceFilter === "all" || notice.audience === audienceFilter;
      return matchesSearch && matchesAudience;
    });
  }, [searchValue, audienceFilter]);

  const handleCreateNotice = () => {
    // Hook this up to a modal / form / route once the create-notice flow exists.
    console.log("Create Notice clicked");
  };

  const handleEdit = (notice) => {
    console.log("Edit notice", notice.id);
  };

  const handleDelete = (notice) => {
    console.log("Delete notice", notice.id);
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Notice Management
      </h1>

      <NoticeFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        audienceFilter={audienceFilter}
        onAudienceChange={setAudienceFilter}
        onCreateNotice={handleCreateNotice}
      />

      <NoticeStats notices={notices} />

      <NoticeList
        notices={filteredNotices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default NoticePage;
