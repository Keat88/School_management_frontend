import { BookOpen, Library, BookMarked, Hand } from "lucide-react";

const accentStyles = {
  blue: "bg-blue-50 text-[#2563EB]",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600"
};

function StatTile({ label, value, icon: Icon, accent }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-center gap-4">
      <div
        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${accentStyles[accent]}`}
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function BookStats({ books = [] }) {
  const totalCopies = books.reduce((sum, book) => sum + book.copies, 0);
  const availableCopies = books.reduce(
    (sum, book) => sum + book.available,
    0,
  );
  const checkedOut = totalCopies - availableCopies;

  const stats = [
    { label: "Total Titles", value: books.length, icon: Library, accent: "blue" },
    { label: "Total Copies", value: totalCopies, icon: BookOpen, accent: "green" },
    { label: "Available", value: availableCopies, icon: BookMarked, accent: "purple" },
    { label: "Checked Out", value: checkedOut, icon: Hand, accent: "amber" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </div>
  );
}

export default BookStats;
