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
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-2 rounded-full group-hover:from-primary-200 group-hover:to-primary-300 transition-colors shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform">
                    {/* Outer circle with S letter */}
                    <circle cx="20" cy="20" r="18" fill="url(#gradient1)" />
                    <path d="M23.5 14.5C23.5 17.5376 21.0376 20 18 20C14.9624 20 12.5 17.5376 12.5 14.5C12.5 11.4624 14.9624 9 18 9C21.0376 9 23.5 11.4624 23.5 14.5Z" fill="url(#gradient2)" />
                    <path d="M16.5 25.5C16.5 28.5376 14.0376 31 11 31C7.96243 31 5.5 28.5376 5.5 25.5C5.5 22.4624 7.96243 20 11 20C14.0376 20 16.5 22.4624 16.5 25.5Z" fill="url(#gradient3)" />
                    <path d="M34.5 25.5C34.5 28.5376 32.0376 31 29 31C25.9624 31 23.5 28.5376 23.5 25.5C23.5 22.4624 25.9624 20 29 20C32.0376 20 34.5 22.4624 34.5 25.5Z" fill="url(#gradient4)" />
                    
                    {/* Stylized S letter */}
                    <path d="M22 13.5C22 15.3 20.8 16.5 19 16.5C17.2 16.5 16 17.7 16 19.5C16 21.3 17.2 22.5 19 22.5H21C22.8 22.5 24 23.7 24 25.5C24 27.3 22.8 28.5 21 28.5C19.2 28.5 18 27.3 18 25.5" 
                          stroke="white" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" />
                    
                    {/* Medicine pills/capsules */}
                    <circle cx="11" cy="14" r="1.5" fill="white" />
                    <circle cx="29" cy="26" r="1.5" fill="white" />
                    <ellipse cx="15" cy="29" rx="2" ry="1.3" transform="rotate(-45 15 29)" fill="white" />
                    
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="gradient1" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0ea5e9" />
                        <stop offset="1" stopColor="#0f766e" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="12.5" y1="9" x2="23.5" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0d9488" />
                        <stop offset="1" stopColor="#0ea5e9" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="5.5" y1="20" x2="16.5" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#0d9488" />
                      </linearGradient>
                      <linearGradient id="gradient4" x1="23.5" y1="20" x2="34.5" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0d9488" />
                        <stop offset="1" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold gradient-text font-heading">Sharanya</span>
                <span className="text-sm text-primary-600 -mt-1">Homeopathic Care</span>
              </div>
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
