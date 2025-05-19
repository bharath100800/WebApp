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
              <div className="rounded-2xl shadow-xl w-full overflow-hidden relative z-10 pulse-effect">
                <div className="aspect-[4/3] w-full relative">
                  {/* Custom colorful homeopathic imagery */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"></div>
                  
                  {/* Decorative elements that look like bottles and herbs */}
                  <div className="absolute top-1/4 left-1/4 w-16 h-32 bg-purple-400 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-1/3 left-1/2 w-12 h-24 bg-pink-400 rounded-full transform rotate-6"></div>
                  <div className="absolute top-1/2 left-1/3 w-14 h-28 bg-amber-400 rounded-full transform rotate-12"></div>
                  
                  {/* Leaf-like shapes */}
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-20 bg-green-400 rounded-full transform -rotate-45"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-20 h-16 bg-lime-400 rounded-full transform rotate-30"></div>
                  
                  {/* Small circular details like drops or pills */}
                  <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-red-400 rounded-full"></div>
                  <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-yellow-400 rounded-full"></div>
                  <div className="absolute bottom-1/4 left-1/5 w-10 h-10 bg-indigo-400 rounded-full"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-7 h-7 bg-orange-400 rounded-full"></div>
                  
                  {/* Overlay with slight transparency */}
                  <div className="absolute inset-0 bg-white opacity-10"></div>
                  
                  {/* Text label */}
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg text-primary-700 font-medium shadow-md">
                    Homeopathic Remedies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wave-divider"></div>
    </section>
  );
};

export default Hero;
