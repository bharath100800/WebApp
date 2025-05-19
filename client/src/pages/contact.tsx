import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | CarePlus</title>
        <meta name="description" content="Contact our healthcare team for questions about our services, appointments, or to request more information. We're here to help with all your home healthcare needs." />
      </Helmet>
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactInfo />
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Send a Message</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have specific questions or need more information? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
