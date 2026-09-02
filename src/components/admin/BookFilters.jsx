import { Search, Plus } from "lucide-react";

function BookFilters({
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onAddBook
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="relative flex-1 min-w-0">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books by title, author, or ISBN..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm
            text-gray-700 placeholder-gray-400 outline-none
            focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100
            transition-colors"
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 text-sm text-gray-700
          outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100
          transition-colors w-full md:w-44"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onAddBook}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] text-white text-sm
          font-medium px-4 py-2 hover:bg-blue-700 active:bg-blue-800 transition-colors shrink-0"
      >
        <Plus size={16} />
        Add Book
      </button>
    </div>
  );
}

export default BookFilters;
