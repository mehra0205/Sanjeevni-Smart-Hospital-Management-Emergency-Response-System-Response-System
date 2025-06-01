
import { Calendar, Book, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: User, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Book, label: "Medical Records", path: "/records" },
    { icon: User, label: "Blood Bank", path: "/blood-bank" },
    { icon: Settings, label: "Settings & Profile", path: "/settings" }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Sanjeevni Healthcare</span>
        </Link>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors",
              location.pathname === item.path && "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">PU</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Patient User</p>
            <p className="text-xs text-gray-500 truncate">patient.user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
