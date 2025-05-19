import AppointmentForm from "@/components/appointment/AppointmentForm";
import { Helmet } from "react-helmet";

const Appointment = () => {
  return (
    <>
      <Helmet>
        <title>Book an Appointment | CarePlus</title>
        <meta name="description" content="Schedule a consultation with our healthcare professionals at a time that works for you. Choose between in-home visits, online consultations, or specialized care services." />
      </Helmet>
      <section id="appointment" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Book an Appointment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Schedule a consultation with our healthcare professionals at a time that works for you.
            </p>
          </div>
          
          <AppointmentForm />
        </div>
      </section>
    </>
  );
};

export default Appointment;
