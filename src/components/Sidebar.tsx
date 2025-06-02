import { Calendar, Book, User, Settings, Bell, Users, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const menuItems = [
    { icon: User, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Book, label: "Medical Records", path: "/records" },
    { icon: User, label: "Blood Bank", path: "/blood-bank" },
    { icon: Users, label: "Queue Management", path: "/queue" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: AlertTriangle, label: "Emergency", path: "/emergency-tab" },
    { icon: Settings, label: "Settings & Profile", path: "/settings" }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r min-h-screen flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Sanjeevni</span>
        </Link>
      </div>
      
      <nav className="mt-8 flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors",
              location.pathname === item.path && "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600",
              item.path === "/emergency-tab" && "text-red-600 hover:bg-red-50 hover:text-red-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {currentUser ? getInitials(currentUser.name) : 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser ? currentUser.name : 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser ? currentUser.email : 'user@example.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
