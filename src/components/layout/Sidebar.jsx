import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import sidebarMenu from "../../data/sideBar";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const visibleMenu = sidebarMenu.filter((menu) =>
    menu.roles.includes(currentUser?.role)
  );

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
        <span className="text-lg font-semibold text-gray-800">EduManage</span>
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-200 flex flex-col
          fixed md:sticky top-0 left-0 h-screen z-50
          w-64 shrink-0
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-800">
            Edu<span className="text-blue-600">Manage</span>
          </span>
          <button
            type="button"
            onClick={closeMobile}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {visibleMenu.map((menu) => {
              const Icon = menu.icon;
              return (
                <li key={menu.path}>
                  <NavLink
                    to={menu.path}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Blue active indicator bar */}
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-600 transition-opacity
                          ${isActive ? "opacity-100" : "opacity-0"}`}
                        />
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          }
                        />
                        <span>{menu.title}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / user info */}
        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold uppercase">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {currentUser?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {currentUser?.role || "guest"}
              </p>
            </div>
            <button
              type="button"
              className="ml-auto p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;