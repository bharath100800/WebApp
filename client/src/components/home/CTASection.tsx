import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-6">Experience Quality Healthcare at Home</h2>
          <p className="text-xl text-primary-100 mb-8">
            Our team of healthcare professionals is ready to provide the care you need in the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="px-8 py-4 bg-white text-primary-700 hover:bg-gray-100 shadow-md">
              <Link href="/appointment">
                Book an Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-4 bg-transparent text-white border-white hover:bg-primary-700">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
