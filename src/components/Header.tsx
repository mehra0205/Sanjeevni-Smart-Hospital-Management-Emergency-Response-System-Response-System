
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sanjeevni Healthcare</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">About Us</Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Services</Link>
            <Link to="/emergency" className="text-gray-700 hover:text-indigo-600 transition-colors">Emergency</Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="hidden md:inline-flex">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
