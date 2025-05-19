import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 gradient-hero text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
              Professional Healthcare <span className="text-accent">at Your Home</span>
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Experience personalized medical care in the comfort of your home. Our team of qualified healthcare professionals is dedicated to providing quality care when and where you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-6 py-3 bg-white text-primary-700 hover:bg-gray-100 shadow-md btn-pulse">
                <Link href="/appointment">
                  Book an Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 py-3 bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/services">
                  Our Services
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-accent h-5 w-5" />
                <span className="font-medium">Licensed Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-accent h-5 w-5" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-accent h-5 w-5" />
                <span className="font-medium">Online Consultations</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-secondary-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-full opacity-20 animate-pulse delay-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1567696153798-9fd2d48bea54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&h=900" 
                alt="Colorful bottles of essential oils and homeopathic remedies" 
                className="rounded-2xl shadow-xl w-full h-auto relative z-10 pulse-effect"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wave-divider"></div>
    </section>
  );
};

export default Hero;
