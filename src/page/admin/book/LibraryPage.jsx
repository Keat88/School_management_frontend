import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { categories, mockBooks } from "../../../data/books";
import BookStats from "../../../components/admin/BookStats";
import BookFilters from "../../../components/admin/BookFilters";
import BookTable from "../../../components/admin/BookTable";

function LibraryPage() {
  const { currentUser } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredBooks = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return mockBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query);
      const matchesCategory =
        categoryFilter === "all" || book.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchValue, categoryFilter]);

  const handleAddBook = () => {
    // Hook this up to a modal / form / route once the add-book flow exists.
    console.log("Add Book clicked");
  };

  const handleEdit = (book) => {
    console.log("Edit book", book.id);
  };

  const handleDelete = (book) => {
    console.log("Delete book", book.id);
  };

  // Admin-only guard. For multiple admin-only pages, consider lifting
  // this into a shared <ProtectedRoute allowedRoles={["admin"]} />.
  if (currentUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Library Collection
      </h1>

      <BookFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        onAddBook={handleAddBook}
      />

      <BookStats books={mockBooks} />

      <BookTable
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default LibraryPage;
