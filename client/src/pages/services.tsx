import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { 
  SERVICE_CATEGORIES, 
  HOME_CARE_FEATURES, 
  ONLINE_CONSULTATION_FEATURES, 
  SPECIALIZED_CARE_FEATURES 
} from "@/lib/utils/constants";

const ServicePage = () => {
  const [activeTab, setActiveTab] = useState(SERVICE_CATEGORIES.IN_HOME_VISIT);

  // Query all services
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Filter services by category
  const categoryServices = {
    [SERVICE_CATEGORIES.IN_HOME_VISIT]: services?.filter(service => 
      service.category === SERVICE_CATEGORIES.IN_HOME_VISIT
    ),
    [SERVICE_CATEGORIES.ONLINE_CONSULTATION]: services?.filter(service => 
      service.category === SERVICE_CATEGORIES.ONLINE_CONSULTATION
    ),
    [SERVICE_CATEGORIES.SPECIALIZED_CARE]: services?.filter(service => 
      service.category === SERVICE_CATEGORIES.SPECIALIZED_CARE
    ),
  };

  // Content for each service type
  const serviceContent = {
    [SERVICE_CATEGORIES.IN_HOME_VISIT]: {
      title: "In-Home Healthcare Services",
      description: "Our in-home healthcare services bring professional medical care directly to you, allowing you to receive treatment in the comfort and privacy of your own home.",
      features: HOME_CARE_FEATURES,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
    },
    [SERVICE_CATEGORIES.ONLINE_CONSULTATION]: {
      title: "Online Consultation Services",
      description: "Our telehealth services connect you with healthcare professionals through secure video conferencing, offering convenient access to medical advice without leaving home.",
      features: ONLINE_CONSULTATION_FEATURES,
      image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
    },
    [SERVICE_CATEGORIES.SPECIALIZED_CARE]: {
      title: "Specialized Care Services",
      description: "Our specialized care services address specific health conditions and needs, delivered by professionals with advanced training in specialized treatment modalities.",
      features: SPECIALIZED_CARE_FEATURES,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
    },
  };

  const currentContent = serviceContent[activeTab];
  const currentServices = categoryServices[activeTab] || [];

  return (
    <>
      <Helmet>
        <title>Our Healthcare Services | CarePlus</title>
        <meta name="description" content="Explore our comprehensive healthcare services including in-home visits, online consultations, and specialized care delivered by experienced professionals." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 font-heading mb-6">Our Healthcare Services</h1>
            <p className="text-lg text-gray-600 mb-8">
              We offer a range of professional healthcare services designed to meet your specific needs,
              whether you prefer care at home, online consultations, or specialized treatment options.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Service Category Tabs */}
          <Tabs defaultValue={SERVICE_CATEGORIES.IN_HOME_VISIT} value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={SERVICE_CATEGORIES.IN_HOME_VISIT}>In-Home Care</TabsTrigger>
              <TabsTrigger value={SERVICE_CATEGORIES.ONLINE_CONSULTATION}>Online Consultations</TabsTrigger>
              <TabsTrigger value={SERVICE_CATEGORIES.SPECIALIZED_CARE}>Specialized Care</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Service Category Content */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">{currentContent.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{currentContent.description}</p>
                <ul className="space-y-4 mb-8">
                  {currentContent.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="text-primary-600 h-5 w-5 mt-1 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg">
                  <Link href="/appointment">Book This Service</Link>
                </Button>
              </div>
              <div>
                <img 
                  src={currentContent.image} 
                  alt={currentContent.title} 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Service Listings */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 font-heading mb-8 text-center">Available Services</h3>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <Skeleton className="w-full h-[180px]" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">Failed to load services. Please try again later.</p>
              </div>
            ) : currentServices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No services available in this category at the moment. Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentServices.map((service) => (
                  <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition hover:shadow-md">
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
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Duration: {service.duration} minutes</span>
                        <Link 
                          href={`/appointment?service=${service.id}`} 
                          className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700"
                        >
                          Book now
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 font-heading mb-4">Need Help Choosing a Service?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Our healthcare professionals can help you determine which service best fits your needs. 
              Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/appointment">Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;