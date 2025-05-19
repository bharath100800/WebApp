import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

interface ServiceTypeProps {
  selectedService: number | null;
  onServiceSelect: (serviceId: number) => void;
}

const ServiceTypeTabContent = ({ 
  services, 
  selectedService, 
  onServiceSelect 
}: { 
  services: Service[]; 
  selectedService: number | null;
  onServiceSelect: (serviceId: number) => void;
}) => {
  const service = services.length > 0 ? services[0] : null;
  
  if (!service) return null;
  
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h4 className="text-lg font-bold mb-3">{service.title}</h4>
      <p className="text-gray-600 mb-4">
        {service.description}
      </p>
      <ul className="space-y-2 mb-6">
        {/* Feature bullet points based on service type */}
        {service.category === 'in_home_visit' && (
          <>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Comprehensive health assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Medication management and administration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Vital signs monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Treatment and care plan development</span>
            </li>
          </>
        )}
        
        {service.category === 'online_consultation' && (
          <>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Secure video consultation platform</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Prescription renewal if needed</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Medical advice and guidance</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Follow-up communication</span>
            </li>
          </>
        )}
        
        {service.category === 'specialized_care' && (
          <>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Specialized treatment protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Advanced equipment and techniques</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Personalized recovery plans</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-secondary-500 h-4 w-4 mt-1" />
              <span>Coordination with specialists</span>
            </li>
          </>
        )}
      </ul>
      <div className="font-medium">
        Duration: {service.duration} minutes
      </div>
      
      <button
        className={`mt-4 px-4 py-2 rounded-lg transition ${
          selectedService === service.id
            ? 'bg-primary-600 text-white'
            : 'bg-white border border-primary-600 text-primary-600 hover:bg-primary-50'
        }`}
        onClick={() => onServiceSelect(service.id)}
      >
        {selectedService === service.id ? 'Selected' : 'Select This Service'}
      </button>
    </div>
  );
};

const ServiceType = ({ selectedService, onServiceSelect }: ServiceTypeProps) => {
  const [activeTab, setActiveTab] = useState("in_home_visit");
  
  const { data: inHomeServices, isLoading: isLoadingInHome } = useQuery<Service[]>({
    queryKey: ['/api/services/category/in_home_visit'],
  });
  
  const { data: onlineServices, isLoading: isLoadingOnline } = useQuery<Service[]>({
    queryKey: ['/api/services/category/online_consultation'],
  });
  
  const { data: specializedServices, isLoading: isLoadingSpecialized } = useQuery<Service[]>({
    queryKey: ['/api/services/category/specialized_care'],
  });
  
  return (
    <div className="mb-10">
      <Tabs defaultValue="in_home_visit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="in_home_visit">In-Home Visit</TabsTrigger>
          <TabsTrigger value="online_consultation">Online Consultation</TabsTrigger>
          <TabsTrigger value="specialized_care">Specialized Care</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in_home_visit">
          {isLoadingInHome ? (
            <div className="bg-gray-50 rounded-xl p-6">
              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <Skeleton className="h-4 w-4 mt-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
              <Skeleton className="h-4 w-1/3 mt-4" />
            </div>
          ) : inHomeServices && inHomeServices.length > 0 ? (
            <ServiceTypeTabContent 
              services={inHomeServices} 
              selectedService={selectedService}
              onServiceSelect={onServiceSelect}
            />
          ) : (
            <p className="text-gray-500 p-4">No in-home visit services available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="online_consultation">
          {isLoadingOnline ? (
            <div className="bg-gray-50 rounded-xl p-6">
              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <Skeleton className="h-4 w-4 mt-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
              <Skeleton className="h-4 w-1/3 mt-4" />
            </div>
          ) : onlineServices && onlineServices.length > 0 ? (
            <ServiceTypeTabContent 
              services={onlineServices} 
              selectedService={selectedService}
              onServiceSelect={onServiceSelect}
            />
          ) : (
            <p className="text-gray-500 p-4">No online consultation services available.</p>
          )}
        </TabsContent>
        
        <TabsContent value="specialized_care">
          {isLoadingSpecialized ? (
            <div className="bg-gray-50 rounded-xl p-6">
              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <Skeleton className="h-4 w-4 mt-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
              <Skeleton className="h-4 w-1/3 mt-4" />
            </div>
          ) : specializedServices && specializedServices.length > 0 ? (
            <ServiceTypeTabContent 
              services={specializedServices} 
              selectedService={selectedService}
              onServiceSelect={onServiceSelect}
            />
          ) : (
            <p className="text-gray-500 p-4">No specialized care services available.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceType;
