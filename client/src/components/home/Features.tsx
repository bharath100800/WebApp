import { 
  Stethoscope, 
  Video, 
  CalendarClock, 
  Home, 
  HeartPulse, 
  Clock 
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 transition hover:shadow-md">
      <div className="bg-primary-100 text-primary-700 w-14 h-14 flex items-center justify-center rounded-full mb-6">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold font-heading mb-3">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "Qualified Professionals",
      description: "Our team consists of certified healthcare professionals with years of experience providing quality care."
    },
    {
      icon: Video,
      title: "Online Consultations",
      description: "Can't make it in person? Connect with our healthcare providers through secure video consultations."
    },
    {
      icon: CalendarClock,
      title: "Flexible Scheduling",
      description: "Book appointments at times that suit your schedule, including evenings and weekends."
    },
    {
      icon: Home,
      title: "Comfortable Environment",
      description: "Receive care in the familiar and comfortable environment of your own home."
    },
    {
      icon: HeartPulse,
      title: "Personalized Care Plans",
      description: "We develop customized care plans tailored to your specific health needs and goals."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our support team is available 24/7 to address any concerns or questions you may have."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Why Choose Our Home Healthcare Services?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive healthcare solutions tailored to meet your specific needs, right in the comfort of your own home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
