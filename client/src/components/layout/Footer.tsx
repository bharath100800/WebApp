import { Link } from "wouter";
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <HeartPulse className="text-primary-500 h-8 w-8" />
              <span className="text-2xl font-bold font-heading">CarePlus</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Providing comprehensive healthcare services in the comfort of your home. Our team of qualified professionals is dedicated to delivering exceptional care tailored to your needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-primary-500 transition">In-Home Nursing Care</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Telehealth Consultations</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Physical Therapy</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Elder Care Services</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Medical Equipment</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Health Education</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/blog" className="hover:text-primary-500 transition">Blog & Articles</Link></li>
              <li><a href="#" className="hover:text-primary-500 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Patient Resources</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Insurance Information</a></li>
              <li><a href="#" className="hover:text-primary-500 transition">Career Opportunities</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1" />
                <span>123 Healthcare Avenue<br />Medical District, CA 90210</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1" />
                <span>(800) 555-1234</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1" />
                <span>info@careplus.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-1" />
                <span>Mon-Fri: 8am-6pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} CarePlus Home Healthcare. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-primary-500 transition">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
