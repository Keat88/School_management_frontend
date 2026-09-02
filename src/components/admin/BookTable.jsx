import { Pencil, Trash2 } from "lucide-react";

function BookStatusBadge({ status }) {
  const checkedOut = status === "checked-out";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        checkedOut ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
      }`}
    >
      {checkedOut ? "Checked Out" : "Available"}
    </span>
  );
}

function BookTable({ books = [], onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-240 text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60">
              <th className="px-4 py-3 font-medium text-gray-500">Code</th>
              <th className="px-4 py-3 font-medium text-gray-500">Title</th>
              <th className="px-4 py-3 font-medium text-gray-500">Author</th>
              <th className="px-4 py-3 font-medium text-gray-500">Category</th>
              <th className="px-4 py-3 font-medium text-gray-500">
                Copies (Avail.)
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 font-medium text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No books match your search or filters.
                </td>
              </tr>
            )}

            {books.map((book) => (
              <tr
                key={book.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
              >
                <td className="px-4 py-3 text-gray-500 font-mono whitespace-nowrap">
                  {book.code}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={book.cover}
                      alt={`${book.title} cover`}
                      className="h-14 w-10 object-cover rounded-[3px] border border-gray-200 shrink-0 bg-gray-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        const initial = (book.title || "B").trim().charAt(0);
                        e.currentTarget.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                          `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='56'><rect width='100%' height='100%' fill='#e2e8f0'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' font-weight='bold' fill='#94a3b8'>${initial}</text></svg>`
                        )}`;
                      }}
                    />
                    <div>
                      <div className="font-medium text-gray-800 whitespace-nowrap">
                        {book.title}
                      </div>
                      <div className="text-gray-400 text-xs">{book.isbn}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {book.author}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                    {book.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {book.copies} ({book.available})
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <BookStatusBadge status={book.status} />
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(book)}
                      className="p-2 rounded-lg hover:bg-blue-200 bg-blue-50  hover:text-[#2563EB] text-[#2563EB] transition-colors"
                      aria-label={`Edit ${book.title}`}
                    >
                      {/* <Pencil size={16} /> */}Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(book)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-200 bg-red-50 hover:text-red-500 transition-colors"
                      aria-label={`Delete ${book.title}`}
                    >
                      {/* <Trash2 size={16} /> */}Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookTable;
