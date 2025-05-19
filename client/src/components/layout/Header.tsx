import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HeartPulse, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-primary-100">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary-50 p-2 rounded-full group-hover:bg-primary-100 transition-colors">
                <HeartPulse className="text-primary-600 h-7 w-7" />
              </div>
              <span className="text-2xl font-bold gradient-text font-heading">CarePlus</span>
            </Link>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className="block md:hidden text-primary-700 hover:text-primary-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 font-medium text-gray-600">
              <li>
                <Link 
                  href="/" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/services') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/professionals" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/professionals') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Our Professionals
                </Link>
              </li>
              <li>
                <Link 
                  href="/appointment" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/appointment') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/blog') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/about') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`transition-colors hover:text-primary-600 py-1 px-2 rounded-md inline-block ${isActiveLink('/contact') ? 'text-primary-700 font-medium bg-primary-50' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-4 md:mt-0 md:ml-6">
              <Button asChild className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all btn-pulse">
                <Link href="/appointment" onClick={() => setIsOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
