import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  CalendarDays,
  BookOpen,
  Megaphone,
  Wallet,
  Building2,
  BedDouble,
  FileBarChart,
  Settings
} from "lucide-react";

const sidebarMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "teacher"]
  },
  {
    title: "Students",
    path: "/students",
    icon: Users,
    roles: ["admin", "teacher"]
  },
  {
    title: "Teachers",
    path: "/teachers",
    icon: GraduationCap,
    roles: ["admin"]
  },
  {
    title: "Classes",
    path: "/classes",
    icon: School,
    roles: ["admin", "teacher"]
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: CalendarDays,
    roles: ["admin", "teacher"]
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: CalendarDays,
    roles: ["admin", "teacher"]
  },
  {
    title: "Library",
    path: "/library",
    icon: BookOpen,
    roles: ["admin"]
  },
  {
    title: "Hostel",
    path: "/hostel",
    icon: BedDouble,
    roles: ["admin"]
  },
  {
    title: "Finance",
    path: "/finance",
    icon: Wallet,
    roles: ["admin"]
  },
  {
    title: "Notices",
    path: "/notices",
    icon: Megaphone,
    roles: ["admin", "teacher"]
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileBarChart,
    roles: ["admin"]
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin"]
  }
];

export default sidebarMenu;