
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold text-primary">Lovely Home</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/#funding" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Fund
            </Link>
            <Link to="/#schedule" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Sessions
            </Link>
            <Link to="/#talent" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Talent
            </Link>
            <Link to="/#contact" className="font-medium text-gray-600 hover:text-primary transition-colors">
              Contact
            </Link>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white p-4 rounded-lg shadow-lg absolute top-16 left-4 right-4 z-50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#funding" 
                className="font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2 hover:bg-lovely-soft-green rounded-md"
                onClick={toggleMenu}
              >
                Fund
              </Link>
              <Link 
                to="/#schedule" 
                className="font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2 hover:bg-lovely-soft-green rounded-md"
                onClick={toggleMenu}
              >
                Sessions
              </Link>
              <Link 
                to="/#talent" 
                className="font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2 hover:bg-lovely-soft-green rounded-md"
                onClick={toggleMenu}
              >
                Talent
              </Link>
              <Link 
                to="/#contact" 
                className="font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2 hover:bg-lovely-soft-green rounded-md"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                to="/admin" 
                className="font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2 hover:bg-lovely-soft-green rounded-md"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
