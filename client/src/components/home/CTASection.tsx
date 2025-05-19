import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 gradient-cta text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Experience Quality Healthcare at Home</h2>
          <p className="text-xl text-white/90 mb-8">
            Our team of healthcare professionals is ready to provide the care you need in the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="px-8 py-4 bg-white text-primary-700 hover:bg-gray-100 shadow-md btn-pulse">
              <Link href="/appointment">
                Book an Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-4 bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-12 -left-12 w-60 h-60 bg-accent rounded-full opacity-10"></div>
      </div>
    </section>
  );
};

export default CTASection;
