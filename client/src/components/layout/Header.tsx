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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <HeartPulse className="text-primary-600 h-8 w-8" />
              <span className="text-2xl font-bold font-heading text-primary-800">CarePlus</span>
            </Link>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className="block md:hidden text-gray-700"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 font-medium text-gray-600">
              <li>
                <Link 
                  href="/" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/services') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/professionals" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/professionals') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Our Professionals
                </Link>
              </li>
              <li>
                <Link 
                  href="/appointment" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/appointment') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/blog') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/about') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`transition hover:text-primary-600 ${isActiveLink('/contact') ? 'text-primary-700 font-medium' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-4 md:mt-0 md:ml-8">
              <Button asChild>
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
