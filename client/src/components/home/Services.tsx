import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@shared/schema";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="gradient-card rounded-xl overflow-hidden shadow-md transition hover:shadow-lg transform hover:-translate-y-2 duration-300 border border-primary-50 group">
      <div className="relative">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 relative">
        <div className="absolute -top-10 right-6 w-16 h-16 flex items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
          <span className="font-bold text-sm">{service.duration} min</span>
        </div>
        <h3 className="text-xl font-bold font-heading mb-3 text-primary-700">{service.title}</h3>
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        <Link 
          href={`/services/${service.id}`} 
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-secondary-50 text-secondary-700 font-medium hover:bg-secondary-100 transition-colors"
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
        </Link>
      </div>
    </div>
  );
};

const ServiceCardSkeleton = () => (
  <div className="gradient-card rounded-xl overflow-hidden shadow-md border border-primary-50">
    <div className="relative">
      <Skeleton className="w-full h-[180px]" />
    </div>
    <div className="p-6 relative">
      <Skeleton className="absolute -top-10 right-6 w-16 h-16 rounded-full transform -translate-y-1/2" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-10 w-1/3 rounded-full" />
    </div>
  </div>
);

const Services = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text font-heading mb-4">Our Healthcare Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of medical and healthcare services delivered right to your doorstep by our expert team.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto shadow-md">
            <p className="text-red-500 font-medium">Failed to load services. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-600 hover:bg-secondary-700 text-white font-medium transition-colors shadow-md btn-pulse"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      <div className="wave-divider mt-16"></div>
    </section>
  );
};

export default Services;
