import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Contact Us</h2>
      <p className="text-lg text-gray-600 mb-8">
        Have questions about our services or need more information? We're here to help. Reach out to us through any of the following methods.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Our Location</h3>
            <p className="text-gray-600">
              123 Healthcare Avenue<br />
              Medical District, CA 90210
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+18005551234" className="hover:text-primary-600">(800) 555-1234</a><br />
              Monday-Friday: 7am-8pm<br />
              Saturday-Sunday: 9am-5pm
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:info@careplus.com" className="hover:text-primary-600">info@careplus.com</a><br />
              We respond within 24 hours
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-primary-100 text-primary-700 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Operating Hours</h3>
            <p className="text-gray-600">
              <strong>Office Hours:</strong><br />
              Monday-Friday: 8am-6pm<br />
              <strong>Service Hours:</strong><br />
              Available 24/7 for scheduled care
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
