import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@shared/schema";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm transition hover:shadow-md">
      <img 
        src={service.imageUrl} 
        alt={service.title} 
        className="w-full h-[180px] object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold font-heading mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        <Link href={`/services/${service.id}`} className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
          Learn more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
    <Skeleton className="w-full h-[180px]" />
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);

const Services = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Our Healthcare Services</h2>
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
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load services. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
