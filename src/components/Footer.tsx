
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-lovely-soft-blue py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-display font-bold text-primary">Lovely Home</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Supporting individuals in homes and orphanages with care, compassion, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#funding" className="text-gray-600 hover:text-primary transition-colors">
                  Fund a Cause
                </Link>
              </li>
              <li>
                <Link to="/#schedule" className="text-gray-600 hover:text-primary transition-colors">
                  Session Schedule
                </Link>
              </li>
              <li>
                <Link to="/#talent" className="text-gray-600 hover:text-primary transition-colors">
                  Talent Showcase
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-20">Phone:</span>
                <div className="flex flex-col">
                  <span>8438386610</span>
                  <span>9080558409</span>
                  <span>7539954582</span>
                  <span>9600630208</span>
                  <span>9360877990</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-20">Email:</span>
                <a href="mailto:lovelyhome010@gmail.com" className="text-primary hover:underline">
                  lovelyhome010@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Lovely Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
